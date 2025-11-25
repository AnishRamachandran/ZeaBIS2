import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { AddProjectForm, ProjectFormData } from '../components/AddProjectForm';
import { FolderKanban, Plus, Activity, DollarSign, Users } from 'lucide-react';

export const Projects: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [showAddProject, setShowAddProject] = useState(false);

  const columns: Column[] = [
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'projectOwner', label: 'Project Owner' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'On Hold' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        value === 'Completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'billingType', label: 'Billing Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'teamSize', label: 'Team Size', sortable: true },
  ];

  const projectData = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      customer: 'TechCorp Inc',
      projectOwner: 'John Smith',
      status: 'Active',
      billingType: 'T&M',
      startDate: '2024-01-15',
      teamSize: 8
    },
    {
      id: 2,
      name: 'Mobile App Development',
      customer: 'StartupXYZ',
      projectOwner: 'Sarah Johnson',
      status: 'Active',
      billingType: 'Fixed',
      startDate: '2024-02-01',
      teamSize: 6
    },
    {
      id: 3,
      name: 'Cloud Migration',
      customer: 'Enterprise Solutions',
      projectOwner: 'Michael Chen',
      status: 'On Hold',
      billingType: 'T&M',
      startDate: '2023-11-10',
      teamSize: 10
    },
    {
      id: 4,
      name: 'Data Analytics Dashboard',
      customer: 'FinTech Global',
      projectOwner: 'Emily Davis',
      status: 'Active',
      billingType: 'Fixed',
      startDate: '2024-03-05',
      teamSize: 5
    },
    {
      id: 5,
      name: 'API Integration',
      customer: 'TechCorp Inc',
      projectOwner: 'David Wilson',
      status: 'Completed',
      billingType: 'T&M',
      startDate: '2023-09-20',
      teamSize: 4
    },
  ];

  const statusData = [
    { status: 'Active', count: 18, color: 'from-green-500 to-green-600' },
    { status: 'On Hold', count: 5, color: 'from-orange-500 to-orange-600' },
    { status: 'Completed', count: 15, color: 'from-blue-500 to-blue-600' },
    { status: 'Cancelled', count: 4, color: 'from-slate-500 to-slate-600' },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-400">Manage and track all your projects</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
          <button
            onClick={() => setShowAddProject(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>
      </div>

      <AddProjectForm
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
        onSave={(project: ProjectFormData) => console.log('New project:', project)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={42}
          icon={FolderKanban}
          color="blue"
        />
        <StatCard
          title="Active Projects"
          value={18}
          icon={Activity}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value="$1.2M"
          icon={DollarSign}
          color="teal"
        />
        <StatCard
          title="Team Members"
          value={156}
          icon={Users}
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Project Status</h3>
          <div className="space-y-4">
            {statusData.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">{item.status}</span>
                  <span className="text-sm font-semibold text-white">{item.count} projects</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(item.count / 42) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Team Allocation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-300">Fully Allocated</span>
              <span className="text-lg font-bold text-green-400">72%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-300">Partially Allocated</span>
              <span className="text-lg font-bold text-orange-400">18%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-sm text-slate-300">Available</span>
              <span className="text-lg font-bold text-blue-400">10%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">All Projects</h2>
            <p className="text-sm text-slate-400 mt-1">Complete list of projects</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={projectData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
