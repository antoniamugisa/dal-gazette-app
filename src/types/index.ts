export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'News' | 'Opinions' | 'Arts & Culture' | 'Sports' | 'Sections';
  author: string;
  publishedAt: Date;
  imageUrl: string;
  tags: string[];
  url?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface SearchFilters {
  query: string;
  category: string | null;
  dateRange: 'all' | 'today' | 'week' | 'month';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
  isDark: boolean;
}
