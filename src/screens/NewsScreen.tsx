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
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

export const NewsScreen: React.FC = () => {
  const { scrapedArticles, isLoadingArticles, refreshArticles, theme } = useAppContext();
  const [articles, setArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    filterArticles();
  }, [scrapedArticles]);

  const filterArticles = () => {
    const newsArticles = scrapedArticles.filter(article => article.category === 'News');
    setArticles(newsArticles);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshArticles();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    // TODO: Navigate to article detail screen
    console.log('Article pressed:', article.title);
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={handleArticlePress} />
  );

  if (isLoadingArticles) {
    return <LoadingSpinner message="Loading news articles..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
  },
  listContainer: {
    paddingVertical: 8,
  },
});
