import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar } from '../components/BottomTabBar';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { useAppContext } from '../context/AppContext';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { selectedArticle, setSelectedArticle } = useAppContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabBar} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
        }}
        initialParams={{
          article: selectedArticle,
          onBack: () => setSelectedArticle(null),
        }}
      />
    </Stack.Navigator>
  );
};
