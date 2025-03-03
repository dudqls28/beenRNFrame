// src/navigation/linking.ts
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

// 딥 링크 설정
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    // 앱의 실제 URL 스키마와 도메인 추가
    'myapp://',
    'https://myapp.example.com',
    'https://www.myapp.example.com',
  ],
  
  // URL을 앱 내 화면으로 매핑하는 설정
  config: {
    // 초기 화면 설정
    initialRouteName: 'Main',
    
    // 화면 경로 설정
    screens: {
      // 인증 관련 화면
      Auth: {
        screens: {
          Welcome: 'welcome',
          Login: 'login',
          Register: 'register',
          ForgotPassword: 'forgot-password',
        },
      },
      
      // 메인 앱 화면
      Main: {
        screens: {
          // 홈 탭 및 스택
          HomeTab: {
            screens: {
              Home: 'home',
              Details: {
                path: 'details/:id?',
                parse: {
                  id: (id) => id,
                },
              },
              Settings: 'settings',
            },
          },
          
          // 탐색 탭 및 스택
          ExploreTab: {
            screens: {
              Explore: 'explore',
              CategoryList: {
                path: 'category/:category',
                parse: {
                  category: (category) => decodeURIComponent(category),
                },
              },
              ItemDetail: {
                path: 'item/:id',
                parse: {
                  id: (id) => id,
                },
              },
            },
          },
          
          // 알림 탭 및 스택
          NotificationsTab: {
            screens: {
              Notifications: 'notifications',
              NotificationDetail: {
                path: 'notification/:id',
                parse: {
                  id: (id) => id,
                },
              },
            },
          },
          
          // 프로필 탭 및 스택
          ProfileTab: {
            screens: {
              Profile: 'profile',
              EditProfile: 'edit-profile',
              Preferences: 'preferences',
              About: 'about',
            },
          },
        },
      },
      
      // 모달 화면
      Modal: {
        path: 'modal/:title?',
        parse: {
          title: (title) => decodeURIComponent(title || ''),
        },
      },
      
      // 전체 화면 이미지
      FullScreenImage: {
        path: 'image/:imageUrl',
        parse: {
          imageUrl: (url) => decodeURIComponent(url),
        },
      },
      
      // 존재하지 않는 경로는 홈으로
      NotFound: '*',
    },
  },
};

export default linking;