// App.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 다국어 지원
import initI18n from './src/i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// 네트워크 연결 컨텍스트
import { ConnectionProvider } from './src/contexts/ConnectionContext';

// 네비게이션
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // i18n 초기화 상태
  const [i18nReady, setI18nReady] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // 앱 초기화
  useEffect(() => {
    const initialize = async () => {
      try {
        // 다국어 초기화
        await initI18n();
        setI18nReady(true);
      } catch (error) {
        console.error('초기화 오류:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initialize();
  }, []);
  
  // 로딩 화면
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text style={{ marginTop: 16, fontSize: 16 }}>앱 초기화 중...</Text>
      </View>
    );
  }
  
  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaProvider>
        <ConnectionProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </ConnectionProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}