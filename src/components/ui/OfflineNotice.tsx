// src/components/ui/OfflineNotice.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useConnection } from '../../contexts/ConnectionContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../themes/theme';

const OfflineNotice: React.FC = () => {
  const { isConnected } = useConnection();
  const { t } = useTranslation();

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('errors.offline', '오프라인 상태입니다. 인터넷 연결을 확인해주세요.')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.error,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  text: {
    color: '#FFFFFF',
    fontSize: theme.sizes.fontSize.small,
  },
});

export default OfflineNotice;