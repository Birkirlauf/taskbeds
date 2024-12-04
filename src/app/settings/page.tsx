'use client';

import React, { useState } from 'react';
import { 
  Building2,
  Users,
  Bell,
  Mail,
  Clock,
  Shield,
  Smartphone,
  Palette,
  Languages,
  HelpCircle,
  Save,
  Hotel,
  Bed,
  DollarSign,
  UserCog,
  Key,
  Briefcase
} from 'lucide-react';

interface HotelSettings {
  general: {
    hotelName: string;
    address: string;
    timezone: string;
    language: string;
    currency: string;
    contactEmail: string;
    contactPhone: string;
    websiteUrl: string;
  };
  rooms: {
    checkInTime: string;
    checkOutTime: string;
    cleaningBuffer: number;
    maintenanceWindow: string;
    autoAssignment: boolean;
    lateCheckoutFee: number;
    earlyCheckinAllowed: boolean;
    turndownService: boolean;
  };
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifications: boolean;
    dailyReport: boolean;
    criticalAlerts: boolean;
    revenueAlerts: boolean;
    occupancyAlerts: boolean;
  };
  staff: {
    shiftDuration: number;
    maxTasksPerDay: number;
    breakDuration: number;
    autoScheduling: boolean;
    minimumStaffing: {
      housekeeping: number;
      maintenance: number;
      frontDesk: number;
    };
    overtimeAllowed: boolean;
    trainingRequired: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordExpiration: number;
    sessionTimeout: number;
    accessLogs: boolean;
    restrictedAccess: boolean;
  };
  business: {
    taxRate: number;
    defaultCancellationPolicy: string;
    minimumStayLength: number;
    depositRequired: boolean;
    depositPercentage: number;
    revenueGoals: {
      daily: number;
      monthly: number;
      yearly: number;
    };
  };
}

const initialSettings: HotelSettings = {
  general: {
    hotelName: 'Grand Hotel',
    address: '123 Hospitality Ave, City',
    timezone: 'America/New_York',
    language: 'English',
    currency: 'USD',
    contactEmail: 'info@grandhotel.com',
    contactPhone: '(555) 123-4567',
    websiteUrl: 'www.grandhotel.com'
  },
  rooms: {
    checkInTime: '15:00',
    checkOutTime: '11:00',
    cleaningBuffer: 30,
    maintenanceWindow: '23:00-05:00',
    autoAssignment: true,
    lateCheckoutFee: 50,
    earlyCheckinAllowed: true,
    turndownService: true
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    dailyReport: true,
    criticalAlerts: true,
    revenueAlerts: true,
    occupancyAlerts: true
  },
  staff: {
    shiftDuration: 8,
    maxTasksPerDay: 15,
    breakDuration: 60,
    autoScheduling: true,
    minimumStaffing: {
      housekeeping: 3,
      maintenance: 1,
      frontDesk: 2
    },
    overtimeAllowed: true,
    trainingRequired: true
  },
  security: {
    twoFactorAuth: true,
    passwordExpiration: 90,
    sessionTimeout: 30,
    accessLogs: true,
    restrictedAccess: true
  },
  business: {
    taxRate: 8.5,
    defaultCancellationPolicy: '24 hours',
    minimumStayLength: 1,
    depositRequired: true,
    depositPercentage: 20,
    revenueGoals: {
      daily: 5000,
      monthly: 150000,
      yearly: 1800000
    }
  }
};

const menuSections = [
  {
    title: 'Main',
    items: [
      { icon: Building2, label: 'General', value: 'general' },
      { icon: Hotel, label: 'Rooms', value: 'rooms' },
      { icon: Bell, label: 'Notifications', value: 'notifications' },
    ]
  },
  {
    title: 'Management',
    items: [
      { icon: Users, label: 'Staff', value: 'staff' },
      { icon: Shield, label: 'Security', value: 'security' },
      { icon: DollarSign, label: 'Business', value: 'business' },
    ]
  }
];

