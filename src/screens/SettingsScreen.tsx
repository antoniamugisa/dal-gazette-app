import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, ChevronRight, Settings, Check } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { ThemeMode } from '../types';

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps & { theme: any }> = ({
  title,
  subtitle,
  onPress,
  showArrow = false,
  rightComponent,
  theme,
}) => (
  <TouchableOpacity
    style={[styles.settingsItem, { borderBottomColor: theme.colors.border }]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.settingsItemContent}>
      <View style={styles.settingsItemText}>
        <Text style={[styles.settingsItemTitle, { color: theme.colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.settingsItemSubtitle, { color: theme.colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && <ChevronRight size={20} color={theme.colors.textSecondary} />)}
    </View>
  </TouchableOpacity>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps & { theme: any }> = ({ title, theme }) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionHeaderText, { color: theme.colors.textSecondary }]}>{title}</Text>
  </View>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, themeMode, setThemeMode } = useAppContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const settingsSectionRef = useRef<View>(null);
  
  const [notifications, setNotifications] = useState({
    news: true,
    topStories: true,
    morningStories: true,
    dalhousie: false,
    halifax: false,
    sport: false,
    artCulture: false,
  });

  const [appSettings, setAppSettings] = useState({
    autoplayVideos: true,
  });

  const [showThemeModal, setShowThemeModal] = useState(false);


  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubscribe = () => {
    Alert.alert('Subscribe', 'Subscription feature coming soon!');
  };

  const handleRestoreSubscription = () => {
    Alert.alert('Restore Subscription', 'Restore subscription feature coming soon!');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Privacy Settings', 'Privacy settings coming soon!');
  };

  const handleDisplaySettings = () => {
    setShowThemeModal(true);
  };

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    setShowThemeModal(false);
  };

  const getThemeDisplayName = (mode: ThemeMode): string => {
    switch (mode) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'System';
    }
  };

  const handleDataUsage = () => {
    Alert.alert('Data Usage', 'Data usage settings coming soon!');
  };

  const handleReportBug = () => {
    Alert.alert('Report a Bug', 'Bug reporting feature coming soon!');
  };

  const handleContactUs = () => {
    Alert.alert('Contact Us', 'Contact us feature coming soon!');
  };

  const handleReportNewsError = () => {
    Alert.alert('Report a News Error', 'News error reporting feature coming soon!');
  };

  const handleHelpCenter = () => {
    Alert.alert('Help Center', 'Help center feature coming soon!');
  };

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  const handleAboutApp = () => {
    Alert.alert('About This App', 'Dal Gazette App v1.0.0\n\nYour source for campus news and updates.');
  };

  const handleSettingsIconPress = () => {
    settingsSectionRef.current?.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y: y - 50, animated: true });
      },
      () => {}
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Account</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsIconPress}>
            <Settings size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* GET CAUGHT UP Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SectionHeader title="GET CAUGHT UP" theme={theme} />
          <View style={[styles.notificationItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: theme.colors.text }]}>News</Text>
              <Text style={[styles.notificationSubtitle, { color: theme.colors.textSecondary }]}>Latest news and updates.</Text>
            </View>
            <Switch
              value={notifications.news}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, news: value }))}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={theme.colors.surface}
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Top Stories</Text>
              <Text style={styles.notificationSubtitle}>The most important stories.</Text>
            </View>
            <Switch
              value={notifications.topStories}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, topStories: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Morning Stories</Text>
              <Text style={styles.notificationSubtitle}>Catch up on the biggest news every morning.</Text>
            </View>
            <Switch
              value={notifications.morningStories}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, morningStories: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Dalhousie</Text>
              <Text style={styles.notificationSubtitle}>University news and updates.</Text>
            </View>
            <Switch
              value={notifications.dalhousie}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, dalhousie: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Halifax</Text>
              <Text style={styles.notificationSubtitle}>Local Halifax news and events.</Text>
            </View>
            <Switch
              value={notifications.halifax}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, halifax: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Sport</Text>
              <Text style={styles.notificationSubtitle}>Sports news and updates.</Text>
            </View>
            <Switch
              value={notifications.sport}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, sport: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Art & Culture</Text>
              <Text style={styles.notificationSubtitle}>Arts, culture, and entertainment news.</Text>
            </View>
            <Switch
              value={notifications.artCulture}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, artCulture: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* SETTINGS Section */}
        <View ref={settingsSectionRef} style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SectionHeader title="SETTINGS" theme={theme} />
        </View>

        {/* App Settings Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SectionHeader title="APP SETTINGS" theme={theme} />
          <SettingsItem
            title="Privacy Settings"
            onPress={handlePrivacySettings}
            showArrow
            theme={theme}
          />
          <SettingsItem
            title="Display Settings"
            subtitle={getThemeDisplayName(themeMode)}
            onPress={handleDisplaySettings}
            showArrow
            theme={theme}
          />
          <SettingsItem
            title="Data Usage"
            onPress={handleDataUsage}
            showArrow
            theme={theme}
          />
          <SettingsItem
            title="Autoplay Videos"
            rightComponent={
              <Switch
                value={appSettings.autoplayVideos}
                onValueChange={(value) => setAppSettings(prev => ({ ...prev, autoplayVideos: value }))}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={theme.colors.surface}
              />
            }
            theme={theme}
          />
        </View>

        {/* Support Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SectionHeader title="SUPPORT" theme={theme} />
          <SettingsItem
            title="Report a Bug"
            onPress={handleReportBug}
            theme={theme}
          />
          <SettingsItem
            title="Contact Us"
            onPress={handleContactUs}
            theme={theme}
          />
          <SettingsItem
            title="Report a News Error"
            onPress={handleReportNewsError}
            theme={theme}
          />
          <SettingsItem
            title="Visit Our Help Center"
            onPress={handleHelpCenter}
            theme={theme}
          />
        </View>

        {/* Account Actions */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SettingsItem
            title="Log Out"
            onPress={handleLogOut}
            theme={theme}
          />
        </View>

        {/* About Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.colors.surface }]}>
          <SettingsItem
            title="About This App"
            onPress={handleAboutApp}
            showArrow
            theme={theme}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>The Dalhousie Gazette</Text>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Student Union Building, 3rd floor Room 345</Text>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>6136 University Avenue</Text>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Halifax, Nova Scotia</Text>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>B3H 4J2</Text>
        </View>
      </ScrollView>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Choose Theme</Text>
            
            <TouchableOpacity
              style={[styles.themeOption, { borderBottomColor: theme.colors.border }]}
              onPress={() => handleThemeSelect('light')}
            >
              <View style={styles.themeOptionContent}>
                <Text style={[styles.themeOptionTitle, { color: theme.colors.text }]}>Light</Text>
                <Text style={[styles.themeOptionSubtitle, { color: theme.colors.textSecondary }]}>
                  Always use light theme
                </Text>
              </View>
              {themeMode === 'light' && <Check size={20} color={theme.colors.primary} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.themeOption, { borderBottomColor: theme.colors.border }]}
              onPress={() => handleThemeSelect('dark')}
            >
              <View style={styles.themeOptionContent}>
                <Text style={[styles.themeOptionTitle, { color: theme.colors.text }]}>Dark</Text>
                <Text style={[styles.themeOptionSubtitle, { color: theme.colors.textSecondary }]}>
                  Always use dark theme
                </Text>
              </View>
              {themeMode === 'dark' && <Check size={20} color={theme.colors.primary} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.themeOption}
              onPress={() => handleThemeSelect('system')}
            >
              <View style={styles.themeOptionContent}>
                <Text style={[styles.themeOptionTitle, { color: theme.colors.text }]}>System</Text>
                <Text style={[styles.themeOptionSubtitle, { color: theme.colors.textSecondary }]}>
                  Follow system settings
                </Text>
              </View>
              {themeMode === 'system' && <Check size={20} color={theme.colors.primary} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowThemeModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  settingsItem: {
    borderBottomWidth: 1,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  themeOptionContent: {
    flex: 1,
  },
  themeOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  themeOptionSubtitle: {
    fontSize: 14,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
