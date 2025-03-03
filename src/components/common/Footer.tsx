// src/components/common/Footer.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../../themes/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

interface FooterItem {
  label?: string; // 선택적 - 없으면 아이콘만 표시
  screen: string;
  icon: string; // 아이콘 라이브러리
  badge?: number | string; // 선택적 배지 (알림 수 등)
}

interface FooterProps {
  items: FooterItem[];
  showLabels?: boolean; // 모든 라벨 표시 여부 (전역 설정)
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  items, 
  showLabels = true,
  backgroundColor,
  activeColor,
  inactiveColor,
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const currentScreen = route.name;

  const footerBackgroundColor = backgroundColor || theme.colors.footerBackground;
  const activeItemColor = activeColor || theme.colors.primary;
  const inactiveItemColor = inactiveColor || theme.colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: footerBackgroundColor }]}>
      {items.map((item, index) => {
        const isActive = currentScreen === item.screen;
        const shouldShowLabel = showLabels && item.label;
        
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconContainer}>
              <Text style={[
                styles.icon, 
                { color: isActive ? activeItemColor : inactiveItemColor }
              ]}>
                {item.icon}
              </Text>
              
              {item.badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                  </Text>
                </View>
              )}
            </View>
            
            {shouldShowLabel && (
              <Text style={[
                styles.label, 
                { color: isActive ? activeItemColor : inactiveItemColor }
              ]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.footerHeight + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: theme.colors.footerBackground,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  icon: {
    fontSize: 24,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: theme.sizes.fontSize.small,
  },
});

export default Footer;