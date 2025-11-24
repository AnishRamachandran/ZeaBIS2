import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { FileText, FileCheck, Receipt, Plus } from 'lucide-react';

type TabType = 'proposals' | 'pos' | 'invoices';

export const Proposals: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [activeTab, setActiveTab] = useState<TabType>('proposals');

  const proposalColumns: Column[] = [
    { key: 'name', label: 'Proposal Name', sortable: true },
    { key: 'project', label: 'Project' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        value === 'Closed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
  ];

  const poColumns: Column[] = [
    { key: 'name', label: 'PO Name', sortable: true },
    { key: 'proposal', label: 'Proposal' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'utilized', label: 'Utilized', sortable: true, render: (value) => `${value}%` },
    { key: 'billed', label: 'Billed', sortable: true, render: (value) => `${value}%` },
  ];

  const invoiceColumns: Column[] = [
    { key: 'number', label: 'Invoice #', sortable: true },
    { key: 'name', label: 'Invoice Name' },
    { key: 'po', label: 'PO' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'invoiceDate', label: 'Invoice Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
  ];

  const proposalData = [
    { id: 1, name: 'E-Commerce Platform Proposal', project: 'E-Commerce Platform', status: 'Active', amount: 250000, effort: 1500, startDate: '2024-01-01', endDate: '2024-06-30' },
    { id: 2, name: 'Mobile App Phase 1', project: 'Mobile App Development', status: 'Active', amount: 180000, effort: 1200, startDate: '2024-02-01', endDate: '2024-07-31' },
    { id: 3, name: 'Cloud Migration Services', project: 'Cloud Migration', status: 'Draft', amount: 320000, effort: 2000, startDate: '2024-03-01', endDate: '2024-09-30' },
  ];

  const poData = [
    { id: 1, name: 'PO-2024-001', proposal: 'E-Commerce Platform Proposal', status: 'Active', amount: 250000, effort: 1500, utilized: 68, billed: 55 },
    { id: 2, name: 'PO-2024-002', proposal: 'Mobile App Phase 1', status: 'Active', amount: 180000, effort: 1200, utilized: 45, billed: 40 },
    { id: 3, name: 'PO-2024-003', proposal: 'Cloud Migration Services', status: 'Draft', amount: 320000, effort: 2000, utilized: 0, billed: 0 },
  ];

  const invoiceData = [
    { id: 1, number: 'INV-2024-001', name: 'January Billing', po: 'PO-2024-001', status: 'Paid', invoiceDate: '2024-01-31', dueDate: '2024-02-15', amount: 45000 },
    { id: 2, number: 'INV-2024-002', name: 'February Billing', po: 'PO-2024-001', status: 'Paid', invoiceDate: '2024-02-29', dueDate: '2024-03-15', amount: 48000 },
    { id: 3, number: 'INV-2024-003', name: 'March Billing', po: 'PO-2024-002', status: 'Pending', invoiceDate: '2024-03-31', dueDate: '2024-04-15', amount: 35000 },
  ];

  const tabs = [
    { id: 'proposals' as TabType, label: 'Proposals', icon: FileText },
    { id: 'pos' as TabType, label: 'Purchase Orders', icon: Receipt },
    { id: 'invoices' as TabType, label: 'Invoices', icon: FileCheck },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Proposals & Billing</h1>
          <p className="text-slate-400">Manage proposals, POs, and invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add {activeTab === 'proposals' ? 'Proposal' : activeTab === 'pos' ? 'PO' : 'Invoice'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Active Proposals" value={24} icon={FileText} color="blue" />
        <StatCard title="Active POs" value={18} icon={Receipt} color="green" />
        <StatCard title="Pending Invoices" value={12} icon={FileCheck} color="orange" />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden mb-6">
        <div className="flex border-b border-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        {activeTab === 'proposals' && (
          <DataTable
            columns={proposalColumns}
            data={proposalData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
        {activeTab === 'pos' && (
          <DataTable
            columns={poColumns}
            data={poData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
        {activeTab === 'invoices' && (
          <DataTable
            columns={invoiceColumns}
            data={invoiceData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
      </div>
    </div>
  );
};
