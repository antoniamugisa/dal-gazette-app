import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export const SectionsList: React.FC = () => {
  const navigation = useNavigation();

  const handleTopicPress = (topic: SectionTopic) => {
    navigation.navigate('TopicArticles' as never, {
      topicName: topic.name,
      topicId: topic.id,
    } as never);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={SECTION_TOPICS}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
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
