import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Article } from '../types';
import { CATEGORY_COLORS } from '../constants/theme';

interface ArticleCardProps {
  article: Article;
  onPress: (article: Article) => void;
  style?: any;
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // Account for padding

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
  style,
}) => {
  const getTimeAgo = (date: Date): string => {
    // Safety check for invalid dates
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Recently';
    }
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(article)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={[styles.categoryTag, { backgroundColor: '#242424' }]}>
          <Text style={styles.categoryText}>{article.category}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.excerpt} numberOfLines={3}>
          {article.excerpt}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.author}>{article.author}</Text>
          <Text style={styles.timeAgo}>{getTimeAgo(article.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: cardWidth,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: '#9CA3AF', // Keep gray for author/time info
    fontWeight: '500',
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF', // Keep gray for author/time info
  },
});
