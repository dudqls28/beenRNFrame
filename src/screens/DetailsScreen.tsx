// src/screens/DetailsScreen.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainSection from '../components/common/MainSection';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { theme } from '../themes/theme';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const footerItems = [
    { label: '홈', screen: 'Home', icon: '🏠' },
    { label: '상세', screen: 'Details', icon: '📝' },
    { label: '설정', screen: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      <Header title="상세 화면" showBackButton={true} />
      
      <MainSection>
        <Text style={styles.title}>상세 정보</Text>
        <Text style={styles.description}>
          이 화면은 상세 정보를 보여주는 화면입니다. 헤더에 뒤로 가기 버튼이 있어 이전 화면으로 돌아갈 수 있습니다.
        </Text>
        
        <Card title="컴포넌트 재사용">
          <Text style={styles.cardText}>
            모든 화면은 동일한 Header, Footer, MainSection 컴포넌트를 사용합니다.
            각각의 컴포넌트는 props를 통해 쉽게 커스터마이징할 수 있습니다.
          </Text>
        </Card>
        
        <Card title="테마 시스템">
          <Text style={styles.cardText}>
            테마 시스템을 통해 앱의 모든 색상과 사이즈를 한 곳에서 관리할 수 있습니다.
            themes/theme.ts 파일에서 테마를 변경하면 모든 화면에 적용됩니다.
          </Text>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="홈으로 돌아가기" 
            onPress={() => navigation.navigate('Home')}
            type="outline"
            style={styles.button}
          />
        </View>
      </MainSection>
      
      <Footer items={footerItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.sizes.fontSize.xlarge,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 24,
    marginBottom: 24,
    color: theme.colors.text,
  },
  cardText: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 20,
    color: theme.colors.text,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'column',
  },
  button: {
    width: '100%',
  },
});

export default DetailsScreen;