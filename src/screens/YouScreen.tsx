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
import { useNavigation } from '@react-navigation/native';
import { Settings, Bookmark, Eye } from 'lucide-react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAppContext } from '../context/AppContext';
import { Article } from '../types';

export const YouScreen: React.FC = () => {
  const navigation = useNavigation();
  const { bookmarkedArticles, scrapedArticles, theme } = useAppContext();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [viewedArticles, setViewedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const userName = "Student Reader";

  useEffect(() => {
    loadArticles();
  }, [bookmarkedArticles, scrapedArticles]);

  const loadArticles = async () => {
    setLoading(true);
    
    // Get saved articles (bookmarked)
    const saved = scrapedArticles.filter(article => bookmarkedArticles.includes(article.id));
    
    // Mock viewed articles (in a real app, this would come from user history)
    const viewed = scrapedArticles.slice(0, 3); // Show first 3 as "viewed"
    
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
    navigation.navigate('Settings' as never);
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item} onPress={handleArticlePress} />
  );

  const renderPlaylist = (title: string, articles: Article[], icon: React.ReactNode, emptyMessage: string) => (
    <View style={[styles.playlistContainer, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.playlistHeader}>
        {icon}
        <Text style={[styles.playlistTitle, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.playlistCount, { color: theme.colors.textSecondary }]}>({articles.length})</Text>
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
          <Text style={[styles.emptyPlaylistText, { color: theme.colors.textSecondary }]}>{emptyMessage}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Header */}
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.surface }]} edges={['top']}>
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>{userName}</Text>
          <TouchableOpacity onPress={handleSettingsPress} style={[styles.settingsButton, { backgroundColor: theme.colors.accent }]}>
            <Settings size={24} color={theme.colors.textSecondary} />
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
          <Bookmark size={20} color={theme.colors.primary} />,
          "No saved articles yet. Bookmark articles to see them here."
        )}

        {/* Viewed Articles Playlist */}
        {renderPlaylist(
          "Recently Viewed",
          viewedArticles,
          <Eye size={20} color={theme.colors.textSecondary} />,
          "No recently viewed articles."
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
  },
  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  playlistContainer: {
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
    marginLeft: 8,
    flex: 1,
  },
  playlistCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyPlaylist: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyPlaylistText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
