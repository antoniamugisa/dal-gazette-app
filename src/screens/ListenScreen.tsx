import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AppHeader } from '../components/AppHeader';
import { MOCK_ARTICLES } from '../constants/mockData';
import { Article } from '../types';

export const ListenScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    // Filter for audio/podcast content
    const listenArticles = MOCK_ARTICLES.filter(article => 
      article.category === 'Arts & Culture' || 
      article.tags.some(tag => tag.includes('audio') || tag.includes('podcast'))
    );
    setTimeout(() => {
      setArticles(listenArticles);
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
    return <LoadingSpinner message="Loading audio content..." />;
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      
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
});
