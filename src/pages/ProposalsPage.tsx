import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { FileText, TrendingUp, DollarSign } from 'lucide-react';

export const ProposalsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});

  const columns: Column[] = [
    { key: 'proposal_name', label: 'Proposal Name', sortable: true },
    { key: 'project', label: 'Project' },
    { key: 'proposal_status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
    { key: 'currency_type', label: 'Currency' },
  ];

  const proposalData = [
    {
      id: 1,
      proposal_name: 'E-Commerce Platform Proposal',
      project: 'E-Commerce Platform',
      proposal_status: 'Active',
      amount: 250000,
      effort: 1500,
      start_date: '2024-01-01',
      end_date: '2024-06-30',
      currency_type: 'USD',
    },
    {
      id: 2,
      proposal_name: 'Mobile App Phase 1',
      project: 'Mobile App Development',
      proposal_status: 'Active',
      amount: 180000,
      effort: 1200,
      start_date: '2024-02-01',
      end_date: '2024-07-31',
      currency_type: 'USD',
    },
    {
      id: 3,
      proposal_name: 'Cloud Migration Services',
      project: 'Cloud Migration',
      proposal_status: 'Draft',
      amount: 320000,
      effort: 2000,
      start_date: '2024-03-01',
      end_date: '2024-09-30',
      currency_type: 'USD',
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Proposals</h1>
          <p className="text-slate-400">Manage client proposals and quotes</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Proposals" value={24} icon={FileText} color="blue" />
        <StatCard title="Active Proposals" value={18} icon={TrendingUp} color="green" />
        <StatCard title="Total Value" value="$2.8M" icon={DollarSign} color="cyan" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={proposalData}
          onEdit={(row) => console.log('Edit proposal', row)}
          onDelete={(row) => console.log('Delete proposal', row)}
        />
      </div>
    </div>
  );
};
