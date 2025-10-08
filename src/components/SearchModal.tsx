import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X, Search } from 'lucide-react-native';
import { ArticleCard } from './ArticleCard';
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  articles: Article[];
  onArticlePress: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  articles,
  onArticlePress,
}) => {
  const { theme } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = articles.filter(
        article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={onArticlePress} />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
          <View style={[styles.searchContainer, { backgroundColor: theme.colors.accent }]}>
            <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search articles..."
              placeholderTextColor={theme.colors.textSecondary}
              autoFocus
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsText, { color: theme.colors.textSecondary }]}>
            {searchQuery.trim() 
              ? `${filteredArticles.length} result${filteredArticles.length !== 1 ? 's' : ''} found`
              : 'All articles'
            }
          </Text>
          <FlatList
            data={filteredArticles}
            renderItem={renderArticle}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  closeButton: {
    padding: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultsText: {
    fontSize: 14,
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
