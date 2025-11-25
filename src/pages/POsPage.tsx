import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { Receipt, TrendingUp, DollarSign } from 'lucide-react';

export const POsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});

  const columns: Column[] = [
    { key: 'po_name', label: 'PO Name', sortable: true },
    { key: 'proposal', label: 'Proposal' },
    { key: 'po_status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'po_amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'po_effort', label: 'Effort (hrs)', sortable: true },
    { key: 'effort_utilized', label: 'Utilized', sortable: true, render: (value) => `${value}%` },
    { key: 'effort_billed', label: 'Billed', sortable: true, render: (value) => `${value}%` },
    { key: 'po_date', label: 'PO Date' },
  ];

  const poData = [
    {
      id: 1,
      po_name: 'PO-2024-001',
      proposal: 'E-Commerce Platform Proposal',
      po_status: 'Active',
      po_amount: 250000,
      po_effort: 1500,
      effort_utilized: 68,
      effort_billed: 55,
      po_date: '2024-01-01',
    },
    {
      id: 2,
      po_name: 'PO-2024-002',
      proposal: 'Mobile App Phase 1',
      po_status: 'Active',
      po_amount: 180000,
      po_effort: 1200,
      effort_utilized: 45,
      effort_billed: 40,
      po_date: '2024-02-01',
    },
    {
      id: 3,
      po_name: 'PO-2024-003',
      proposal: 'Cloud Migration Services',
      po_status: 'Draft',
      po_amount: 320000,
      po_effort: 2000,
      effort_utilized: 0,
      effort_billed: 0,
      po_date: '2024-03-01',
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Purchase Orders</h1>
          <p className="text-slate-400">Track purchase orders and utilization</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total POs" value={18} icon={Receipt} color="blue" />
        <StatCard title="Active POs" value={14} icon={TrendingUp} color="green" />
        <StatCard title="Total Value" value="$2.4M" icon={DollarSign} color="cyan" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={poData}
          onEdit={(row) => console.log('Edit PO', row)}
          onDelete={(row) => console.log('Delete PO', row)}
        />
      </div>
    </div>
  );
};
