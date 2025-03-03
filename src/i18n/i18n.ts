// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// 언어 리소스 임포트
import en from './locales/en.json';
import ko from './locales/ko.json';

// 지원 언어 타입 정의
interface Language {
  name: string;
  code: string;
  dir: 'ltr' | 'rtl';
}

// 지원 언어 목록
export const LANGUAGES: Record<string, Language> = {
  en: { name: 'English', code: 'en', dir: 'ltr' },
  ko: { name: '한국어', code: 'ko', dir: 'ltr' },
  // 필요한 언어를 추가할 수 있습니다
};

// 언어 변경 시 RTL/LTR 방향 처리를 위한 유틸 함수
export const setLanguageConfig = async (language: string) => {
  try {
    await AsyncStorage.setItem('user-language', language);
    
    // RTL 언어 처리 (아랍어, 히브리어 등)
    const langConfig = LANGUAGES[language];
    if (!langConfig) return false;
    
    const isRTL = langConfig.dir === 'rtl';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // RTL이 변경될 경우 앱 재시작 필요
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to save language setting', error);
    return false;
  }
};

// 저장된 언어 설정 로드
export const loadStoredLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('user-language');
    if (language && Object.keys(LANGUAGES).includes(language)) {
      return language;
    }
    // 저장된 언어가 없거나 지원하지 않는 경우 기본 언어 반환
    return 'en';
  } catch (error) {
    console.error('Failed to load language setting', error);
    return 'en';
  }
};

// i18n 초기화
const initI18n = async () => {
  try {
    const storedLanguage = await loadStoredLanguage();
    
    // i18n 초기화 - TypeScript 오버로드 이슈를 피하기 위해 as any 사용
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          ko: { translation: ko },
        },
        lng: storedLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      } as any);
    
    return i18n;
  } catch (error) {
    console.error('i18n 초기화 오류:', error);
    
    // 오류 발생 시 기본 설정으로 초기화
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      } as any);
    
    return i18n;
  }
};

// 타입스크립트 타입 체크 우회를 위한 모듈 확장
declare module 'i18next' {
  interface i18n {
    // 필요한 추가 메서드나 속성 정의
  }
}

export default initI18n;