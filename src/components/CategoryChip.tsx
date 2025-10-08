import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppContext } from '../context/AppContext';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  color: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isSelected,
  onPress,
  color,
  style,
  textStyle,
}) => {
  const { theme } = useAppContext();
  
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: 'transparent',
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          borderWidth: isSelected ? 2 : 1,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
            fontWeight: isSelected ? '600' : '500',
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
