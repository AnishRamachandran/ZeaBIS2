import React, { useState } from 'react';
import { User, FileText, Trash2, Edit, Plus, Key, Shield, Settings as SettingsIcon } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  status: 'success' | 'failed';
  ipAddress: string;
}

export const AuditLog: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const auditLogs: AuditLogEntry[] = [
    {
      id: '1',
      timestamp: '2024-11-25 10:45:23',
      user: 'admin@zeabis.com',
      action: 'create',
      resource: 'Project',
      details: 'Created new project "E-Commerce Platform"',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: '2024-11-25 10:30:15',
      user: 'john.smith@zeabis.com',
      action: 'update',
      resource: 'Timesheet',
      details: 'Updated timesheet for Nov 24, 2024',
      status: 'success',
      ipAddress: '192.168.1.105',
    },
    {
      id: '3',
      timestamp: '2024-11-25 10:15:00',
      user: 'admin@zeabis.com',
      action: 'delete',
      resource: 'Employee',
      details: 'Deleted employee record "Former Employee"',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '4',
      timestamp: '2024-11-25 09:50:45',
      user: 'sarah.johnson@zeabis.com',
      action: 'update',
      resource: 'Invoice',
      details: 'Updated invoice INV-2024-003 status to "Paid"',
      status: 'success',
      ipAddress: '192.168.1.110',
    },
    {
      id: '5',
      timestamp: '2024-11-25 09:30:12',
      user: 'admin@zeabis.com',
      action: 'create',
      resource: 'API Key',
      details: 'Added new API key for projects table',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '6',
      timestamp: '2024-11-25 09:15:30',
      user: 'unknown@example.com',
      action: 'login',
      resource: 'Authentication',
      details: 'Failed login attempt',
      status: 'failed',
      ipAddress: '203.0.113.42',
    },
    {
      id: '7',
      timestamp: '2024-11-25 09:00:00',
      user: 'admin@zeabis.com',
      action: 'update',
      resource: 'RBAC',
      details: 'Updated permissions for Project Manager role',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '8',
      timestamp: '2024-11-25 08:45:20',
      user: 'michael.chen@zeabis.com',
      action: 'create',
      resource: 'Customer',
      details: 'Added new customer "TechCorp Inc"',
      status: 'success',
      ipAddress: '192.168.1.115',
    },
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4" />;
      case 'update':
        return <Edit className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'login':
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'update':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'delete':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'login':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'API Key':
        return <Key className="w-5 h-5 text-blue-400" />;
      case 'RBAC':
        return <Shield className="w-5 h-5 text-green-400" />;
      case 'Authentication':
        return <User className="w-5 h-5 text-orange-400" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredLogs = filter === 'all' ? auditLogs : auditLogs.filter(log =>
    filter === 'failed' ? log.status === 'failed' : log.action === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">View all system activities and changes</p>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Activities</option>
            <option value="create">Create Only</option>
            <option value="update">Update Only</option>
            <option value="delete">Delete Only</option>
            <option value="failed">Failed Actions</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>

        <div className="space-y-6">
          {filteredLogs.map((log, index) => (
            <div key={log.id} className="relative pl-16">
              <div
                className={`absolute left-6 w-4 h-4 rounded-full border-2 ${
                  log.status === 'success'
                    ? 'bg-green-500 border-green-400'
                    : 'bg-red-500 border-red-400'
                }`}
                style={{ top: '8px' }}
              ></div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg border ${getActionColor(log.action)}`}>
                      {getActionIcon(log.action)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-white">{log.user}</span>
                        <span className="text-xs text-slate-500">
                          {log.action}d
                        </span>
                        <span className="text-xs font-medium text-blue-400">{log.resource}</span>
                      </div>

                      <p className="text-sm text-slate-300">{log.details}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>•</span>
                        <span className={log.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {getResourceIcon(log.resource)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No audit logs found for the selected filter</p>
        </div>
      )}
    </div>
  );
};
