import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { Building2, Plus, FolderKanban, DollarSign, TrendingUp } from 'lucide-react';

export const Customers: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});

  const columns: Column[] = [
    { key: 'name', label: 'Customer Name', sortable: true },
    { key: 'organization', label: 'Organization' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'projects', label: 'Projects', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'active', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  const customerData = [
    { id: 1, name: 'TechCorp Inc', organization: 'TechCorp', email: 'contact@techcorp.com', department: 'IT', projects: 5, revenue: 450000, active: true },
    { id: 2, name: 'StartupXYZ', organization: 'StartupXYZ Ltd', email: 'info@startupxyz.com', department: 'Engineering', projects: 3, revenue: 285000, active: true },
    { id: 3, name: 'Enterprise Solutions', organization: 'Enterprise Corp', email: 'projects@enterprise.com', department: 'Digital', projects: 7, revenue: 620000, active: true },
    { id: 4, name: 'FinTech Global', organization: 'FinTech Inc', email: 'dev@fintech.com', department: 'Technology', projects: 4, revenue: 380000, active: true },
    { id: 5, name: 'RetailMart', organization: 'RetailMart LLC', email: 'it@retailmart.com', department: 'IT', projects: 2, revenue: 150000, active: false },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-slate-400">Manage customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Customers" value={28} icon={Building2} color="blue" />
        <StatCard title="Active Projects" value={21} icon={FolderKanban} color="green" />
        <StatCard title="Total Revenue" value="$1.9M" icon={DollarSign} color="teal" />
        <StatCard title="Growth Rate" value="18%" icon={TrendingUp} color="cyan" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={customerData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
