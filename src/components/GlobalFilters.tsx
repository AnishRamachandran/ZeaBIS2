import React, { useState, useRef, useEffect } from 'react';
import { Filter, X, Check } from 'lucide-react';

export interface FilterValues {
  year?: string;
  months?: string[];
  project?: string;
  customer?: string;
  projectStatus?: string;
  proposalStatus?: string;
}

interface GlobalFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const projectStatuses = ['Active', 'On Hold', 'Completed', 'Cancelled'];
  const proposalStatuses = ['Draft', 'Active', 'Closed', 'Cancelled'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMonthToggle = (month: string) => {
    const currentMonths = filters.months || [];
    const newMonths = currentMonths.includes(month)
      ? currentMonths.filter(m => m !== month)
      : [...currentMonths, month];
    onFilterChange({ ...filters, months: newMonths });
  };

  const handleChange = (key: keyof FilterValues, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      year: '',
      months: [],
      project: '',
      customer: '',
      projectStatus: '',
      proposalStatus: '',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.year) count++;
    if (filters.months && filters.months.length > 0) count++;
    if (filters.project) count++;
    if (filters.customer) count++;
    if (filters.projectStatus) count++;
    if (filters.proposalStatus) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-slate-600 transition-all text-white"
      >
        <Filter className="w-5 h-5 text-blue-400" />
        <span className="font-medium">Filters</span>
        {activeCount > 0 && (
          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-400" />
              Filter Options
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Year
              </label>
              <select
                value={filters.year || ''}
                onChange={(e) => handleChange('year', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Months (Multi-select)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {months.map((month) => {
                  const isSelected = filters.months?.includes(month) || false;
                  return (
                    <button
                      key={month}
                      onClick={() => handleMonthToggle(month)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-900/50 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <span>{month}</span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project
              </label>
              <input
                type="text"
                value={filters.project || ''}
                onChange={(e) => handleChange('project', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm placeholder-slate-500"
                placeholder="Search project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Customer
              </label>
              <input
                type="text"
                value={filters.customer || ''}
                onChange={(e) => handleChange('customer', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm placeholder-slate-500"
                placeholder="Search customer..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Status
              </label>
              <select
                value={filters.projectStatus || ''}
                onChange={(e) => handleChange('projectStatus', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
              >
                <option value="">All Statuses</option>
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Proposal Status
              </label>
              <select
                value={filters.proposalStatus || ''}
                onChange={(e) => handleChange('proposalStatus', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
              >
                <option value="">All Statuses</option>
                {proposalStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700 flex items-center justify-between">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
