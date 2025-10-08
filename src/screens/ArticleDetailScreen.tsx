import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Share2, Bookmark, Clock, User } from 'lucide-react-native';
import { Article } from '../types';
import { CATEGORY_COLORS } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

interface ArticleDetailScreenProps {
  route?: any;
  navigation?: any;
}

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedArticle, setSelectedArticle, theme } = useAppContext();
  
  const article = selectedArticle || (route.params as any)?.article;
  
  // Debug logging
  console.log('ArticleDetailScreen - Article data:', {
    id: article?.id,
    title: article?.title,
    author: article?.author,
    imageUrl: article?.imageUrl,
    content: article?.content?.substring(0, 100) + '...'
  });
  
  const handleBack = () => {
    setSelectedArticle(null);
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs' as never);
    }
  };

  // Safety check - if no article, go back using useEffect
  useEffect(() => {
    if (!article) {
      handleBack();
    }
  }, [article]);

  // Early return if no article
  if (!article) {
    return null;
  }
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n\n${article.url || 'Read more on Dal Gazette'}`,
        title: article.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share article');
    }
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark functionality
    Alert.alert('Bookmark', 'Article bookmarked!');
  };

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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleBookmark} style={styles.actionButton}>
            <Bookmark size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share2 size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          {article.imageUrl ? (
            <Image 
              source={{ uri: article.imageUrl }} 
              style={styles.heroImage}
              onError={(error) => console.log('Image load error:', error)}
            />
          ) : (
            <View style={[styles.heroImage, { backgroundColor: theme.colors.accent, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 18, fontWeight: '600' }}>📰</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginTop: 8 }}>Dal Gazette</Text>
            </View>
          )}
          <View style={[styles.categoryTag, { backgroundColor: (CATEGORY_COLORS as any)[article.category] }]}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{article.title}</Text>
          
          {/* Article Meta */}
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <User size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{getTimeAgo(article.publishedAt)}</Text>
            </View>
          </View>

          {/* Article Body */}
          <Text style={[styles.body, { color: theme.colors.text }]}>{article.content}</Text>

          {/* Tags */}
          {article.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={[styles.tagsTitle, { color: theme.colors.textSecondary }]}>Tags:</Text>
              <View style={styles.tags}>
                {article.tags.map((tag: string, index: number) => (
                  <View key={index} style={[styles.tag, { backgroundColor: theme.colors.accent }]}>
                    <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    marginTop: 20,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
  },
});
