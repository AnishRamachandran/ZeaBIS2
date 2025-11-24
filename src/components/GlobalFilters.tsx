import React from 'react';
import { Filter } from 'lucide-react';

export interface FilterValues {
  year?: string;
  month?: string;
  project?: string;
  proposal?: string;
  po?: string;
  proposalStatus?: string;
  poStatus?: string;
  invoice?: string;
  employee?: string;
  customer?: string;
}

interface GlobalFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  availableFilters?: string[];
}

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  filters,
  onFilterChange,
  availableFilters = ['year', 'month', 'project'],
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filterConfig: Record<string, { label: string; options?: string[] }> = {
    year: { label: 'Year', options: years.map(String) },
    month: { label: 'Month', options: months },
    project: { label: 'Project' },
    proposal: { label: 'Proposal' },
    po: { label: 'PO' },
    proposalStatus: { label: 'Proposal Status', options: ['Draft', 'Active', 'Closed', 'Cancelled'] },
    poStatus: { label: 'PO Status', options: ['Draft', 'Active', 'Closed', 'Cancelled'] },
    invoice: { label: 'Invoice' },
    employee: { label: 'Employee' },
    customer: { label: 'Customer' },
  };

  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {availableFilters.map((filterKey) => {
          const config = filterConfig[filterKey];
          if (!config) return null;

          return (
            <div key={filterKey}>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {config.label}
              </label>
              {config.options ? (
                <select
                  value={filters[filterKey as keyof FilterValues] || ''}
                  onChange={(e) => handleChange(filterKey, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                >
                  <option value="">All</option>
                  {config.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={filters[filterKey as keyof FilterValues] || ''}
                  onChange={(e) => handleChange(filterKey, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm placeholder-slate-500"
                  placeholder={`Search ${config.label.toLowerCase()}...`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
