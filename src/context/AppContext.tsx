import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Appearance } from 'react-native';
import { Article, AppTheme, ThemeMode } from '../types';
import { LIGHT_THEME, DARK_THEME } from '../constants/theme';
import { scrapeDalGazette, scrapeArticleContent } from '../utils/scraper';

interface AppContextType {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  bookmarkedArticles: string[];
  toggleBookmark: (articleId: string) => void;
  theme: AppTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  scrapedArticles: Article[];
  isLoadingArticles: boolean;
  refreshArticles: () => Promise<void>;
  loadArticleContent: (article: Article) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrapedArticles, setScrapedArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  // Get the current theme based on mode and system preference
  const getCurrentTheme = (): AppTheme => {
    if (themeMode === 'system') {
      const systemColorScheme = Appearance.getColorScheme();
      return systemColorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
    }
    return themeMode === 'dark' ? DARK_THEME : LIGHT_THEME;
  };

  const [theme, setTheme] = useState<AppTheme>(getCurrentTheme());

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev: string[]) => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Update theme when mode or system preference changes
  useEffect(() => {
    const updateTheme = () => {
      setTheme(getCurrentTheme());
    };

    updateTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(updateTheme);
    return () => subscription?.remove();
  }, [themeMode]);

  const refreshArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const articles = await scrapeDalGazette();
      setScrapedArticles(articles);
      console.log(`✅ Loaded ${articles.length} articles from Dal Gazette`);
    } catch (error) {
      console.error('❌ Failed to load articles:', error);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  const loadArticleContent = async (article: Article) => {
    if (article.content && article.content.length > 100) {
      return; // Content already loaded
    }

    try {
      const content = await scrapeArticleContent(article.url || '');
      setScrapedArticles(prev => 
        prev.map(a => 
          a.id === article.id 
            ? { ...a, content }
            : a
        )
      );
    } catch (error) {
      console.error('❌ Failed to load article content:', error);
    }
  };

  // Load articles on app start
  useEffect(() => {
    refreshArticles();
  }, []);

  const value: AppContextType = {
    selectedArticle,
    setSelectedArticle,
    bookmarkedArticles,
    toggleBookmark,
    theme,
    themeMode,
    setThemeMode,
    selectedCategory,
    setSelectedCategory,
    scrapedArticles,
    isLoadingArticles,
    refreshArticles,
    loadArticleContent,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
