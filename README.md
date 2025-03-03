# Been-React-Native-Framework

## 소개

Been-React-Native-Framework는 React Native 앱 개발을 위한 강력하고 확장 가능한 프레임워크입니다. 재사용 가능한 컴포넌트, 다국어 지원, 
테마 시스템, 애니메이션 및 제스처 처리 등 다양한 기능을 제공하여 개발 시간을 단축하고 일관된 사용자 경험을 구현할 수 있습니다.
이 프레임워크는 모바일 앱을 빠르게 개발하면서도 높은 품질과 성능을 유지할 수 있도록 설계되었습니다.

## 주요 기능

- ✨ **재사용 가능한 UI 컴포넌트**: 헤더, 푸터, 카드 등 미리 구현된 UI 컴포넌트
- 🌍 **다국어 지원**: i18n을 통한 다중 언어 지원 시스템
- 🎨 **테마 시스템**: 쉽게 커스터마이징 가능한 색상 및 스타일 테마
- 📱 **반응형 레이아웃**: 다양한 화면 크기에 적응하는 레이아웃
- 🚀 **애니메이션 및 제스처**: 부드러운 화면 전환 및 인터랙션
- 🔄 **네트워크 상태 관리**: 오프라인 감지 및 대응 시스템
- 🧭 **간편한 네비게이션**: 직관적인 화면 이동 구조

## 시작하기

### 설치

```bash
# 프로젝트 클론
git clone https://github.com/yourusername/been-react-native-framework.git my-app
cd my-app

# 의존성 설치
npm install

# 앱 실행
npm start
```

# 프로젝트 구조
```bash
my-app/
  ├── App.tsx                     # 앱 진입점
  ├── src/
  │    ├── components/            # 재사용 컴포넌트
  │    │    ├── common/           # 레이아웃 컴포넌트
  │    │    └── ui/               # UI 컴포넌트
  │    ├── screens/               # 화면 컴포넌트
  │    ├── navigation/            # 네비게이션 설정
  │    ├── i18n/                  # 다국어 지원
  │    ├── contexts/              # Context API
  │    ├── themes/                # 테마 설정
  │    ├── services/              # API 서비스
  │    └── hooks/                 # 커스텀 훅
  └── assets/                     # 이미지, 폰트 등
```

# Header
```bash
// 기본 사용법
<Header title="화면 제목" />

// 뒤로가기 버튼이 있는 헤더
<Header title="상세 정보" showBackButton={true} />

// 커스텀 요소가 있는 헤더
<Header 
  title="설정" 
  rightComponent={<TouchableOpacity><Text>저장</Text></TouchableOpacity>} 
/>

// 검색 기능이 있는 헤더
<Header showSearch={true} onSearchPress={handleSearch} />
```

# Footer
```bash
// 기본 사용법
const footerItems = [
  { label: '홈', screen: 'Home', icon: '🏠' },
  { label: '검색', screen: 'Search', icon: '🔍' },
  { label: '설정', screen: 'Settings', icon: '⚙️' },
];

<Footer items={footerItems} />

// 아이콘만 표시
<Footer items={footerItems} showLabels={false} />
```

# MainSection
```bash
// 스크롤 가능한 콘텐츠
<MainSection>
  <Text>콘텐츠</Text>
</MainSection>

// 스크롤 불가능한 고정 콘텐츠
<MainSection scrollable={false}>
  <Text>고정 콘텐츠</Text>
</MainSection>

// 당겨서 새로고침 기능
<MainSection
  refreshing={refreshing}
  onRefresh={handleRefresh}
>
  <Text>당겨서 새로고침 가능한 콘텐츠</Text>
</MainSection>
```

# Button
```bash
// 기본 버튼
<Button title="버튼" onPress={handlePress} />

// 다양한 타입
<Button title="기본" type="primary" onPress={handlePress} />
<Button title="보조" type="secondary" onPress={handlePress} />
<Button title="외곽선" type="outline" onPress={handlePress} />
<Button title="텍스트만" type="text" onPress={handlePress} />

// 크기 조절
<Button title="작은 버튼" size="small" onPress={handlePress} />
<Button title="중간 버튼" size="medium" onPress={handlePress} />
<Button title="큰 버튼" size="large" onPress={handlePress} />

// 로딩 상태
<Button title="로딩 중" loading={true} onPress={handlePress} />
```

# AnimatedCard
```bash
// 기본 애니메이션 카드
<AnimatedCard title="애니메이션 카드">
  <Text>내용</Text>
</AnimatedCard>

// 탭 가능한 카드
<AnimatedCard 
  title="탭 가능한 카드"
  onPress={handlePress}
>
  <Text>내용</Text>
</AnimatedCard>

// 스와이프 가능한 카드
<AnimatedCard
  title="스와이프 가능한 카드"
  swipeable={true}
  onSwipe={(direction) => console.log(`${direction} 방향으로 스와이프됨`)}
>
  <Text>내용</Text>
</AnimatedCard>
```

# 다국어 지원
## i18n을 사용한 다국어 지원 시스템 제공 
1. src/i18n/locales/ 폴더에 언어별 JSON 파일을 추가합니다.
2. 컴포넌트에서 useTranslation 훅을 사용하여 번역을 적용합니다.
```bash
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('hello')}</Text>
      <Text>{t('welcome.message')}</Text>
    </View>
  );
};

<LanguageSelector />
```

# 테마 시스템 
```bash
import { theme } from '../themes/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding.medium,
  },
  title: {
    fontSize: theme.sizes.fontSize.large,
    color: theme.colors.text,
  },
});

// src/themes/theme.ts에서 사용할 테마 변경
export const theme: Theme = greenTheme; // 기본, 그린, 퍼플 등 다양한 테마 중 선택
```

# 기술 스택
React Native
TypeScript
React Navigation
i18next
React Native Animated
AsyncStorage

# 기여하기
버그 리포트, 기능 요청, 풀 리퀘스트 등 모든 기여를 환영합니다.

# 연락처
이메일: dudqls28@naver.com
GitHub: github.com/dudqls28








