import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import {
  FolderKanban,
  Users,
  Building2,
  Clock,
  FileCheck,
  Zap,
  Flame,
  TrendingUp,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const totalBilledHours = 2845;
  const totalInvoicedHours = 2280;
  const totalAvailableHours = 4800;
  const totalBurnedHours = 3797;
  const burnedPercentage = ((totalBurnedHours / totalAvailableHours) * 100).toFixed(1);

  const totalSOWAmount = 850000;
  const totalInvoicedAmount = 398200;

  const monthlyTrendData = [
    { month: 'Jan', billed: 2650, invoiced: 2400 },
    { month: 'Feb', billed: 2720, invoiced: 2450 },
    { month: 'Mar', billed: 2580, invoiced: 2200 },
    { month: 'Apr', billed: 2890, invoiced: 2650 },
    { month: 'May', billed: 2950, invoiced: 2700 },
    { month: 'Jun', billed: 2780, invoiced: 2500 },
    { month: 'Jul', billed: 2920, invoiced: 2680 },
    { month: 'Aug', billed: 2850, invoiced: 2550 },
    { month: 'Sep', billed: 2980, invoiced: 2750 },
    { month: 'Oct', billed: 2870, invoiced: 2620 },
    { month: 'Nov', billed: 2845, invoiced: 2280 },
  ];

  const maxValue = Math.max(...monthlyTrendData.map(d => Math.max(d.billed, d.invoiced)));

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
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Overview of billing and invoice tracking metrics</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

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
          title="Total Billed Hours"
          value={totalBilledHours.toLocaleString()}
          icon={Clock}
          color="blue"
          trend={{ value: '6%', positive: true }}
        />
        <StatCard
          title="Total Invoiced Hours"
          value={totalInvoicedHours.toLocaleString()}
          icon={FileCheck}
          color="green"
          trend={{ value: '5%', positive: true }}
        />
        <StatCard
          title="Total Available Hours"
          value={totalAvailableHours.toLocaleString()}
          icon={Zap}
          color="teal"
        />
        <StatCard
          title="Total Burned Hours"
          value={totalBurnedHours.toLocaleString()}
          icon={Flame}
          color="orange"
          trend={{ value: '7%', positive: false }}
        />
        <StatCard
          title="Total Burned %"
          value={`${burnedPercentage}%`}
          icon={TrendingUp}
          color="pink"
          trend={{ value: '2%', positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Monthly Hours Trend</h3>
              <p className="text-sm text-slate-400">Billed vs Invoiced Hours</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-400">Billed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-400">Invoiced</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyTrendData.map((data, index) => {
              const billedHeight = (data.billed / maxValue) * 100;
              const invoicedHeight = (data.invoiced / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1 h-48">
                    <div
                      className="w-1/2 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:opacity-80 transition-opacity relative group"
                      style={{ height: `${billedHeight}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.billed}
                      </div>
                    </div>
                    <div
                      className="w-1/2 bg-gradient-to-t from-green-500 to-green-400 rounded-t hover:opacity-80 transition-opacity relative group"
                      style={{ height: `${invoicedHeight}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.invoiced}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Hours Burn Rate</h3>
              <p className="text-sm text-slate-400">Available vs Burned Hours</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${(totalBurnedHours / totalAvailableHours) * 502} 502`}
                  className="text-orange-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{burnedPercentage}%</span>
                <span className="text-sm text-slate-400">Burned</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-400 mb-1">Available</div>
              <div className="text-xl font-bold text-teal-400">{totalAvailableHours.toLocaleString()}</div>
              <div className="text-xs text-slate-500">hours</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-400 mb-1">Burned</div>
              <div className="text-xl font-bold text-orange-400">{totalBurnedHours.toLocaleString()}</div>
              <div className="text-xs text-slate-500">hours</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">SOW vs Invoiced Amount</h3>
              <p className="text-sm text-slate-400">Financial Overview</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="30"
                  fill="none"
                  strokeDasharray={`${(totalInvoicedAmount / totalSOWAmount) * 502} 502`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="30"
                  fill="none"
                  strokeDasharray={`${((totalSOWAmount - totalInvoicedAmount) / totalSOWAmount) * 502} 502`}
                  strokeDashoffset={`${-(totalInvoicedAmount / totalSOWAmount) * 502}`}
                  className="text-blue-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">${(totalInvoicedAmount / 1000).toFixed(0)}K</span>
                <span className="text-sm text-slate-400">Invoiced</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-400">Total SOW</div>
                <div className="text-lg font-bold text-white">${(totalSOWAmount / 1000).toFixed(0)}K</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-4">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-400">Invoiced</div>
                <div className="text-lg font-bold text-white">${(totalInvoicedAmount / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Key Metrics</h3>
              <p className="text-sm text-slate-400">Performance indicators</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Invoice Coverage</span>
                <span className="text-lg font-bold text-green-400">
                  {((totalInvoicedAmount / totalSOWAmount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                  style={{ width: `${(totalInvoicedAmount / totalSOWAmount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Hours Invoiced Rate</span>
                <span className="text-lg font-bold text-blue-400">
                  {((totalInvoicedHours / totalBilledHours) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                  style={{ width: `${(totalInvoicedHours / totalBilledHours) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Utilization Rate</span>
                <span className="text-lg font-bold text-teal-400">
                  {((totalBilledHours / totalAvailableHours) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full"
                  style={{ width: `${(totalBilledHours / totalAvailableHours) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Remaining SOW</span>
                <span className="text-lg font-bold text-orange-400">
                  ${((totalSOWAmount - totalInvoicedAmount) / 1000).toFixed(0)}K
                </span>
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
