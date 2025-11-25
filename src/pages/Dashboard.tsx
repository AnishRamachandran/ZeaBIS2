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
  const totalApprovedHours = 2650;
  const totalAvailableHours = 4800;
  const totalBurnedHours = 3797;
  const burnedPercentage = ((totalBurnedHours / totalAvailableHours) * 100).toFixed(1);

  const totalSOWAmount = 850000;
  const totalInvoicedAmount = 398200;
  const totalApprovedAmount = 465000;
  const totalBilledAmount = 520000;

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

  const amountTrendData = [
    { month: 'Jan', invoiced: 35000, approved: 38000, billed: 42000 },
    { month: 'Feb', invoiced: 36000, approved: 39000, billed: 43000 },
    { month: 'Mar', invoiced: 33000, approved: 37000, billed: 41000 },
    { month: 'Apr', invoiced: 38000, approved: 42000, billed: 46000 },
    { month: 'May', invoiced: 40000, approved: 44000, billed: 47000 },
    { month: 'Jun', invoiced: 37000, approved: 41000, billed: 44000 },
    { month: 'Jul', invoiced: 39000, approved: 43000, billed: 46000 },
    { month: 'Aug', invoiced: 38000, approved: 42000, billed: 45000 },
    { month: 'Sep', invoiced: 41000, approved: 45000, billed: 48000 },
    { month: 'Oct', invoiced: 39000, approved: 43000, billed: 46000 },
    { month: 'Nov', invoiced: 34000, approved: 40000, billed: 43000 },
  ];

  const monthlyInvoicingData = [
    { month: 'Jan', byProject: 18000, byPO: 10000, byCustomer: 7000 },
    { month: 'Feb', byProject: 19000, byPO: 11000, byCustomer: 6000 },
    { month: 'Mar', byProject: 17000, byPO: 9500, byCustomer: 6500 },
    { month: 'Apr', byProject: 20000, byPO: 11500, byCustomer: 6500 },
    { month: 'May', byProject: 21000, byPO: 12000, byCustomer: 7000 },
    { month: 'Jun', byProject: 19500, byPO: 11000, byCustomer: 6500 },
    { month: 'Jul', byProject: 20500, byPO: 11500, byCustomer: 7000 },
    { month: 'Aug', byProject: 20000, byPO: 11000, byCustomer: 7000 },
    { month: 'Sep', byProject: 21500, byPO: 12500, byCustomer: 7000 },
    { month: 'Oct', byProject: 20500, byPO: 11500, byCustomer: 7000 },
    { month: 'Nov', byProject: 18000, byPO: 10000, byCustomer: 6000 },
  ];

  const maxHoursValue = Math.max(...monthlyTrendData.map(d => Math.max(d.billed, d.invoiced)));
  const maxAmountValue = Math.max(...amountTrendData.map(d => Math.max(d.invoiced, d.approved, d.billed)));
  const maxInvoicingValue = Math.max(...monthlyInvoicingData.map(d => Math.max(d.byProject, d.byPO, d.byCustomer)));

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Monthly Hours Trend</h3>
              <p className="text-xs text-slate-400">Billed vs Invoiced</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-400">Billed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-400">Invoiced</span>
              </div>
            </div>
          </div>
          <div className="h-40 flex items-end justify-between gap-1">
            {monthlyTrendData.map((data, index) => {
              const billedHeight = (data.billed / maxHoursValue) * 100;
              const invoicedHeight = (data.invoiced / maxHoursValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-32">
                    <div
                      className="w-1/2 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:opacity-80 transition-opacity relative group"
                      style={{ height: `${billedHeight}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {data.billed}
                      </div>
                    </div>
                    <div
                      className="w-1/2 bg-gradient-to-t from-green-500 to-green-400 rounded-t hover:opacity-80 transition-opacity relative group"
                      style={{ height: `${invoicedHeight}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
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

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Hours Burn Rate</h3>
              <p className="text-xs text-slate-400">Available vs Burned</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(totalBurnedHours / totalAvailableHours) * 339} 339`}
                  className="text-orange-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{burnedPercentage}%</span>
                <span className="text-xs text-slate-400">Burned</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-slate-900/50 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400 mb-1">Available</div>
              <div className="text-sm font-bold text-teal-400">{totalAvailableHours.toLocaleString()}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400 mb-1">Burned</div>
              <div className="text-sm font-bold text-orange-400">{totalBurnedHours.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">SOW vs Invoiced</h3>
              <p className="text-xs text-slate-400">Financial Overview</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${(totalInvoicedAmount / totalSOWAmount) * 339} 339`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${((totalSOWAmount - totalInvoicedAmount) / totalSOWAmount) * 339} 339`}
                  strokeDashoffset={`${-(totalInvoicedAmount / totalSOWAmount) * 339}`}
                  className="text-blue-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">${(totalInvoicedAmount / 1000).toFixed(0)}K</span>
                <span className="text-xs text-slate-400">Invoiced</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-xs text-slate-400">SOW</div>
                <div className="text-sm font-bold text-white">${(totalSOWAmount / 1000).toFixed(0)}K</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-xs text-slate-400">Invoiced</div>
                <div className="text-sm font-bold text-white">${(totalInvoicedAmount / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Monthly Invoicing by Category</h3>
            <p className="text-sm text-slate-400">Breakdown by Project, PO, and Customer</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-400">By Project</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-400">By PO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-xs text-slate-400">By Customer</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {monthlyInvoicingData.map((data, index) => {
            const projectHeight = (data.byProject / maxInvoicingValue) * 100;
            const poHeight = (data.byPO / maxInvoicingValue) * 100;
            const customerHeight = (data.byCustomer / maxInvoicingValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1 h-48">
                  <div
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${projectHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ${(data.byProject / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${poHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ${(data.byPO / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t hover:opacity-80 transition-opacity relative group"
                    style={{ height: `${customerHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      ${(data.byCustomer / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Amount Trends</h3>
            <p className="text-sm text-slate-400">Invoiced vs Approved vs Billed Amounts</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Invoiced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Billed</span>
            </div>
          </div>
        </div>
        <div className="h-64 relative">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="invoicedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="approvedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="billedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {amountTrendData.map((data, index) => {
              const x = (index / (amountTrendData.length - 1)) * 100;
              const invoicedY = 100 - (data.invoiced / maxAmountValue) * 80;
              const approvedY = 100 - (data.approved / maxAmountValue) * 80;
              const billedY = 100 - (data.billed / maxAmountValue) * 80;

              return (
                <g key={index}>
                  <circle cx={`${x}%`} cy={`${invoicedY}%`} r="4" fill="rgb(34, 197, 94)" className="opacity-80" />
                  <circle cx={`${x}%`} cy={`${approvedY}%`} r="4" fill="rgb(59, 130, 246)" className="opacity-80" />
                  <circle cx={`${x}%`} cy={`${billedY}%`} r="4" fill="rgb(249, 115, 22)" className="opacity-80" />
                </g>
              );
            })}

            <polyline
              points={amountTrendData.map((data, index) => {
                const x = (index / (amountTrendData.length - 1)) * 100;
                const y = 100 - (data.invoiced / maxAmountValue) * 80;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <polyline
              points={amountTrendData.map((data, index) => {
                const x = (index / (amountTrendData.length - 1)) * 100;
                const y = 100 - (data.approved / maxAmountValue) * 80;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <polyline
              points={amountTrendData.map((data, index) => {
                const x = (index / (amountTrendData.length - 1)) * 100;
                const y = 100 - (data.billed / maxAmountValue) * 80;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgb(249, 115, 22)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-slate-400">
            {amountTrendData.map((data, index) => (
              index % 2 === 0 && <span key={index}>{data.month}</span>
            ))}
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
