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
import { useAppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

interface AppHeaderProps {
  showLogo?: boolean;
  onSearchPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showLogo = true,
  onSearchPress,
}) => {
  const { theme } = useAppContext();
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.surface }]} edges={['top']}>
      <View style={[styles.container, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
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
            style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Search size={24} color={theme.colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 1,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
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
  },
});
