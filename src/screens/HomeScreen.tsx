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
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AppHeader } from '../components/AppHeader';
import { SearchModal } from '../components/SearchModal';
import { SectionsList } from '../components/SectionsList';
import { MOCK_ARTICLES } from '../constants/mockData';
import { CATEGORIES } from '../constants/theme';
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setSelectedArticle, selectedCategory, setSelectedCategory } = useAppContext();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, selectedCategory]);

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

  const handleSearchPress = () => {
    setSearchModalVisible(true);
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
        {/* Header with Logo and Search */}
        <AppHeader onSearchPress={handleSearchPress} />

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

        {/* Content based on selected category */}
        {selectedCategory === 'Sections' ? (
          <SectionsList />
        ) : (
          <>
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
          </>
        )}
      </ScrollView>

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        articles={articles}
        onArticlePress={handleArticlePress}
      />
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
