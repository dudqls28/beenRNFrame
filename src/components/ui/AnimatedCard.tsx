// src/components/ui/AnimatedCard.tsx
import React, { useRef, useEffect } from 'react';
import { 
  Animated, 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Text,
  ViewStyle,
  TextStyle,
  Easing
} from 'react-native';
import { 
  PanGestureHandler, 
  State, 
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import { theme } from '../../themes/theme';

interface AnimatedCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  onPress?: () => void;
  onSwipe?: (direction: 'left' | 'right') => void;
  swipeable?: boolean;
  swipeThreshold?: number;
  appearance?: 'default' | 'outlined' | 'elevated';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  subtitle,
  children,
  style,
  titleStyle,
  subtitleStyle,
  onPress,
  onSwipe,
  swipeable = false,
  swipeThreshold = 100,
  appearance = 'default',
}) => {
  // 애니메이션 값 설정
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  
  // 진입 애니메이션
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 터치 애니메이션
  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // 스와이프 제스처 핸들러
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (swipeable) {
      translateX.setValue(event.nativeEvent.translationX);
    }
  };

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (!swipeable) return;

    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      
      // 스와이프 임계값을 넘었는지 확인
      if (Math.abs(translationX) > swipeThreshold) {
        const direction = translationX > 0 ? 'right' : 'left';
        
        // 스와이프 애니메이션
        Animated.timing(translateX, {
          toValue: direction === 'right' ? 500 : -500,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // 콜백 호출
          if (onSwipe) {
            onSwipe(direction);
          }
          // 리셋
          translateX.setValue(0);
        });
      } else {
        // 임계값을 넘지 않았으면 원위치
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  // 카드 스타일 설정
  let cardStyles = [
    styles.card,
    styles[`${appearance}Card`],
    { transform: [{ scale }, { translateX }], opacity },
    style,
  ];

  // 컴포넌트 렌더링
  const renderCardContent = () => (
    <Animated.View style={cardStyles}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );

  // 스와이프 가능한 카드인 경우
  if (swipeable) {
    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        {onPress ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            {renderCardContent()}
          </TouchableOpacity>
        ) : (
          renderCardContent()
        )}
      </PanGestureHandler>
    );
  }

  // 일반 카드
  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {renderCardContent()}
    </TouchableOpacity>
  ) : (
    renderCardContent()
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.sizes.borderRadius.medium,
    padding: theme.sizes.padding.medium,
    marginVertical: theme.sizes.padding.small,
  },
  defaultCard: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    marginBottom: theme.sizes.padding.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    paddingBottom: theme.sizes.padding.small,
  },
  title: {
    fontSize: theme.sizes.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.sizes.fontSize.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.sizes.padding.small,
  },
  content: {
    width: '100%',
  },
});

export default AnimatedCard;