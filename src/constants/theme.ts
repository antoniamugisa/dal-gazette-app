import { AppTheme } from '../types';

export const LIGHT_THEME: AppTheme = {
  colors: {
    primary: '#FDB913', // Dalhousie Gold
    secondary: '#000000', // Black
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#000000',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    accent: '#F3F4F6',
  },
  isDark: false,
};

export const DARK_THEME: AppTheme = {
  colors: {
    primary: '#FDB913', // Dalhousie Gold
    secondary: '#FFFFFF', // White
    background: '#000000',
    surface: '#1F2937',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    border: '#374151',
    accent: '#111827',
  },
  isDark: true,
};

export const CATEGORY_COLORS = {
  News: '#3B82F6',
  'Arts & Culture': '#A855F7',
  Opinions: '#10B981',
  Sports: '#F97316',
} as const;

export const CATEGORIES = [
  { id: 'news', name: 'News', color: CATEGORY_COLORS.News, icon: 'newspaper' },
  { id: 'arts-culture', name: 'Arts & Culture', color: CATEGORY_COLORS['Arts & Culture'], icon: 'palette' },
  { id: 'opinions', name: 'Opinions', color: CATEGORY_COLORS.Opinions, icon: 'message-circle' },
  { id: 'sports', name: 'Sports', color: CATEGORY_COLORS.Sports, icon: 'trophy' },
] as const;
