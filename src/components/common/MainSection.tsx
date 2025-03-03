// src/components/common/MainSection.tsx
import React from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, RefreshControl } from 'react-native';
import { theme } from '../../themes/theme';

interface MainSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
  backgroundColor?: string;
}

const MainSection: React.FC<MainSectionProps> = ({
  children,
  style,
  scrollable = true,
  paddingHorizontal = theme.sizes.padding.medium,
  paddingVertical = theme.sizes.padding.medium,
  refreshing = false,
  onRefresh,
  backgroundColor = theme.colors.background,
}) => {
  const containerStyle = {
    ...styles.container,
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
    ...style,
  };

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollView, { backgroundColor }]}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    minHeight: '100%',
  },
});

export default MainSection;