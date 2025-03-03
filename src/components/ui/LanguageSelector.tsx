// src/components/ui/LanguageSelector.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, setLanguageConfig } from '../../i18n/i18n';
import { theme } from '../../themes/theme';

interface LanguageSelectorProps {
  style?: any;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const currentLanguage = LANGUAGES[i18n.language] || LANGUAGES.en;

  const changeLanguage = async (langCode: string) => {
    if (langCode === i18n.language) {
      setModalVisible(false);
      return;
    }
    
    // 언어 변경 적용
    const needsRestart = await setLanguageConfig(langCode);
    i18n.changeLanguage(langCode);
    setModalVisible(false);
    
    // RTL 언어로 변경된 경우 앱 재시작 알림
    if (needsRestart) {
      Alert.alert(
        t('common.notice') || 'Notice',
        t('settings.languageRestartRequired') || 'Please restart the app for the language changes to take effect',
        [{ text: t('common.ok') || 'OK' }]
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>{t('settings.language') || 'Language'}</Text>
        <Text style={styles.value}>{currentLanguage.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.selectLanguage') || 'Select Language'}</Text>
            
            <ScrollView style={styles.languageList}>
              {Object.entries(LANGUAGES).map(([code, language]) => (
                <TouchableOpacity
                  key={code}
                  style={[
                    styles.languageItem,
                    i18n.language === code && styles.selectedLanguage
                  ]}
                  onPress={() => changeLanguage(code)}
                >
                  <Text
                    style={[
                      styles.languageName,
                      i18n.language === code && styles.selectedLanguageText
                    ]}
                  >
                    {language.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t('common.cancel') || 'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  label: {
    fontSize: theme.sizes.fontSize.medium,
    color: theme.colors.text,
  },
  value: {
    fontSize: theme.sizes.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.sizes.borderRadius.medium,
    padding: theme.sizes.padding.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: theme.sizes.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
  },
  languageList: {
    width: '100%',
    maxHeight: 300,
  },
  languageItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  selectedLanguage: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  languageName: {
    fontSize: 16,
    color: theme.colors.text,
  },
  selectedLanguageText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.sizes.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  closeButtonText: {
    color: theme.colors.text,
    fontSize: theme.sizes.fontSize.medium,
    fontWeight: '500',
  },
});

export default LanguageSelector;