import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article } from '../types';
import { LIGHT_THEME, DARK_THEME, AppTheme } from '../constants/theme';
import { scrapeDalGazette, scrapeArticleContent } from '../utils/scraper';

interface AppContextType {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  bookmarkedArticles: string[];
  toggleBookmark: (articleId: string) => void;
  theme: AppTheme;
  toggleTheme: () => void;
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
  const [theme, setTheme] = useState<AppTheme>(LIGHT_THEME);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrapedArticles, setScrapedArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const toggleTheme = () => {
    setTheme(prev => prev.isDark ? LIGHT_THEME : DARK_THEME);
  };

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
      const content = await scrapeArticleContent(article.url);
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
    toggleTheme,
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
