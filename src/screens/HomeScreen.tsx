import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryChip } from '../components/CategoryChip';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MOCK_ARTICLES } from '../constants/mockData';
import { CATEGORIES } from '../constants/theme';
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setSelectedArticle, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useAppContext();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchQuery, selectedCategory]);

  const loadArticles = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setArticles(MOCK_ARTICLES);
      setLoading(false);
    }, 1000);
  };

  const filterArticles = () => {
    let filtered = articles;

    if (searchQuery) {
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    setSelectedArticle(article);
    navigation.navigate('ArticleDetail' as never);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={handleArticlePress} />
  );

  const renderCategoryChip = (category: typeof CATEGORIES[0]) => (
    <CategoryChip
      key={category.id}
      label={category.name}
      isSelected={selectedCategory === category.name}
      onPress={() => handleCategoryPress(category.name)}
      color={category.color}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Loading latest articles..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dal Gazette</Text>
          <Text style={styles.subtitle}>Your campus news source</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleSearchClear}
        />

        {/* Category Chips */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map(renderCategoryChip)}
          </ScrollView>
        </View>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Story</Text>
            <ArticleCard
              article={filteredArticles[0]}
              onPress={handleArticlePress}
              style={styles.featuredCard}
            />
          </View>
        )}

        {/* Articles List */}
        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? selectedCategory : 'Latest News'}
          </Text>
          <FlatList
            data={filteredArticles.slice(1)}
            renderItem={renderArticle}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  featuredSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  featuredCard: {
    marginHorizontal: 16,
  },
  articlesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginTop: 8,
  },
});
