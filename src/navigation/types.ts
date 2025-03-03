// src/navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Authentication Stack
export type AuthStackParamList = {
  Welcome: undefined;
  Login: { username?: string };
  Register: undefined;
  ForgotPassword: undefined;
};

// Main App Tab Navigator
export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

// Home Stack
export type HomeStackParamList = {
  Home: {
    showLabels?: boolean;
  } | undefined;
  Details: { id?: string; title?: string };
  Settings: undefined;
};

// Explore Stack
export type ExploreStackParamList = {
  Explore: undefined;
  CategoryList: { category?: string };
  ItemDetail: { id: string };
};

// Notifications Stack
export type NotificationsStackParamList = {
  Notifications: undefined;
  NotificationDetail: { id: string };
};

// Profile Stack
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Preferences: undefined;
  About: undefined;
};

// Root Stack (combines Auth and App)
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Modal: { title?: string; content?: string };
  FullScreenImage: { imageUrl: string };
};

// Navigation & Route Types
export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

export type DetailsScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Details'>;
export type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

export type SettingsScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Settings'>;
export type SettingsScreenRouteProp = RouteProp<HomeStackParamList, 'Settings'>;

export type ExploreScreenNavigationProp = StackNavigationProp<ExploreStackParamList, 'Explore'>;
export type ExploreScreenRouteProp = RouteProp<ExploreStackParamList, 'Explore'>;

export type NotificationsScreenNavigationProp = StackNavigationProp<NotificationsStackParamList, 'Notifications'>;
export type NotificationsScreenRouteProp = RouteProp<NotificationsStackParamList, 'Notifications'>;

export type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;
export type ProfileScreenRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Combined types for screen props
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

export interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
}

export interface ExploreScreenProps {
  navigation: ExploreScreenNavigationProp;
  route: ExploreScreenRouteProp;
}

export interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
  route: NotificationsScreenRouteProp;
}

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}