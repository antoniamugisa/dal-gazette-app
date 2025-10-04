import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AppHeaderProps {
  showLogo?: boolean;
  onSearchPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showLogo = true,
  onSearchPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/gazette-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}
        {onSearchPress && (
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Search size={24} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 1,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 250,
    height: 60,
  },
  searchButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
});
