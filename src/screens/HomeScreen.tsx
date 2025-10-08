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
  const { 
    setSelectedArticle, 
    selectedCategory, 
    setSelectedCategory,
    scrapedArticles,
    isLoadingArticles,
    refreshArticles,
    loadArticleContent,
    theme
  } = useAppContext();
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    filterArticles();
  }, [scrapedArticles, selectedCategory]);

  const filterArticles = () => {
    let filtered = scrapedArticles;

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshArticles();
    setRefreshing(false);
  };

  const handleArticlePress = async (article: Article) => {
    console.log('HomeScreen - Article pressed:', {
      id: article.id,
      title: article.title,
      author: article.author,
      imageUrl: article.imageUrl
    });
    
    // Load full article content if not already loaded
    await loadArticleContent(article);
    
    // Get the updated article from scrapedArticles to ensure we have the latest content
    const updatedArticle = scrapedArticles.find(a => a.id === article.id) || article;
    
    console.log('HomeScreen - Updated article:', {
      id: updatedArticle.id,
      title: updatedArticle.title,
      author: updatedArticle.author,
      imageUrl: updatedArticle.imageUrl
    });
    
    setSelectedArticle(updatedArticle);
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

  if (isLoadingArticles) {
    return <LoadingSpinner message="Loading latest articles from Dal Gazette..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header with Logo and Search */}
        <AppHeader onSearchPress={handleSearchPress} />

        {/* Category Chips */}
        <View style={[styles.categoriesContainer, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
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
              <View style={[styles.featuredSection, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Featured Story</Text>
                <ArticleCard
                  article={filteredArticles[0]}
                  onPress={handleArticlePress}
                  style={styles.featuredCard}
                />
              </View>
            )}

            {/* Articles List */}
            <View style={[styles.articlesSection, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
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
        articles={scrapedArticles}
        onArticlePress={handleArticlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  featuredSection: {
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  featuredCard: {
    marginHorizontal: 16,
  },
  articlesSection: {
    paddingVertical: 16,
    marginTop: 8,
  },
});
