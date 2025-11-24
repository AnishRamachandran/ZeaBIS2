import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { Users, UserCheck, UserX, DollarSign, Plus } from 'lucide-react';

export const Employees: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});

  const columns: Column[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'designation', label: 'Designation' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'billRate', label: 'Bill Rate', sortable: true, render: (value) => `$${value}/hr` },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'employmentType', label: 'Employment Type' },
  ];

  const employeeData = [
    { id: 1, name: 'John Smith', designation: 'Senior Developer', email: 'john.smith@example.com', location: 'New York', billRate: 150, status: 'Active', employmentType: 'Full-time' },
    { id: 2, name: 'Sarah Johnson', designation: 'Project Manager', email: 'sarah.j@example.com', location: 'San Francisco', billRate: 175, status: 'Active', employmentType: 'Full-time' },
    { id: 3, name: 'Michael Chen', designation: 'Tech Lead', email: 'michael.c@example.com', location: 'Seattle', billRate: 165, status: 'Active', employmentType: 'Full-time' },
    { id: 4, name: 'Emily Davis', designation: 'UI/UX Designer', email: 'emily.d@example.com', location: 'Austin', billRate: 125, status: 'Active', employmentType: 'Contract' },
    { id: 5, name: 'David Wilson', designation: 'DevOps Engineer', email: 'david.w@example.com', location: 'Boston', billRate: 140, status: 'Inactive', employmentType: 'Full-time' },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Employees</h1>
            <p className="text-slate-400">Manage your workforce</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>
      </div>

      <GlobalFilters
        filters={filters}
        onFilterChange={setFilters}
        availableFilters={['employee']}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Employees" value={156} icon={Users} color="blue" />
        <StatCard title="Active" value={142} icon={UserCheck} color="green" />
        <StatCard title="Inactive" value={14} icon={UserX} color="orange" />
        <StatCard title="Avg Bill Rate" value="$145/hr" icon={DollarSign} color="teal" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={employeeData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
