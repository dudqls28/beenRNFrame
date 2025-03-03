// src/navigation/RootNavigator.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// 네비게이터 및 스크린 임포트
import TabNavigator from './TabNavigator';
import AuthStack from './stacks/AuthStack';
import ModalScreen from '../screens/ModalScreen';
import FullScreenImageScreen from '../screens/FullScreenImageScreen';
import { RootStackParamList } from './types';

// 링킹 설정 (딥링크 지원)
import linking from './linking';

// 오프라인 알림 컴포넌트
import OfflineNotice from '../components/ui/OfflineNotice';

// 테마
import { theme } from '../themes/theme';

const Stack = createStackNavigator<RootStackParamList>();

// 로그인 상태 확인 (임시 예제)
const isLoggedIn = true; // 실제 앱에서는 상태 관리 또는 컨텍스트에서 가져오기

const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <OfflineNotice />
      
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Main' : 'Auth'}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          presentation: 'transparentModal',
        }}
      >
        {/* 인증 스택 */}
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationEnabled: false, // 인증 화면으로 전환 시 애니메이션 없음
          }}
        />
        
        {/* 메인 탭 네비게이터 */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            animationEnabled: false, // 메인 앱으로 전환 시 애니메이션 없음
          }}
        />
        
        {/* 모달 화면 */}
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            presentation: 'transparentModal',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
          }}
        />
        
        {/* 전체 화면 이미지 화면 */}
        <Stack.Screen
          name="FullScreenImage"
          component={FullScreenImageScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

// 이 파일에서 참조된 AuthStack, ModalScreen, FullScreenImageScreen 컴포넌트는
// 예시 목적으로만 언급됐으며, 실제 앱에서는 직접 구현해야 합니다.