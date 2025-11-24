import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { Receipt, DollarSign, TrendingUp, Clock } from 'lucide-react';

export const BillingTracker: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const columns: Column[] = [
    { key: 'project', label: 'Project', sortable: true },
    { key: 'proposal', label: 'Proposal' },
    { key: 'month', label: 'Month' },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'billed', label: 'Billed', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        'bg-orange-500/20 text-orange-400 border border-orange-500/30'
      }`}>
        {value ? 'Yes' : 'Pending'}
      </span>
    )},
  ];

  const billingData = [
    { id: 1, project: 'E-Commerce Platform', proposal: 'Q1 2024 Development', month: 'November', effort: 320, amount: 48000, billed: true },
    { id: 2, project: 'Mobile App Development', proposal: 'Mobile App Phase 1', month: 'November', effort: 280, amount: 42000, billed: true },
    { id: 3, project: 'Cloud Migration', proposal: 'Cloud Services 2024', month: 'November', effort: 240, amount: 36000, billed: false },
    { id: 4, project: 'Data Analytics Dashboard', proposal: 'Analytics Solution', month: 'November', effort: 160, amount: 24000, billed: false },
  ];

  const renderExpandedRow = (row: any) => {
    const employees = [
      { name: 'John Smith', effort: 160, rate: 150, amount: 24000 },
      { name: 'Sarah Johnson', effort: 160, rate: 150, amount: 24000 },
    ];

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white mb-3">Employee Breakdown</h4>
        {employees.map((emp, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{emp.name}</span>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">{emp.effort} hrs</span>
              <span className="text-slate-400">${emp.rate}/hr</span>
              <span className="text-green-400 font-semibold">${emp.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Billing Tracker</h1>
          <p className="text-slate-400">Track billing and effort by project</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Billed" value="$425K" icon={DollarSign} color="blue" />
        <StatCard title="Pending" value="$60K" icon={Clock} color="orange" />
        <StatCard title="Total Effort" value="1,000 hrs" icon={Receipt} color="green" />
        <StatCard title="Avg Rate" value="$150/hr" icon={TrendingUp} color="teal" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={billingData}
          expandable={true}
          renderExpandedRow={renderExpandedRow}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
