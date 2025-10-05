import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, Headphones, Clock, User } from 'lucide-react-native';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MOCK_ARTICLES } from '../constants/mockData';
import { Article } from '../types';

// Audio article interface
interface AudioArticle extends Article {
  duration: string;
  audioUrl?: string;
}

export const ListenScreen: React.FC = () => {
  const [audioArticles, setAudioArticles] = useState<AudioArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    loadAudioArticles();
  }, []);

  const loadAudioArticles = async () => {
    setLoading(true);
    // Convert regular articles to audio articles with mock duration
    const audioContent = MOCK_ARTICLES.map((article, index) => ({
      ...article,
      duration: `${Math.floor(Math.random() * 20) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      audioUrl: `https://example.com/audio/${article.id}.mp3`,
    }));
    
    setTimeout(() => {
      setAudioArticles(audioContent);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAudioArticles();
    setRefreshing(false);
  };

  const handlePlayPause = (articleId: string) => {
    setPlayingId(playingId === articleId ? null : articleId);
    // TODO: Implement actual audio playback
    console.log('Play/Pause audio for article:', articleId);
  };

  const handleArticlePress = (article: AudioArticle) => {
    // TODO: Navigate to audio player screen
    console.log('Audio article pressed:', article.title);
  };

  const renderAudioArticle = ({ item }: { item: AudioArticle }) => (
    <TouchableOpacity
      style={styles.audioCard}
      onPress={() => handleArticlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.audioContent}>
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.audioExcerpt} numberOfLines={2}>
            {item.excerpt}
          </Text>
          <View style={styles.audioMeta}>
            <View style={styles.metaItem}>
              <User size={12} color="#6B7280" />
              <Text style={styles.metaText}>{item.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={12} color="#6B7280" />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Headphones size={12} color="#6B7280" />
              <Text style={styles.metaText}>Audio</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handlePlayPause(item.id)}
          activeOpacity={0.7}
        >
          {playingId === item.id ? (
            <Pause size={24} color="#FFFFFF" />
          ) : (
            <Play size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.audioImage} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner message="Loading audio content..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Headphones size={24} color="#FFD400" />
            <Text style={styles.headerTitle}>Listen</Text>
          </View>
        </View>
      </SafeAreaView>
      
      <FlatList
        data={audioArticles}
        renderItem={renderAudioArticle}
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
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 12,
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  audioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  audioContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  audioInfo: {
    flex: 1,
    marginRight: 12,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
    lineHeight: 20,
  },
  audioExcerpt: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  audioMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFD400', // Beak Gold
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD400',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  audioImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
});
