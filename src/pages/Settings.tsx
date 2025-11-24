import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Users, Shield, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure system settings and access control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">API Configuration</h3>
              <p className="text-sm text-slate-400">Configure TimeZone API integration</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                TimeZone API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                placeholder="Enter API key"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sync Frequency
              </label>
              <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                <option>Every Hour</option>
                <option>Every 6 Hours</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
              <Save className="w-5 h-5" />
              Save Configuration
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Role-Based Access</h3>
              <p className="text-sm text-slate-400">Manage user roles and permissions</p>
            </div>
          </div>

          <div className="space-y-3">
            {['Admin', 'Delivery Manager', 'Project Manager', 'Finance Manager', 'Account Manager', 'Team Member'].map((role) => (
              <div key={role} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <span className="text-sm text-slate-300">{role}</span>
                <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                  {role === 'Admin' ? '5' : role === 'Team Member' ? '120' : Math.floor(Math.random() * 20 + 5)} users
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">User Management</h3>
              <p className="text-sm text-slate-400">Manage employee access</p>
            </div>
          </div>

          <div className="space-y-4">
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

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-300">Auto-approve new users</span>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">System Preferences</h3>
              <p className="text-sm text-slate-400">Configure system behavior</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Default Currency
              </label>
              <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time Zone
              </label>
              <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                <option>UTC</option>
                <option>EST (UTC-5)</option>
                <option>PST (UTC-8)</option>
                <option>IST (UTC+5:30)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
