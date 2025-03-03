// src/components/ui/Card.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../themes/theme';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ title, children, style, onPress }) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent 
      style={[styles.card, style]} 
      onPress={onPress} 
      activeOpacity={onPress ? 0.7 : 1}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.sizes.borderRadius,
    padding: theme.sizes.padding.medium,
    marginVertical: theme.sizes.padding.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: theme.sizes.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.sizes.padding.small,
    color: theme.colors.text,
  },
  content: {
    width: '100%',
  },
});

export default Card;