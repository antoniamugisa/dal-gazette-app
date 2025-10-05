import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { CategoryChip } from '../components/CategoryChip';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../constants/theme';

interface SectionTopic {
  id: string;
  name: string;
}

const SECTION_TOPICS: SectionTopic[] = [
  { id: 'dalhousie', name: 'Dalhousie' },
  { id: 'student-union', name: 'Student Union' },
  { id: 'halifax', name: 'Halifax' },
  { id: 'atlantic-canada', name: 'Atlantic Canada' },
  { id: 'politics', name: 'Politics' },
  { id: 'advice', name: 'Advice' },
  { id: 'humour', name: 'Humour' },
  { id: 'letters', name: 'Letters' },
  { id: 'sports', name: 'Sports' },
  { id: 'art', name: 'Art' },
  { id: 'books', name: 'Books' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'film-tv', name: 'Film & TV' },
  { id: 'food', name: 'Food' },
  { id: 'music', name: 'Music' },
  { id: 'sex', name: 'Sex' },
  { id: 'theatre', name: 'Theatre' },
  { id: 'travel', name: 'Travel' },
];

export const SectionsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleTopicPress = (topic: SectionTopic) => {
    navigation.navigate('TopicArticles' as never, {
      topicName: topic.name,
      topicId: topic.id,
    } as never);
  };

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === 'Sections') {
      // Already on sections page, do nothing
      return;
    } else {
      // Navigate back to home with category selected
      navigation.navigate('MainTabs' as never, {
        screen: 'Home',
        params: { selectedCategory: categoryId }
      } as never);
    }
  };

  const renderTopic = ({ item }: { item: SectionTopic }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => handleTopicPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.topicText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategoryChip = (category: typeof CATEGORIES[0]) => (
    <CategoryChip
      key={category.id}
      label={category.name}
      isSelected={category.name === 'Sections'}
      onPress={() => handleCategoryPress(category.name)}
      color={category.color}
    />
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      
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
      
      <FlatList
        data={SECTION_TOPICS}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
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
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
  topicItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topicText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
});
