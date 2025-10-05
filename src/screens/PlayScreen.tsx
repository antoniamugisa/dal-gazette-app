import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gamepad2, Trophy, Star, Target, Brain, Zap } from 'lucide-react-native';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Game interface
interface Game {
  id: string;
  title: string;
  description: string;
  category: 'puzzle' | 'trivia' | 'word' | 'memory' | 'arcade';
  difficulty: 'easy' | 'medium' | 'hard';
  icon: React.ReactNode;
  color: string;
  highScore?: number;
}

export const PlayScreen: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);
    
    const availableGames: Game[] = [
      {
        id: '1',
        title: 'Dal Gazette Trivia',
        description: 'Test your knowledge about Dalhousie University and campus life',
        category: 'trivia',
        difficulty: 'medium',
        icon: <Brain size={24} color="#FFFFFF" />,
        color: '#FDB913',
        highScore: 850,
      },
      {
        id: '2',
        title: 'Word Search',
        description: 'Find hidden words related to university life and Halifax',
        category: 'word',
        difficulty: 'easy',
        icon: <Target size={24} color="#FFFFFF" />,
        color: '#10B981',
        highScore: 1200,
      },
      {
        id: '3',
        title: 'Memory Match',
        description: 'Match pairs of Dalhousie landmarks and campus buildings',
        category: 'memory',
        difficulty: 'medium',
        icon: <Star size={24} color="#FFFFFF" />,
        color: '#8B5CF6',
        highScore: 650,
      },
      {
        id: '4',
        title: 'Crossword Puzzle',
        description: 'Solve daily crossword puzzles about campus news and events',
        category: 'puzzle',
        difficulty: 'hard',
        icon: <Zap size={24} color="#FFFFFF" />,
        color: '#EF4444',
        highScore: 420,
      },
      {
        id: '5',
        title: 'Tiger Tapper',
        description: 'Tap the Dalhousie tiger as fast as you can!',
        category: 'arcade',
        difficulty: 'easy',
        icon: <Trophy size={24} color="#FFFFFF" />,
        color: '#F59E0B',
        highScore: 2340,
      },
    ];
    
    setTimeout(() => {
      setGames(availableGames);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGames();
    setRefreshing(false);
  };

  const handleGamePress = (game: Game) => {
    // TODO: Navigate to specific game screen
    console.log('Game pressed:', game.title);
  };

  const getDifficultyColor = (difficulty: Game['difficulty']) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderGame = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => handleGamePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.gameContent}>
        <View style={[styles.gameIcon, { backgroundColor: item.color }]}>
          {item.icon}
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{item.title}</Text>
          <Text style={styles.gameDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.gameMeta}>
            <View style={styles.difficultyBadge}>
              <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(item.difficulty) }]} />
              <Text style={styles.difficultyText}>
                {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
              </Text>
            </View>
            {item.highScore && (
              <Text style={styles.highScore}>High Score: {item.highScore}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner message="Loading games..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Gamepad2 size={24} color="#FDB913" />
            <Text style={styles.headerTitle}>Play</Text>
          </View>
        </View>
      </SafeAreaView>
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Game Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Game</Text>
          <TouchableOpacity
            style={styles.featuredGame}
            onPress={() => handleGamePress(games[0])}
            activeOpacity={0.7}
          >
            <View style={styles.featuredContent}>
              <View style={[styles.featuredIcon, { backgroundColor: games[0]?.color || '#FDB913' }]}>
                {games[0]?.icon}
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{games[0]?.title}</Text>
                <Text style={styles.featuredDescription}>
                  {games[0]?.description}
                </Text>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>PLAY NOW</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* All Games Section */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>All Games</Text>
          <FlatList
            data={games}
            renderItem={renderGame}
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
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  featuredGame: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FDB913',
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 18,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDB913',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  gamesSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  gameMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  highScore: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FDB913',
  },
});
