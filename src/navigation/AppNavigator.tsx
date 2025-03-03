// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GestureTestScreen from '../screens/GestureTestScreen';

// 오프라인 알림 컴포넌트
import OfflineNotice from '../components/ui/OfflineNotice';

// 타입 정의: 앱의 모든 화면 파라미터 타입 정의
export type RootStackParamList = {
  Home: {
    showLabels?: boolean;
  } | undefined;
  Details: undefined;
  Settings: undefined;
  GestureTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <OfflineNotice />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // 기본 헤더 숨김 (커스텀 Header 컴포넌트 사용)
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="GestureTest" component={GestureTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;