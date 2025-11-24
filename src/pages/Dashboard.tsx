import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import {
  FolderKanban,
  Users,
  Building2,
  DollarSign,
  Clock,
  TrendingUp,
  Receipt,
  FileCheck,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    month: new Date().toLocaleString('default', { month: 'long' }),
  });

  const recentProjects: Column[] = [
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'On Hold' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'billingType', label: 'Billing Type' },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
  ];

  const projectData = [
    { id: 1, name: 'E-Commerce Platform', customer: 'TechCorp Inc', status: 'Active', billingType: 'T&M', effort: 450, revenue: 67500 },
    { id: 2, name: 'Mobile App Development', customer: 'StartupXYZ', status: 'Active', billingType: 'Fixed', effort: 320, revenue: 48000 },
    { id: 3, name: 'Cloud Migration', customer: 'Enterprise Solutions', status: 'On Hold', billingType: 'T&M', effort: 280, revenue: 42000 },
    { id: 4, name: 'Data Analytics Dashboard', customer: 'FinTech Global', status: 'Active', billingType: 'Fixed', effort: 190, revenue: 28500 },
    { id: 5, name: 'API Integration', customer: 'TechCorp Inc', status: 'Completed', billingType: 'T&M', effort: 150, revenue: 22500 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of billing and invoice tracking metrics</p>
      </div>

      <GlobalFilters
        filters={filters}
        onFilterChange={setFilters}
        availableFilters={['year', 'month', 'project', 'customer']}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={42}
          icon={FolderKanban}
          color="blue"
          trend={{ value: '12%', positive: true }}
        />
        <StatCard
          title="Active Employees"
          value={156}
          icon={Users}
          color="green"
          trend={{ value: '8%', positive: true }}
        />
        <StatCard
          title="Total Customers"
          value={28}
          icon={Building2}
          color="cyan"
          trend={{ value: '4%', positive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$245K"
          icon={DollarSign}
          color="teal"
          trend={{ value: '15%', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Effort Overview</h3>
                <p className="text-sm text-slate-400">This month</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Billable Hours</span>
                <span className="text-sm font-semibold text-green-400">2,845 hrs</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Non-Billable Hours</span>
                <span className="text-sm font-semibold text-orange-400">952 hrs</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Total Hours</span>
                <span className="text-lg font-bold text-white">3,797 hrs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Financial Summary</h3>
                <p className="text-sm text-slate-400">Current month</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Billed Amount</span>
              </div>
              <span className="text-lg font-bold text-blue-400">$425,600</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Invoiced</span>
              </div>
              <span className="text-lg font-bold text-green-400">$398,200</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-300">Pending</span>
              </div>
              <span className="text-lg font-bold text-orange-400">$27,400</span>
            </div>
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Collection Rate</span>
                <span className="text-lg font-bold text-cyan-400">93.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Recent Projects</h2>
            <p className="text-sm text-slate-400 mt-1">Latest project activity and metrics</p>
          </div>
        </div>
        <DataTable
          columns={recentProjects}
          data={projectData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
