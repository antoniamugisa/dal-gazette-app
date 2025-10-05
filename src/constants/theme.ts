import { AppTheme } from '../types';

export const LIGHT_THEME: AppTheme = {
  colors: {
    primary: '#FFD400', // Beak Gold
    secondary: '#242424', // Wingtip Black
    background: '#FFFFFF', // Cloud White
    surface: '#F8F9FA',
    text: '#242424', // Wingtip Black
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    accent: '#F3F4F6',
  },
  isDark: false,
};

export const DARK_THEME: AppTheme = {
  colors: {
    primary: '#FFD400', // Beak Gold
    secondary: '#FFFFFF', // Cloud White
    background: '#242424', // Wingtip Black
    surface: '#1F2937',
    text: '#FFFFFF', // Cloud White
    textSecondary: '#9CA3AF',
    border: '#374151',
    accent: '#111827',
  },
  isDark: true,
};

export const CATEGORY_COLORS = {
  News: '#FFD400', // Beak Gold
  'Arts & Culture': '#A855F7', // Purple
  Opinions: '#10B981', // Green
  Sports: '#F97316', // Orange
} as const;

export const CATEGORIES = [
  { id: 'news', name: 'News', color: CATEGORY_COLORS.News, icon: 'newspaper' },
  { id: 'opinions', name: 'Opinions', color: CATEGORY_COLORS.Opinions, icon: 'message-circle' },
  { id: 'arts-culture', name: 'Arts & Culture', color: CATEGORY_COLORS['Arts & Culture'], icon: 'palette' },
  { id: 'sports', name: 'Sports', color: CATEGORY_COLORS.Sports, icon: 'trophy' },
  { id: 'sections', name: 'Sections', color: '#6B7280', icon: 'grid' },
] as const;
