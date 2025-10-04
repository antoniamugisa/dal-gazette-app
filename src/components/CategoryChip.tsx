import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

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
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? color : '#F3F4F6',
          borderColor: isSelected ? color : '#E5E7EB',
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
            color: isSelected ? '#FFFFFF' : '#6B7280',
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