export default function Settings() {
  const [settings, setSettings] = useState<HotelSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  const SettingSection = ({ 
    title, 
    description,
    children 
  }: { 
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const TabButton = ({ 
    icon: Icon, 
    label, 
    isActive,
    onClick 
  }: { 
    icon: any;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full p-3 rounded-lg text-left
        ${isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const renderGeneralSettings = () => (
    <div>
      <SettingSection
        title="Hotel Information"
        description="Basic information about your hotel"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Name
            </label>
            <input
              type="text"
              value={settings.general.hotelName}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, hotelName: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={settings.general.address}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, address: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Regional Settings"
        description="Configure timezone and localization preferences"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              value={settings.general.timezone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={settings.general.language}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={settings.general.currency}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, currency: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderRoomSettings = () => (
    <div>
      <SettingSection
        title="Check-in/Check-out Times"
        description="Configure default times for room management"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Time
            </label>
            <input
              type="time"
              value={settings.rooms.checkInTime}
              onChange={(e) => setSettings({
                ...settings,
                rooms: { ...settings.rooms, checkInTime: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Time
            </label>
            <input
              type="time"
              value={settings.rooms.checkOutTime}
              onChange={(e) => setSettings({
                ...settings,
                rooms: { ...settings.rooms, checkOutTime: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Cleaning Settings"
        description="Configure room cleaning and maintenance preferences"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cleaning Buffer (minutes)
            </label>
            <input
              type="number"
              value={settings.rooms.cleaningBuffer}
              onChange={(e) => setSettings({
                ...settings,
                rooms: { ...settings.rooms, cleaningBuffer: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maintenance Window
            </label>
            <input
              type="text"
              value={settings.rooms.maintenanceWindow}
              onChange={(e) => setSettings({
                ...settings,
                rooms: { ...settings.rooms, maintenanceWindow: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.rooms.autoAssignment}
              onChange={(e) => setSettings({
                ...settings,
                rooms: { ...settings.rooms, autoAssignment: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Enable automatic room assignment
            </label>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderNotificationSettings = () => (
    <div>
      <SettingSection
        title="Alert Preferences"
        description="Configure how you want to receive notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailAlerts: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-sm text-gray-500">Receive urgent notifications via SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.smsAlerts}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsAlerts: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive in-app notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Report Settings"
        description="Configure automated reports and alerts"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notifications.dailyReport}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, dailyReport: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Receive daily summary report
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notifications.criticalAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, criticalAlerts: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Receive critical issue alerts
            </label>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderStaffSettings = () => (
    <div>
      <SettingSection
        title="Shift Management"
        description="Configure staff scheduling and workload settings"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Duration (hours)
            </label>
            <input
              type="number"
              value={settings.staff.shiftDuration}
              onChange={(e) => setSettings({
                ...settings,
                staff: { ...settings.staff, shiftDuration: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Break Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.staff.breakDuration}
              onChange={(e) => setSettings({
                ...settings,
                staff: { ...settings.staff, breakDuration: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Workload Settings"
        description="Configure task assignment and scheduling preferences"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Tasks per Day
            </label>
            <input
              type="number"
              value={settings.staff.maxTasksPerDay}
              onChange={(e) => setSettings({
                ...settings,
                staff: { ...settings.staff, maxTasksPerDay: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.staff.autoScheduling}
              onChange={(e) => setSettings({
                ...settings,
                staff: { ...settings.staff, autoScheduling: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Enable automatic staff scheduling
            </label>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderSecuritySettings = () => (
    <div>
      <SettingSection
        title="Authentication"
        description="Configure security and authentication settings"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Require 2FA for all staff logins</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactorAuth: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Expiration (days)
            </label>
            <input
              type="number"
              value={settings.security.passwordExpiration}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, passwordExpiration: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Access Control"
        description="Configure access restrictions and logging"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.security.accessLogs}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, accessLogs: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Enable detailed access logs
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.security.restrictedAccess}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, restrictedAccess: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Enable restricted area access control
            </label>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderBusinessSettings = () => (
    <div>
      <SettingSection
        title="Financial Settings"
        description="Configure rates, fees, and financial policies"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={settings.business.taxRate}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, taxRate: parseFloat(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Stay Length (nights)
            </label>
            <input
              type="number"
              value={settings.business.minimumStayLength}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, minimumStayLength: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Deposit Policy"
        description="Configure deposit and cancellation policies"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.business.depositRequired}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, depositRequired: e.target.checked }
              })}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Require deposit for bookings
            </label>
          </div>
          {settings.business.depositRequired && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deposit Percentage (%)
              </label>
              <input
                type="number"
                value={settings.business.depositPercentage}
                onChange={(e) => setSettings({
                  ...settings,
                  business: { ...settings.business, depositPercentage: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cancellation Policy
            </label>
            <select
              value={settings.business.defaultCancellationPolicy}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, defaultCancellationPolicy: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24 hours">24 Hours</option>
              <option value="48 hours">48 Hours</option>
              <option value="72 hours">72 Hours</option>
              <option value="7 days">7 Days</option>
            </select>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Revenue Goals"
        description="Set revenue targets for performance tracking"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Goal ($)
            </label>
            <input
              type="number"
              value={settings.business.revenueGoals.daily}
              onChange={(e) => setSettings({
                ...settings,
                business: {
                  ...settings.business,
                  revenueGoals: {
                    ...settings.business.revenueGoals,
                    daily: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Goal ($)
            </label>
            <input
              type="number"
              value={settings.business.revenueGoals.monthly}
              onChange={(e) => setSettings({
                ...settings,
                business: {
                  ...settings.business,
                  revenueGoals: {
                    ...settings.business.revenueGoals,
                    monthly: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yearly Goal ($)
            </label>
            <input
              type="number"
              value={settings.business.revenueGoals.yearly}
              onChange={(e) => setSettings({
                ...settings,
                business: {
                  ...settings.business,
                  revenueGoals: {
                    ...settings.business.revenueGoals,
                    yearly: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </SettingSection>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your hotel system preferences and configurations</p>
      </header>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-medium text-gray-900 mb-1">{section.title}</h2>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <TabButton
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      isActive={activeTab === item.value}
                      onClick={() => setActiveTab(item.value)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'rooms' && renderRoomSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'staff' && renderStaffSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'business' && renderBusinessSettings()}

          <div className="mt-6 pt-6 border-t flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 