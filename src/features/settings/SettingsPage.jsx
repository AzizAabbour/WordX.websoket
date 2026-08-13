import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { User, Moon, Sun, Globe, Bell, Shield, CreditCard } from 'lucide-react';
import '../dashboard/DashboardPage.css';
import './SettingsPage.css';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('profile');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, email });
    alert('Profile updated successfully');
  };

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">Account Settings</h1>
          <p className="dashSubtitle">Manage your personal details, preferences, and account parameters</p>
        </div>
      </div>

      <div className="settingsContainer">
        {/* Settings Navigation Tabs */}
        <div className="settingsTabs">
          <button
            className={`settingTab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} /> Profile
          </button>
          <button
            className={`settingTab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Appearance
          </button>
        </div>

        {/* Tab Content */}
        <div className="settingsCard">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="settingsForm">
              <h2>Profile Information</h2>
              <div className="formGrid">
                <Input
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <Button type="submit" variant="primary">Save Changes</Button>
              </div>
            </form>
          )}

          {activeTab === 'appearance' && (
            <div className="settingsForm">
              <h2>Interface Theme</h2>
              <p className="settingsDesc">Choose between light and dark workspace modes</p>
              <div className="themeOptionsGrid">
                <div
                  className={`themeCard ${theme === 'light' ? 'selected' : ''}`}
                  onClick={() => theme === 'dark' && toggleTheme()}
                >
                  <Sun size={24} />
                  <span>Light Mode</span>
                </div>
                <div
                  className={`themeCard ${theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => theme === 'light' && toggleTheme()}
                >
                  <Moon size={24} />
                  <span>Dark Mode</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
