import React from 'react';
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
  const { selectedArticle, setSelectedArticle } = useAppContext();
  
  const article = selectedArticle || (route.params as any)?.article;
  
  const handleBack = () => {
    setSelectedArticle(null);
    navigation.goBack();
  };

  // Safety check - if no article, go back
  if (!article) {
    handleBack();
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
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleBookmark} style={styles.actionButton}>
            <Bookmark size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share2 size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: article.imageUrl }} style={styles.heroImage} />
          <View style={[styles.categoryTag, { backgroundColor: (CATEGORY_COLORS as any)[article.category] }]}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          
          {/* Article Meta */}
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <User size={16} color="#6B7280" />
              <Text style={styles.metaText}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.metaText}>{getTimeAgo(article.publishedAt)}</Text>
            </View>
          </View>

          {/* Article Body */}
          <Text style={styles.body}>{article.content}</Text>

          {/* Tags */}
          {article.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Tags:</Text>
              <View style={styles.tags}>
                {article.tags.map((tag: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    color: '#000000',
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
    color: '#6B7280',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 24,
  },
  tagsContainer: {
    marginTop: 20,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
