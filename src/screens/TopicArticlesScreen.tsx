import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MOCK_ARTICLES } from '../constants/mockData';
import { Article } from '../types';

interface TopicArticlesScreenProps {
  route?: any;
  navigation?: any;
}

export const TopicArticlesScreen: React.FC<TopicArticlesScreenProps> = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const topicName = route.params?.topicName || 'Topic';
  const topicId = route.params?.topicId || '';

  useEffect(() => {
    loadArticles();
  }, [topicId]);

  const loadArticles = async () => {
    setLoading(true);
    // Filter articles based on topic
    const filteredArticles = MOCK_ARTICLES.filter(article => {
      // Simple filtering based on topic - in a real app, this would be more sophisticated
      const topicKeywords = getTopicKeywords(topicId);
      return topicKeywords.some(keyword => 
        article.title.toLowerCase().includes(keyword) ||
        article.excerpt.toLowerCase().includes(keyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    });
    
    setTimeout(() => {
      setArticles(filteredArticles);
      setLoading(false);
    }, 1000);
  };

  const getTopicKeywords = (topicId: string): string[] => {
    const keywordMap: { [key: string]: string[] } = {
      'dalhousie': ['dalhousie', 'university', 'campus'],
      'student-union': ['student union', 'dsu', 'student government'],
      'halifax': ['halifax', 'city', 'downtown'],
      'atlantic-canada': ['atlantic', 'maritime', 'canada'],
      'politics': ['politics', 'government', 'election'],
      'advice': ['advice', 'help', 'guidance'],
      'humour': ['humour', 'humor', 'funny', 'comedy'],
      'letters': ['letter', 'opinion', 'editorial'],
      'sports': ['sports', 'athletics', 'tigers', 'game'],
      'art': ['art', 'artistic', 'gallery', 'exhibition'],
      'books': ['book', 'literature', 'reading'],
      'fashion': ['fashion', 'style', 'clothing'],
      'film-tv': ['film', 'movie', 'tv', 'television', 'cinema'],
      'food': ['food', 'dining', 'restaurant', 'cooking'],
      'music': ['music', 'concert', 'band', 'song'],
      'sex': ['sex', 'relationship', 'dating'],
      'theatre': ['theatre', 'theater', 'play', 'performance'],
      'travel': ['travel', 'trip', 'vacation', 'journey'],
    };
    return keywordMap[topicId] || [topicId];
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    // TODO: Navigate to article detail screen
    console.log('Article pressed:', article.title);
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={handleArticlePress} />
  );

  if (loading) {
    return <LoadingSpinner message={`Loading ${topicName} articles...`} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{topicName}</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      {/* Articles List */}
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Articles Found</Text>
            <Text style={styles.emptyMessage}>
              No articles found for {topicName}. Check back later for new content.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
