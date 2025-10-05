import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, ChevronRight, Settings } from 'lucide-react-native';

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  onPress,
  showArrow = false,
  rightComponent,
}) => (
  <TouchableOpacity
    style={styles.settingsItem}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.settingsItemContent}>
      <View style={styles.settingsItemText}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && <ChevronRight size={20} color="#9CA3AF" />)}
    </View>
  </TouchableOpacity>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
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
    Alert.alert('Display Settings', 'Display settings coming soon!');
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


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* GET CAUGHT UP Section */}
        <View style={styles.sectionContainer}>
          <SectionHeader title="GET CAUGHT UP" />
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>News</Text>
              <Text style={styles.notificationSubtitle}>Latest news and updates.</Text>
            </View>
            <Switch
              value={notifications.news}
              onValueChange={(value) => setNotifications(prev => ({ ...prev, news: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
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
        <View style={styles.sectionContainer}>
          <SectionHeader title="SETTINGS" />
        </View>

        {/* App Settings Section */}
        <SectionHeader title="APP SETTINGS" />
        <SettingsItem
          title="Privacy Settings"
          onPress={handlePrivacySettings}
          showArrow
        />
        <SettingsItem
          title="Display Settings"
          onPress={handleDisplaySettings}
          showArrow
        />
        <SettingsItem
          title="Data Usage"
          onPress={handleDataUsage}
          showArrow
        />
        <SettingsItem
          title="Autoplay Videos"
          rightComponent={
            <Switch
              value={appSettings.autoplayVideos}
              onValueChange={(value) => setAppSettings(prev => ({ ...prev, autoplayVideos: value }))}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          }
        />

        {/* Support Section */}
        <SectionHeader title="SUPPORT" />
        <SettingsItem
          title="Report a Bug"
          onPress={handleReportBug}
        />
        <SettingsItem
          title="Contact Us"
          onPress={handleContactUs}
        />
        <SettingsItem
          title="Report a News Error"
          onPress={handleReportNewsError}
        />
        <SettingsItem
          title="Visit Our Help Center"
          onPress={handleHelpCenter}
        />

        {/* Account Actions */}
        <SettingsItem
          title="Log Out"
          onPress={handleLogOut}
        />

        {/* About Section */}
        <SettingsItem
          title="About This App"
          onPress={handleAboutApp}
          showArrow
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>The Dalhousie Gazette</Text>
          <Text style={styles.footerText}>Student Union Building, 3rd floor Room 345</Text>
          <Text style={styles.footerText}>6136 University Avenue</Text>
          <Text style={styles.footerText}>Halifax, Nova Scotia</Text>
          <Text style={styles.footerText}>B3H 4J2</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  settingsItem: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    color: '#000000',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});
