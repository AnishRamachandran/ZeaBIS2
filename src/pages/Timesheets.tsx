import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { AddTimesheetForm, TimesheetFormData } from '../components/AddTimesheetForm';
import { Clock, Plus, TrendingUp, Calendar } from 'lucide-react';

export const Timesheets: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [showAddTimesheet, setShowAddTimesheet] = useState(false);

  const columns: Column[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'employee', label: 'Employee' },
    { key: 'project', label: 'Project' },
    { key: 'billableHours', label: 'Billable Hours', sortable: true },
    { key: 'nonBillableHours', label: 'Non-Billable Hours', sortable: true },
    { key: 'totalHours', label: 'Total Hours', sortable: true },
  ];

  const timesheetData = [
    { id: 1, date: '2024-11-20', employee: 'John Smith', project: 'E-Commerce Platform', billableHours: 8, nonBillableHours: 0, totalHours: 8 },
    { id: 2, date: '2024-11-20', employee: 'Sarah Johnson', project: 'Mobile App Development', billableHours: 7, nonBillableHours: 1, totalHours: 8 },
    { id: 3, date: '2024-11-19', employee: 'Michael Chen', project: 'Cloud Migration', billableHours: 6, nonBillableHours: 2, totalHours: 8 },
    { id: 4, date: '2024-11-19', employee: 'Emily Davis', project: 'Data Analytics Dashboard', billableHours: 8, nonBillableHours: 0, totalHours: 8 },
    { id: 5, date: '2024-11-18', employee: 'David Wilson', project: 'API Integration', billableHours: 7.5, nonBillableHours: 0.5, totalHours: 8 },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">TimeSheets</h1>
          <p className="text-slate-400">Track time and effort</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
          <button
            onClick={() => setShowAddTimesheet(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add Timesheet
          </button>
        </div>
      </div>

      <AddTimesheetForm
        isOpen={showAddTimesheet}
        onClose={() => setShowAddTimesheet(false)}
        onSave={(timesheet: TimesheetFormData) => console.log('New timesheet:', timesheet)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Hours" value="3,797" icon={Clock} color="blue" />
        <StatCard title="Billable Hours" value="2,845" icon={TrendingUp} color="green" />
        <StatCard title="Non-Billable" value="952" icon={Calendar} color="orange" />
        <StatCard title="Utilization" value="75%" icon={TrendingUp} color="teal" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={timesheetData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
