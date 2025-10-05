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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bookmark, Eye } from 'lucide-react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MOCK_ARTICLES } from '../constants/mockData';
import { Article } from '../types';
import { useAppContext } from '../context/AppContext';

export const YouScreen: React.FC = () => {
  const { bookmarkedArticles } = useAppContext();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [viewedArticles, setViewedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const userName = "Student Reader";

  useEffect(() => {
    loadArticles();
  }, [bookmarkedArticles]);

  const loadArticles = async () => {
    setLoading(true);
    
    // Get saved articles (bookmarked)
    const saved = MOCK_ARTICLES.filter(article => bookmarkedArticles.includes(article.id));
    
    // Mock viewed articles (in a real app, this would come from user history)
    const viewed = MOCK_ARTICLES.slice(0, 3); // Show first 3 as "viewed"
    
    setTimeout(() => {
      setSavedArticles(saved);
      setViewedArticles(viewed);
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

  const handleSettingsPress = () => {
    // TODO: Navigate to settings screen
    console.log('Settings pressed');
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={handleArticlePress} />
  );

  const renderPlaylist = (title: string, articles: Article[], icon: React.ReactNode, emptyMessage: string) => (
    <View style={styles.playlistContainer}>
      <View style={styles.playlistHeader}>
        {icon}
        <Text style={styles.playlistTitle}>{title}</Text>
        <Text style={styles.playlistCount}>({articles.length})</Text>
      </View>
      
      {articles.length > 0 ? (
        <FlatList
          data={articles}
          renderItem={renderArticle}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyPlaylist}>
          <Text style={styles.emptyPlaylistText}>{emptyMessage}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.profileHeader}>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Saved Articles Playlist */}
        {renderPlaylist(
          "Saved Articles",
          savedArticles,
          <Bookmark size={20} color="#FFD400" />,
          "No saved articles yet. Bookmark articles to see them here."
        )}

        {/* Viewed Articles Playlist */}
        {renderPlaylist(
          "Recently Viewed",
          viewedArticles,
          <Eye size={20} color="#6B7280" />,
          "No recently viewed articles."
        )}
      </ScrollView>
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
  profileHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  playlistContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingVertical: 16,
  },
  playlistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
    flex: 1,
  },
  playlistCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  emptyPlaylist: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyPlaylistText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
