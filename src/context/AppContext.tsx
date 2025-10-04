import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '../types';
import { LIGHT_THEME, DARK_THEME, AppTheme } from '../constants/theme';

interface AppContextType {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  bookmarkedArticles: string[];
  toggleBookmark: (articleId: string) => void;
  theme: AppTheme;
  toggleTheme: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
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

  const value: AppContextType = {
    selectedArticle,
    setSelectedArticle,
    bookmarkedArticles,
    toggleBookmark,
    theme,
    toggleTheme,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
