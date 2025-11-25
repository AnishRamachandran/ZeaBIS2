import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ApiKeyMapping {
  id: string;
  tableName: string;
  apiKey: string;
  description: string;
  createdAt: string;
  syncInterval: number;
  lastSync: string;
  syncStatus: 'success' | 'failed' | 'pending' | 'syncing';
}

const AVAILABLE_TABLES = [
  { name: 'projects', description: 'Project management data' },
  { name: 'employees', description: 'Employee information' },
  { name: 'customers', description: 'Customer records' },
  { name: 'timesheets', description: 'Timesheet entries' },
  { name: 'invoices', description: 'Invoice data' },
  { name: 'proposals', description: 'Proposal information' },
  { name: 'billing', description: 'Billing and PO data' },
  { name: 'purchase_orders', description: 'Purchase order data' },
];

export const ApiKeyManagementEnhanced: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeyMapping[]>([
    {
      id: '1',
      tableName: 'projects',
      apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
      description: 'Project management data',
      createdAt: '2024-01-15',
      syncInterval: 15,
      lastSync: '2024-11-25 10:30:00',
      syncStatus: 'success',
    },
    {
      id: '2',
      tableName: 'timesheets',
      apiKey: 'sk_test_BQokikJOvBiI2HlWgH4olfQ2',
      description: 'Timesheet entries',
      createdAt: '2024-01-20',
      syncInterval: 30,
      lastSync: '2024-11-25 10:25:00',
      syncStatus: 'success',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    tableName: '',
    apiKey: '',
    description: '',
    syncInterval: 15,
  });

  const handleSync = (id: string) => {
    setSyncingIds(prev => new Set(prev).add(id));
    setApiKeys(prev => prev.map(key =>
      key.id === id ? { ...key, syncStatus: 'syncing' as const } : key
    ));

    setTimeout(() => {
      setApiKeys(prev => prev.map(key =>
        key.id === id
          ? {
              ...key,
              syncStatus: 'success' as const,
              lastSync: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
            }
          : key
      ));
      setSyncingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  };

  const handleAdd = () => {
    if (formData.tableName && formData.apiKey) {
      const newKey: ApiKeyMapping = {
        id: Date.now().toString(),
        tableName: formData.tableName,
        apiKey: formData.apiKey,
        description: formData.description,
        syncInterval: formData.syncInterval,
        createdAt: new Date().toISOString().split('T')[0],
        lastSync: 'Never',
        syncStatus: 'pending',
      };
      setApiKeys([...apiKeys, newKey]);
      setFormData({ tableName: '', apiKey: '', description: '', syncInterval: 15 });
      setShowAddForm(false);
    }
  };

  const handleEdit = (key: ApiKeyMapping) => {
    setEditingId(key.id);
    setFormData({
      tableName: key.tableName,
      apiKey: key.apiKey,
      description: key.description,
      syncInterval: key.syncInterval,
    });
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setApiKeys(apiKeys.map(key =>
        key.id === editingId
          ? { ...key, ...formData }
          : key
      ));
      setEditingId(null);
      setFormData({ tableName: '', apiKey: '', description: '', syncInterval: 15 });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this API key mapping?')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return '****';
    return key.substring(0, 7) + '...' + key.substring(key.length - 4);
  };

  const availableTables = AVAILABLE_TABLES.filter(
    table => !apiKeys.some(key => key.tableName === table.name) || editingId
  );

  const getSyncStatusIcon = (status: ApiKeyMapping['syncStatus']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">Map API keys to database tables with individual sync settings</p>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add API Key
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg space-y-4">
          <h4 className="text-sm font-semibold text-white">Add New API Key Mapping</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Table Name *
              </label>
              <select
                value={formData.tableName}
                onChange={(e) => {
                  const table = AVAILABLE_TABLES.find(t => t.name === e.target.value);
                  setFormData({
                    ...formData,
                    tableName: e.target.value,
                    description: table?.description || '',
                  });
                }}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a table...</option>
                {availableTables.map(table => (
                  <option key={table.name} value={table.name}>
                    {table.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sync Interval (minutes) *
              </label>
              <select
                value={formData.syncInterval}
                onChange={(e) => setFormData({ ...formData, syncInterval: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
                <option value="360">Every 6 hours</option>
                <option value="1440">Daily</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              API Key *
            </label>
            <input
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter API key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Brief description"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!formData.tableName || !formData.apiKey}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({ tableName: '', apiKey: '', description: '', syncInterval: 15 });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {apiKeys.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No API keys configured. Add one to get started.
          </div>
        ) : (
          apiKeys.map(key => (
            <div
              key={key.id}
              className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg"
            >
              {editingId === key.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Table Name *
                      </label>
                      <select
                        value={formData.tableName}
                        onChange={(e) => {
                          const table = AVAILABLE_TABLES.find(t => t.name === e.target.value);
                          setFormData({
                            ...formData,
                            tableName: e.target.value,
                            description: table?.description || formData.description,
                          });
                        }}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                      >
                        {availableTables.map(table => (
                          <option key={table.name} value={table.name}>
                            {table.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Sync Interval (minutes) *
                      </label>
                      <select
                        value={formData.syncInterval}
                        onChange={(e) => setFormData({ ...formData, syncInterval: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="5">Every 5 minutes</option>
                        <option value="15">Every 15 minutes</option>
                        <option value="30">Every 30 minutes</option>
                        <option value="60">Every hour</option>
                        <option value="360">Every 6 hours</option>
                        <option value="1440">Daily</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      API Key *
                    </label>
                    <input
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors text-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ tableName: '', apiKey: '', description: '', syncInterval: 15 });
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded transition-colors text-sm"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-medium">
                        {key.tableName}
                      </span>
                      <span className="text-xs text-slate-500">Added {key.createdAt}</span>
                      <span className="text-xs text-slate-500">• Sync: every {key.syncInterval} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-slate-300 font-mono">
                        {visibleKeys.has(key.id) ? key.apiKey : maskApiKey(key.apiKey)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                        title={visibleKeys.has(key.id) ? 'Hide' : 'Show'}
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-slate-400">{key.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      {getSyncStatusIcon(key.syncStatus)}
                      <span className="text-slate-400">Last sync: {key.lastSync}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSync(key.id)}
                      disabled={syncingIds.has(key.id)}
                      className="p-2 hover:bg-cyan-500/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Manual Sync"
                    >
                      <RefreshCw className={`w-4 h-4 text-cyan-400 ${syncingIds.has(key.id) ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleEdit(key)}
                      className="p-2 hover:bg-blue-500/20 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(key.id)}
                      className="p-2 hover:bg-red-500/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
