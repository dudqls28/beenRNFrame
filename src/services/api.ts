// src/services/api.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API 기본 설정
const API_CONFIG = {
  BASE_URL: 'https://api.example.com', // 실제 API URL로 변경 필요
  TIMEOUT: 10000, // 10초
  CACHE_PREFIX: '@api_cache_',
  CACHE_EXPIRY: 60 * 60 * 1000, // 1시간 (밀리초)
};

// API 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-platform': Platform.OS,
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    // 토큰 추가 등 필요한 경우
    // const token = await AsyncStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 네트워크 오류 처리
    if (!error.response) {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        return Promise.reject({
          code: 'NETWORK_ERROR',
          message: 'You are offline. Please check your connection.',
        });
      }
      return Promise.reject({
        code: 'REQUEST_FAILED',
        message: 'The request failed. Please try again later.',
      });
    }

    // API 오류 처리
    const { status, data } = error.response;
    let errorMessage = 'Something went wrong';
    
    // 안전하게 data에서 메시지 추출
    const extractMessage = (responseData: unknown): string | undefined => {
      if (responseData && typeof responseData === 'object' && 'message' in responseData) {
        return (responseData as { message: string }).message;
      }
      return undefined;
    };

    switch (status) {
      case 400:
        errorMessage = extractMessage(data) || 'Bad request';
        break;
      case 401:
        errorMessage = extractMessage(data) || 'Unauthorized. Please login again';
        // 여기서 리프레시 토큰이나 로그아웃 로직을 추가할 수 있습니다
        break;
      case 403:
        errorMessage = extractMessage(data) || 'You do not have permission to access this resource';
        break;
      case 404:
        errorMessage = extractMessage(data) || 'The requested resource was not found';
        break;
      case 500:
        errorMessage = extractMessage(data) || 'Server error. Please try again later';
        break;
      default:
        errorMessage = extractMessage(data) || 'Unknown error occurred';
    }

    return Promise.reject({ code: status.toString(), message: errorMessage });
  }
);

// 캐시 키 생성
const getCacheKey = (url: string, params?: any): string => {
  const queryStr = params ? JSON.stringify(params) : '';
  return `${API_CONFIG.CACHE_PREFIX}${url}_${queryStr}`;
};

// 캐시 저장
const saveToCache = async (key: string, data: any): Promise<void> => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to save to cache:', error);
  }
};

// 캐시 가져오기
const getFromCache = async (key: string): Promise<any | null> => {
  try {
    const cachedData = await AsyncStorage.getItem(key);
    if (!cachedData) return null;

    const { data, timestamp } = JSON.parse(cachedData);
    const isExpired = Date.now() - timestamp > API_CONFIG.CACHE_EXPIRY;

    if (isExpired) {
      AsyncStorage.removeItem(key).catch(console.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to get from cache:', error);
    return null;
  }
};

// 오프라인 지원 API 요청 래퍼
export const apiService = {
  // GET 요청 with 캐싱
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = getCacheKey(url, config?.params);
    try {
      // 네트워크 상태 확인
      const netInfo = await NetInfo.fetch();
      
      // 캐시된 데이터가 있으면 반환
      const cachedData = await getFromCache(cacheKey);
      
      // 오프라인이고 캐시된 데이터가 있으면 캐시 사용
      if (!netInfo.isConnected) {
        if (cachedData) {
          return cachedData;
        }
        throw { code: 'OFFLINE', message: 'You are offline and no cached data is available' };
      }
      
      // 온라인이면 API 요청
      const response = await apiClient.get<T>(url, config);
      
      // 응답 캐싱
      await saveToCache(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      // 오류가 발생하고 캐시된 데이터가 있으면 그것을 반환
      const cachedData = await getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      
      throw error;
    }
  },

  // POST 요청
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT 요청
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE 요청
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 캐시 무효화
  async invalidateCache(url: string, params?: any): Promise<void> {
    const cacheKey = getCacheKey(url, params);
    await AsyncStorage.removeItem(cacheKey);
  },

  // 모든 캐시 지우기
  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(API_CONFIG.CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
};

export default apiService;