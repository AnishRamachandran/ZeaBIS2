import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Users, Shield, Database, Palette, Bell, Lock } from 'lucide-react';
import { ApiKeyManagement } from '../components/ApiKeyManagement';
import { RBACManagement } from '../components/RBACManagement';
import { UserRoleMapping } from '../components/UserRoleMapping';

type TabType = 'api' | 'rbac' | 'users' | 'system' | 'appearance' | 'notifications' | 'security';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('api');

  const tabs = [
    { id: 'api' as TabType, label: 'API Keys', icon: Key },
    { id: 'rbac' as TabType, label: 'Permissions', icon: Shield },
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'system' as TabType, label: 'System', icon: SettingsIcon },
    { id: 'appearance' as TabType, label: 'Appearance', icon: Palette },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'security' as TabType, label: 'Security', icon: Lock },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure system settings and access control</p>
      </div>

      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        {activeTab === 'api' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">API Key Management</h3>
                <p className="text-sm text-slate-400">Configure API keys for database tables</p>
              </div>
            </div>
            <ApiKeyManagement />
          </div>
        )}

        {activeTab === 'rbac' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Role-Based Access Control</h3>
                <p className="text-sm text-slate-400">Configure permissions for each role</p>
              </div>
            </div>
            <RBACManagement />
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Employee Role Mapping</h3>
                <p className="text-sm text-slate-400">Assign roles to employees</p>
              </div>
            </div>
            <UserRoleMapping />
          </div>
        )}

        {activeTab === 'system' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">System Preferences</h3>
                <p className="text-sm text-slate-400">Configure general system settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Regional Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Default Currency
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>INR - Indian Rupee</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>UTC - Coordinated Universal Time</option>
                      <option>EST - Eastern Standard Time (UTC-5)</option>
                      <option>PST - Pacific Standard Time (UTC-8)</option>
                      <option>IST - Indian Standard Time (UTC+5:30)</option>
                      <option>JST - Japan Standard Time (UTC+9)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                      <option>DD MMM YYYY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Time Format
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>12-hour (AM/PM)</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-5 h-5 text-slate-400" />
                  <h4 className="text-sm font-semibold text-white">Database & Sync</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Data Sync Frequency
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>Real-time</option>
                      <option>Every 15 minutes</option>
                      <option>Every Hour</option>
                      <option>Every 6 Hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Backup Schedule
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>Every 6 Hours</option>
                      <option>Every 12 Hours</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Retention Period
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                      <option>Forever</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Default User Role
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>Team Member</option>
                      <option>Project Manager</option>
                      <option>Delivery Manager</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">User Management</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Auto-approve new users</span>
                      <p className="text-xs text-slate-500 mt-1">Automatically grant access to new registrations</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Allow password reset</span>
                      <p className="text-xs text-slate-500 mt-1">Let users reset their passwords via email</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
                <p className="text-sm text-slate-400">Customize the look and feel</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900/50 border-2 border-blue-500 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors">
                    <div className="w-full h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded mb-3"></div>
                    <div className="text-sm font-medium text-white">Dark (Current)</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 border-2 border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors opacity-50">
                    <div className="w-full h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-3"></div>
                    <div className="text-sm font-medium text-slate-400">Light (Coming Soon)</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 border-2 border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors opacity-50">
                    <div className="w-full h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded mb-3"></div>
                    <div className="text-sm font-medium text-slate-400">Auto (Coming Soon)</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Accent Color
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {['blue', 'green', 'purple', 'pink', 'orange', 'teal', 'cyan', 'red'].map(color => (
                    <div
                      key={color}
                      className={`w-12 h-12 rounded-lg cursor-pointer border-2 ${
                        color === 'blue' ? 'border-white' : 'border-transparent'
                      } bg-${color}-500 hover:scale-110 transition-transform`}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sidebar Position
                </label>
                <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option>Left</option>
                  <option>Right</option>
                </select>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Display Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Compact mode</span>
                      <p className="text-xs text-slate-500 mt-1">Reduce spacing and padding</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Show breadcrumbs</span>
                      <p className="text-xs text-slate-500 mt-1">Display navigation breadcrumbs</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                <p className="text-sm text-slate-400">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Timesheet submissions', desc: 'When a team member submits a timesheet' },
                    { label: 'Timesheet approvals', desc: 'When your timesheet is approved or rejected' },
                    { label: 'Invoice updates', desc: 'When invoices are generated or paid' },
                    { label: 'Project milestones', desc: 'When project milestones are reached' },
                    { label: 'Budget alerts', desc: 'When project budget thresholds are exceeded' },
                    { label: 'System updates', desc: 'Important system and maintenance notifications' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div>
                        <span className="text-sm text-slate-300">{item.label}</span>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" defaultChecked={idx < 4} className="sr-only peer" />
                        <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">In-App Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Push notifications</span>
                      <p className="text-xs text-slate-500 mt-1">Show browser notifications</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Sound effects</span>
                      <p className="text-xs text-slate-500 mt-1">Play sounds for notifications</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">Notification Frequency</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Digest Schedule
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>Immediately</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Quiet Hours
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>None</option>
                      <option>10 PM - 8 AM</option>
                      <option>9 PM - 7 AM</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Security Settings</h3>
                <p className="text-sm text-slate-400">Manage security and privacy options</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Authentication</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Two-factor authentication</span>
                      <p className="text-xs text-slate-500 mt-1">Require 2FA for all accounts</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Session timeout</span>
                      <p className="text-xs text-slate-500 mt-1">Auto-logout after inactivity</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">Password Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Minimum Length
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>8 characters</option>
                      <option>10 characters</option>
                      <option>12 characters</option>
                      <option>16 characters</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password Expiry
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                      <option>Never</option>
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-sm text-slate-300">Require uppercase letters</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-sm text-slate-300">Require numbers</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-sm text-slate-300">Require special characters</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">Audit & Compliance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Audit logging</span>
                      <p className="text-xs text-slate-500 mt-1">Log all user actions for compliance</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">IP restriction</span>
                      <p className="text-xs text-slate-500 mt-1">Allow access only from specific IP ranges</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-sm text-slate-300">Failed login alerts</span>
                      <p className="text-xs text-slate-500 mt-1">Notify admins of suspicious login attempts</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
