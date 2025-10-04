import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

export const ArticleSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageSkeleton} />
        <View style={styles.categorySkeleton} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleSkeleton} />
        <View style={styles.excerptSkeleton} />
        <View style={styles.excerptSkeleton2} />
        
        <View style={styles.footer}>
          <View style={styles.authorSkeleton} />
          <View style={styles.timeSkeleton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: cardWidth,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  imageSkeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  categorySkeleton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 60,
    height: 20,
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
  },
  content: {
    padding: 16,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  excerptSkeleton: {
    height: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 4,
    width: '90%',
  },
  excerptSkeleton2: {
    height: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 12,
    width: '70%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorSkeleton: {
    width: 80,
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  timeSkeleton: {
    width: 60,
    height: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
});
