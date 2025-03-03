// src/screens/SettingsScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainSection from '../components/common/MainSection';
import Card from '../components/ui/Card';
import LanguageSelector from '../components/ui/LanguageSelector';
import { theme } from '../themes/theme';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [dataSync, setDataSync] = React.useState(true);

  const footerItems = [
    { label: t('common.home'), screen: 'Home', icon: '🏠' },
    { label: t('common.details'), screen: 'Details', icon: '📝' },
    { label: t('common.settings'), screen: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      <Header title={t('settings.title')} showBackButton={true} />
      
      <MainSection>
        <Text style={styles.title}>{t('settings.appSettings')}</Text>
        <Text style={styles.description}>
          {t('settings.description')}
        </Text>
        
        <Card>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>{t('settings.notifications')}</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>{t('settings.darkMode')}</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>{t('settings.dataSync')}</Text>
            <Switch
              value={dataSync}
              onValueChange={setDataSync}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <LanguageSelector />
        </Card>
        
        <Card title={t('settings.appInfo')}>
          <Text style={styles.infoText}>{t('settings.version')}: 1.0.0</Text>
          <Text style={styles.infoText}>{t('settings.build')}: 2025.03.03</Text>
          <Text style={styles.infoText}>{t('settings.developer')}: Been </Text>
        </Card>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  settingLabel: {
    fontSize: theme.sizes.fontSize.medium,
    color: theme.colors.text,
  },
  infoText: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 22,
    color: theme.colors.text,
    marginBottom: 4,
  },
});

export default SettingsScreen;