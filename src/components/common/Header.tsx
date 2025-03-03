// src/components/common/Header.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform, TextInput } from 'react-native';
import { theme } from '../../themes/theme';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  showLogo?: boolean;
  rightComponent?: React.ReactNode;
  onSearchPress?: () => void;
  onTitlePress?: () => void;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  transparent?: boolean;
  backgroundColor?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false,
  showSearch = false,
  showLogo = false,
  rightComponent,
  onSearchPress,
  onTitlePress,
  leftComponent,
  centerComponent,
  transparent = false,
  backgroundColor,
}) => {
  const navigation = useNavigation();

  const headerBackgroundColor = transparent 
    ? 'transparent'
    : backgroundColor || theme.colors.headerBackground;

  return (
    <View style={[
      styles.container, 
      { backgroundColor: headerBackgroundColor },
      transparent && { borderBottomWidth: 0 }
    ]}>
      <StatusBar 
        backgroundColor={transparent ? 'transparent' : headerBackgroundColor} 
        barStyle={transparent || headerBackgroundColor === '#FFFFFF' ? 'dark-content' : 'light-content'} 
        translucent={transparent}
      />
      
      <View style={styles.headerContent}>
        {/* 왼쪽 섹션 */}
        <View style={styles.leftSection}>
          {leftComponent ? (
            leftComponent
          ) : showBackButton ? (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          ) : showLogo ? (
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>로고</Text>
            </View>
          ) : null}
        </View>
        
        {/* 중앙 섹션 */}
        <View style={styles.centerSection}>
          {centerComponent ? (
            centerComponent
          ) : title && !showSearch ? (
            <TouchableOpacity 
              disabled={!onTitlePress} 
              onPress={onTitlePress}
            >
              <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          ) : showSearch ? (
            <TouchableOpacity 
              style={styles.searchContainer}
              onPress={onSearchPress}
              activeOpacity={onSearchPress ? 0.7 : 1}
            >
              <Text style={styles.searchIcon}>🔍</Text>
              <Text 
                style={[styles.searchInput, {color: theme.colors.textSecondary}]}
                numberOfLines={1}
              >
                검색
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* 오른쪽 섹션 */}
        <View style={styles.rightSection}>
          {rightComponent || (
            <View style={{ width: 40 }} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.headerHeight + (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0),
    backgroundColor: theme.colors.headerBackground,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.sizes.padding.medium,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    padding: theme.sizes.padding.small,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.sizes.fontSize.large,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.primary,
    fontSize: theme.sizes.fontSize.large,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.sizes.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.sizes.padding.medium,
    paddingVertical: 8,
    width: '100%',
    maxWidth: 280,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: theme.sizes.padding.small,
    color: theme.colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.sizes.fontSize.medium,
  }
});

export default Header;