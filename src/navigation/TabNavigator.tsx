// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { theme } from '../themes/theme';
import { MainTabParamList } from './types';

// Stack Navigators
import HomeStack from './stacks/HomeStack';
import ExploreStack from './stacks/ExploreStack';
import NotificationsStack from './stacks/NotificationsStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

// 탭 아이콘 컴포넌트
interface TabIconProps {
  focused: boolean;
  name: string;
  icon: string;
  badge?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, name, icon, badge }) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[
        styles.tabIcon,
        focused ? styles.activeTabIcon : styles.inactiveTabIcon,
      ]}>
        {icon}
      </Text>
      
      {badge ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>
            {badge > 99 ? '99+' : badge}
          </Text>
        </View>
      ) : null}
      
      <Text style={[
        styles.tabLabel,
        focused ? styles.activeTabLabel : styles.inactiveTabLabel,
      ]}>
        {t(`common.${name.toLowerCase()}`)}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.tabLabel,
              focused ? styles.activeTabLabel : styles.inactiveTabLabel,
            ]}>
              {t('common.home')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name="Home"
              icon="🏠"
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.tabLabel,
              focused ? styles.activeTabLabel : styles.inactiveTabLabel,
            ]}>
              {t('common.search')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name="Explore"
              icon="🔍"
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.tabLabel,
              focused ? styles.activeTabLabel : styles.inactiveTabLabel,
            ]}>
              {t('common.notifications')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name="Notifications"
              icon="🔔"
              badge={3} // 실제 앱에서는 상태에서 가져오기
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.tabLabel,
              focused ? styles.activeTabLabel : styles.inactiveTabLabel,
            ]}>
              {t('common.profile')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name="Profile"
              icon="👤"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.footerBackground,
    height: theme.sizes.footerHeight + (Platform.OS === 'ios' ? 30 : 0),
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  activeTabIcon: {
    color: theme.colors.primary,
  },
  inactiveTabIcon: {
    color: theme.colors.textSecondary,
  },
  tabLabel: {
    fontSize: theme.sizes.fontSize.small,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  inactiveTabLabel: {
    color: theme.colors.textSecondary,
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
});

export default TabNavigator;