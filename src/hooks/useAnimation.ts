// src/hooks/useAnimation.ts
import { useRef, useEffect } from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';

interface AnimationConfig {
  type?: 'timing' | 'spring' | 'decay';
  initialValue?: number;
  toValue?: number;
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
  useNativeDriver?: boolean;
  damping?: number;
  stiffness?: number;
  mass?: number;
  velocity?: number;
  resetOnChange?: boolean;
  onComplete?: () => void;
}

export function useAnimatedValue(initialValue: number = 0) {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  return animatedValue;
}

export function useAnimation(config: AnimationConfig = {}) {
  const {
    type = 'timing',
    initialValue = 0,
    toValue = 1,
    duration = 300,
    delay = 0,
    easing = Easing.ease,
    useNativeDriver = true,
    damping = 10,
    stiffness = 100,
    mass = 1,
    velocity = 0,
    resetOnChange = false,
    onComplete,
  } = config;

  const value = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    // 리셋 옵션이 켜져 있으면 초기값으로 재설정
    if (resetOnChange) {
      value.setValue(initialValue);
    }

    // 지연 설정
    const timeout = setTimeout(() => {
      let animation;

      // 애니메이션 타입에 따라 구성
      switch (type) {
        case 'timing':
          animation = Animated.timing(value, {
            toValue,
            duration,
            easing,
            useNativeDriver,
          });
          break;

        case 'spring':
          animation = Animated.spring(value, {
            toValue,
            damping,
            stiffness,
            mass,
            useNativeDriver,
          });
          break;

        case 'decay':
          animation = Animated.decay(value, {
            velocity,
            useNativeDriver,
          });
          break;

        default:
          animation = Animated.timing(value, {
            toValue,
            duration,
            easing,
            useNativeDriver,
          });
      }

      // 애니메이션 시작 및 완료 콜백 핸들링
      animation.start(({ finished }) => {
        if (finished && onComplete) {
          onComplete();
        }
      });

      return () => animation.stop();
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    type,
    initialValue,
    toValue,
    duration,
    delay,
    easing,
    useNativeDriver,
    damping,
    stiffness,
    mass,
    velocity,
    value,
    resetOnChange,
    onComplete,
  ]);

  return value;
}

// Sequence 애니메이션 유틸리티 함수
export function useSequenceAnimation(
  animations: Array<{ value: Animated.Value; config: AnimationConfig }>,
  autoStart: boolean = true
) {
  const sequence = useRef<Animated.CompositeAnimation | null>(null);

  const start = (callback?: Animated.EndCallback) => {
    if (sequence.current) {
      sequence.current.stop();
    }

    const animationSequence = animations.map(({ value, config }) => {
      const {
        type = 'timing',
        toValue = 1,
        duration = 300,
        easing = Easing.ease,
        useNativeDriver = true,
        damping = 10,
        stiffness = 100,
        mass = 1,
        velocity = 0,
      } = config;

      switch (type) {
        case 'timing':
          return Animated.timing(value, {
            toValue,
            duration,
            easing,
            useNativeDriver,
          });
        case 'spring':
          return Animated.spring(value, {
            toValue,
            damping,
            stiffness,
            mass,
            useNativeDriver,
          });
        case 'decay':
          return Animated.decay(value, {
            velocity,
            useNativeDriver,
          });
        default:
          return Animated.timing(value, {
            toValue,
            duration,
            easing,
            useNativeDriver,
          });
      }
    });

    sequence.current = Animated.sequence(animationSequence);
    sequence.current.start(callback);
  };

  const stop = () => {
    if (sequence.current) {
      sequence.current.stop();
    }
  };

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart]);

  return { start, stop };
}

// 기본 트랜지션 애니메이션 컬렉션
export const transitions = {
  fadeIn: (duration = 300) => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration },
  }),
  fadeOut: (duration = 300) => ({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration },
  }),
  slideInUp: (duration = 300) => ({
    from: { opacity: 0, translateY: 50 },
    to: { opacity: 1, translateY: 0 },
    config: { duration },
  }),
  slideInDown: (duration = 300) => ({
    from: { opacity: 0, translateY: -50 },
    to: { opacity: 1, translateY: 0 },
    config: { duration },
  }),
  slideInLeft: (duration = 300) => ({
    from: { opacity: 0, translateX: -50 },
    to: { opacity: 1, translateX: 0 },
    config: { duration },
  }),
  slideInRight: (duration = 300) => ({
    from: { opacity: 0, translateX: 50 },
    to: { opacity: 1, translateX: 0 },
    config: { duration },
  }),
  zoomIn: (duration = 300) => ({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: { duration },
  }),
  zoomOut: (duration = 300) => ({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.9 },
    config: { duration },
  }),
};

export default { useAnimatedValue, useAnimation, useSequenceAnimation, transitions };