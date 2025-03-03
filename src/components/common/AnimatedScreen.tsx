// src/components/common/AnimatedScreen.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, ViewStyle, Easing } from 'react-native';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'none';

interface AnimatedScreenProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

const AnimatedScreen: React.FC<AnimatedScreenProps> = ({
  children,
  animation = 'fadeIn',
  duration = 400,
  delay = 0,
  style,
}) => {
  // 애니메이션 값 설정
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const translateX = useRef(new Animated.Value(50)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 지정된 지연 시간 후 애니메이션 시작
    const animationTimeout = setTimeout(() => {
      let animationConfig;

      switch (animation) {
        case 'fadeIn':
          animationConfig = Animated.timing(opacity, {
            toValue: 1,
            duration,
            useNativeDriver: true,
            easing: Easing.ease,
          });
          break;

        case 'slideUp':
          animationConfig = Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
              easing: Easing.out(Easing.poly(4)),
            }),
          ]);
          break;

        case 'slideLeft':
          animationConfig = Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration,
              useNativeDriver: true,
              easing: Easing.out(Easing.poly(4)),
            }),
          ]);
          break;

        case 'zoomIn':
          animationConfig = Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration,
              useNativeDriver: true,
              easing: Easing.out(Easing.back(1.5)),
            }),
          ]);
          break;

        case 'none':
        default:
          opacity.setValue(1);
          translateY.setValue(0);
          translateX.setValue(0);
          scale.setValue(1);
          break;
      }

      if (animationConfig) {
        animationConfig.start();
      }
    }, delay);

    return () => clearTimeout(animationTimeout);
  }, [animation, duration, delay, opacity, translateY, translateX, scale]);

  // 애니메이션 스타일 설정
  let animatedStyle = {};

  switch (animation) {
    case 'fadeIn':
      animatedStyle = { opacity };
      break;
    case 'slideUp':
      animatedStyle = {
        opacity,
        transform: [{ translateY }],
      };
      break;
    case 'slideLeft':
      animatedStyle = {
        opacity,
        transform: [{ translateX }],
      };
      break;
    case 'zoomIn':
      animatedStyle = {
        opacity,
        transform: [{ scale }],
      };
      break;
    case 'none':
    default:
      animatedStyle = {};
      break;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedScreen;