// src/screens/HomeScreen.tsx
// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainSection from '../components/common/MainSection';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { theme } from '../themes/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const footerItems = [
    { label: t('common.home'), screen: 'Home', icon: '🏠' },
    { label: t('common.details'), screen: 'Details', icon: '📝' },
    { label: t('common.settings'), screen: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      <Header title={t('home.title')} />
      
      <MainSection>
        <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
        <Text style={styles.descriptionText}>
          {t('home.description')}
        </Text>
        
        <Card title={t('home.navigate')}>
          <Text style={styles.cardText}>
            {t('home.navigateDesc')}
          </Text>
          <View style={styles.buttonContainer}>
            <Button 
              title={t('home.toDetailsBtn')} 
              onPress={() => navigation.navigate('Details')}
              style={styles.button}
            />
            <Button 
              title={t('home.toSettingsBtn')}
              onPress={() => navigation.navigate('Settings')}
              type="secondary"
              style={styles.button}
            />
            <Button 
              title="제스처 테스트 화면" 
              onPress={() => navigation.navigate('GestureTest')}
              type="outline"
              style={styles.button}
            />
          </View>
        </Card>
        
        <Card title={t('home.templateUsage')}>
          <Text style={styles.cardText}>
            {t('home.templateDesc')}
          </Text>
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
  welcomeText: {
    fontSize: theme.sizes.fontSize.xlarge,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text,
  },
  descriptionText: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 24,
    marginBottom: 24,
    color: theme.colors.text,
  },
  cardText: {
    fontSize: theme.sizes.fontSize.medium,
    lineHeight: 20,
    marginBottom: 16,
    color: theme.colors.text,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
  profileButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
  },
  profileIcon: {
    fontSize: 18,
  },
});

export default HomeScreen;