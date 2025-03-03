// src/screens/GestureTestScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainSection from '../components/common/MainSection';
import AnimatedCard from '../components/ui/AnimatedCard';
import Button from '../components/ui/Button';
import AnimatedScreen from '../components/common/AnimatedScreen';
import { theme } from '../themes/theme';

type GestureTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GestureTest'>;

interface GestureTestScreenProps {
  navigation: GestureTestScreenNavigationProp;
}

const GestureTestScreen: React.FC<GestureTestScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [animation, setAnimation] = useState<'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'none'>('fadeIn');
  const [removedCards, setRemovedCards] = useState<string[]>([]);

  const footerItems = [
    { label: t('common.home'), screen: 'Home', icon: '🏠' },
    { label: '제스처 테스트', screen: 'GestureTest', icon: '👆' },
    { label: t('common.settings'), screen: 'Settings', icon: '⚙️' },
  ];

  const handleSwipe = (direction: 'left' | 'right', cardId: string) => {
    Alert.alert(
      '카드 스와이프',
      `카드가 ${direction === 'left' ? '왼쪽' : '오른쪽'}으로 스와이프 되었습니다.`,
      [{ text: '확인', onPress: () => setRemovedCards([...removedCards, cardId]) }]
    );
  };

  const changeAnimation = (newAnimation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'none') => {
    setAnimation(newAnimation);
    // 애니메이션 변경 시 카드 초기화
    setRemovedCards([]);
  };

  return (
    <AnimatedScreen animation={animation} duration={800}>
      <View style={styles.container}>
        <Header title="제스처 및 애니메이션 테스트" showBackButton={true} />
        
        <MainSection>
          <View style={styles.animationControls}>
            <Text style={styles.sectionTitle}>화면 애니메이션 변경</Text>
            <View style={styles.buttonRow}>
              <Button 
                title="페이드 인" 
                onPress={() => changeAnimation('fadeIn')} 
                type={animation === 'fadeIn' ? 'primary' : 'outline'}
                size="small"
              />
              <Button 
                title="슬라이드 업" 
                onPress={() => changeAnimation('slideUp')} 
                type={animation === 'slideUp' ? 'primary' : 'outline'}
                size="small"
              />
              <Button 
                title="슬라이드 좌측" 
                onPress={() => changeAnimation('slideLeft')} 
                type={animation === 'slideLeft' ? 'primary' : 'outline'}
                size="small"
              />
              <Button 
                title="줌 인" 
                onPress={() => changeAnimation('zoomIn')} 
                type={animation === 'zoomIn' ? 'primary' : 'outline'}
                size="small"
              />
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>제스처 카드 예시</Text>
          <Text style={styles.description}>
            아래 카드들을 탭해보세요. 다양한 애니메이션 인터랙션을 테스트할 수 있습니다.
          </Text>
          
          {!removedCards.includes('card1') && (
            <AnimatedCard
              title="애니메이션 카드 1"
              appearance="elevated"
              onPress={() => Alert.alert('카드 탭', '카드가 탭되었습니다!')}
            >
              <Text style={styles.cardText}>
                이 카드를 탭하면 애니메이션 효과와 함께 반응합니다.
                카드 자체에도 페이드인 애니메이션이 적용되어 있습니다.
              </Text>
            </AnimatedCard>
          )}
          
          {!removedCards.includes('card2') && (
            <AnimatedCard
              title="애니메이션 카드 2"
              appearance="outlined"
              onPress={() => Alert.alert('카드 탭', '두 번째 카드가 탭되었습니다!')}
            >
              <Text style={styles.cardText}>
                이 카드는 다른 스타일로 표시됩니다.
                카드마다 다른 디자인을 적용할 수 있습니다.
              </Text>
            </AnimatedCard>
          )}
          
          {!removedCards.includes('card3') && (
            <AnimatedCard
              title="탭하면 제거되는 카드"
              appearance="default"
              onPress={() => {
                Alert.alert(
                  '카드 제거',
                  '이 카드를 제거하시겠습니까?',
                  [
                    { text: '취소', style: 'cancel' },
                    { text: '확인', onPress: () => setRemovedCards([...removedCards, 'card3']) }
                  ]
                );
              }}
            >
              <Text style={styles.cardText}>
                이 카드를 탭하면 제거할지 묻는 알림이 표시됩니다.
                확인을 누르면 카드가 사라집니다.
              </Text>
            </AnimatedCard>
          )}
          
          {removedCards.length > 0 && (
            <Button 
              title="카드 초기화" 
              onPress={() => setRemovedCards([])}
              style={styles.resetButton}
            />
          )}
        </MainSection>
        
        <Footer items={footerItems} />
      </View>
    </AnimatedScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: theme.sizes.fontSize.large,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 22,
    marginBottom: 20,
    color: theme.colors.text,
  },
  animationControls: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  cardText: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 22,
    color: theme.colors.text,
  },
  resetButton: {
    marginTop: 20,
  },
});

export default GestureTestScreen;