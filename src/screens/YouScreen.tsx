import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AppHeader } from '../components/AppHeader';
import { MOCK_ARTICLES } from '../constants/mockData';
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

export const YouScreen: React.FC = () => {
  const { bookmarkedArticles } = useAppContext();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    // Show bookmarked articles or all articles if no bookmarks
    const userArticles = bookmarkedArticles.length > 0 
      ? MOCK_ARTICLES.filter(article => bookmarkedArticles.includes(article.id))
      : MOCK_ARTICLES;
    setTimeout(() => {
      setArticles(userArticles);
      setLoading(false);
    }, 1000);
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
    return <LoadingSpinner message="Loading your content..." />;
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      
      {bookmarkedArticles.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Saved Articles</Text>
          <Text style={styles.emptyMessage}>
            Bookmark articles to see them here
          </Text>
        </View>
      )}
      
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
