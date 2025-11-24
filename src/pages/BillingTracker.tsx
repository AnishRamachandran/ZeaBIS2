import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { BillingTable } from '../components/BillingTable';
import { Receipt, DollarSign, TrendingUp, Clock, Flame, CheckCircle } from 'lucide-react';

export const BillingTracker: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const billingData = [
    {
      projectId: 'proj-001',
      project: 'E-Commerce Platform',
      projectManager: 'John Smith',
      customer: 'TechCorp Inc',
      invoiceStatus: 'Partial',
      projectStatus: 'Active',
      proposalId: 'PROP-2024-001',
      poId: 'PO-2024-001',
      poStatus: 'Active',
      poHours: 2400,
      billRate: 150,
      poAmount: 360000,
      totalInvoiced: 240000,
      balanceToInvoice: 120000,
      totalBurnedHours: 1920,
      balanceHours: 480,
      burnedPercentage: 80.0,
      months: [
        { month: 'Jan 2024', hours: 180, amount: 27000 },
        { month: 'Feb 2024', hours: 175, amount: 26250 },
        { month: 'Mar 2024', hours: 190, amount: 28500 },
        { month: 'Apr 2024', hours: 185, amount: 27750 },
        { month: 'May 2024', hours: 200, amount: 30000 },
        { month: 'Jun 2024', hours: 195, amount: 29250 },
        { month: 'Jul 2024', hours: 188, amount: 28200 },
        { month: 'Aug 2024', hours: 192, amount: 28800 },
        { month: 'Sep 2024', hours: 170, amount: 25500 },
        { month: 'Oct 2024', hours: 165, amount: 24750 },
        { month: 'Nov 2024', hours: 160, amount: 24000 },
      ],
      employees: [
        {
          employeeId: 'emp-001',
          name: 'John Smith',
          billRate: 150,
          totalHours: 960,
          totalAmount: 144000,
          months: [
            { month: 'Jan 2024', hours: 90, amount: 13500 },
            { month: 'Feb 2024', hours: 88, amount: 13200 },
            { month: 'Mar 2024', hours: 95, amount: 14250 },
            { month: 'Apr 2024', hours: 92, amount: 13800 },
            { month: 'May 2024', hours: 100, amount: 15000 },
            { month: 'Jun 2024', hours: 98, amount: 14700 },
            { month: 'Jul 2024', hours: 94, amount: 14100 },
            { month: 'Aug 2024', hours: 96, amount: 14400 },
            { month: 'Sep 2024', hours: 85, amount: 12750 },
            { month: 'Oct 2024', hours: 82, amount: 12300 },
            { month: 'Nov 2024', hours: 80, amount: 12000 },
          ],
        },
        {
          employeeId: 'emp-002',
          name: 'Sarah Johnson',
          billRate: 150,
          totalHours: 960,
          totalAmount: 144000,
          months: [
            { month: 'Jan 2024', hours: 90, amount: 13500 },
            { month: 'Feb 2024', hours: 87, amount: 13050 },
            { month: 'Mar 2024', hours: 95, amount: 14250 },
            { month: 'Apr 2024', hours: 93, amount: 13950 },
            { month: 'May 2024', hours: 100, amount: 15000 },
            { month: 'Jun 2024', hours: 97, amount: 14550 },
            { month: 'Jul 2024', hours: 94, amount: 14100 },
            { month: 'Aug 2024', hours: 96, amount: 14400 },
            { month: 'Sep 2024', hours: 85, amount: 12750 },
            { month: 'Oct 2024', hours: 83, amount: 12450 },
            { month: 'Nov 2024', hours: 80, amount: 12000 },
          ],
        },
      ],
    },
    {
      projectId: 'proj-002',
      project: 'Mobile App Development',
      projectManager: 'Emily Davis',
      customer: 'StartupXYZ',
      invoiceStatus: 'Completed',
      projectStatus: 'Active',
      proposalId: 'PROP-2024-002',
      poId: 'PO-2024-002',
      poStatus: 'Active',
      poHours: 1800,
      billRate: 140,
      poAmount: 252000,
      totalInvoiced: 252000,
      balanceToInvoice: 0,
      totalBurnedHours: 1620,
      balanceHours: 180,
      burnedPercentage: 90.0,
      months: [
        { month: 'Jan 2024', hours: 150, amount: 21000 },
        { month: 'Feb 2024', hours: 155, amount: 21700 },
        { month: 'Mar 2024', hours: 148, amount: 20720 },
        { month: 'Apr 2024', hours: 152, amount: 21280 },
        { month: 'May 2024', hours: 160, amount: 22400 },
        { month: 'Jun 2024', hours: 158, amount: 22120 },
        { month: 'Jul 2024', hours: 145, amount: 20300 },
        { month: 'Aug 2024', hours: 150, amount: 21000 },
        { month: 'Sep 2024', hours: 142, amount: 19880 },
        { month: 'Oct 2024', hours: 140, amount: 19600 },
        { month: 'Nov 2024', hours: 120, amount: 16800 },
      ],
      employees: [
        {
          employeeId: 'emp-003',
          name: 'Michael Chen',
          billRate: 140,
          totalHours: 810,
          totalAmount: 113400,
          months: [
            { month: 'Jan 2024', hours: 75, amount: 10500 },
            { month: 'Feb 2024', hours: 78, amount: 10920 },
            { month: 'Mar 2024', hours: 74, amount: 10360 },
            { month: 'Apr 2024', hours: 76, amount: 10640 },
            { month: 'May 2024', hours: 80, amount: 11200 },
            { month: 'Jun 2024', hours: 79, amount: 11060 },
            { month: 'Jul 2024', hours: 72, amount: 10080 },
            { month: 'Aug 2024', hours: 75, amount: 10500 },
            { month: 'Sep 2024', hours: 71, amount: 9940 },
            { month: 'Oct 2024', hours: 70, amount: 9800 },
            { month: 'Nov 2024', hours: 60, amount: 8400 },
          ],
        },
        {
          employeeId: 'emp-004',
          name: 'David Wilson',
          billRate: 140,
          totalHours: 810,
          totalAmount: 113400,
          months: [
            { month: 'Jan 2024', hours: 75, amount: 10500 },
            { month: 'Feb 2024', hours: 77, amount: 10780 },
            { month: 'Mar 2024', hours: 74, amount: 10360 },
            { month: 'Apr 2024', hours: 76, amount: 10640 },
            { month: 'May 2024', hours: 80, amount: 11200 },
            { month: 'Jun 2024', hours: 79, amount: 11060 },
            { month: 'Jul 2024', hours: 73, amount: 10220 },
            { month: 'Aug 2024', hours: 75, amount: 10500 },
            { month: 'Sep 2024', hours: 71, amount: 9940 },
            { month: 'Oct 2024', hours: 70, amount: 9800 },
            { month: 'Nov 2024', hours: 60, amount: 8400 },
          ],
        },
      ],
    },
    {
      projectId: 'proj-003',
      project: 'Cloud Migration',
      projectManager: 'Michael Chen',
      customer: 'Enterprise Solutions',
      invoiceStatus: 'Pending',
      projectStatus: 'On Hold',
      proposalId: 'PROP-2024-003',
      poId: 'PO-2024-003',
      poStatus: 'Active',
      poHours: 2000,
      billRate: 160,
      poAmount: 320000,
      totalInvoiced: 160000,
      balanceToInvoice: 160000,
      totalBurnedHours: 1400,
      balanceHours: 600,
      burnedPercentage: 70.0,
      months: [
        { month: 'Jan 2024', hours: 140, amount: 22400 },
        { month: 'Feb 2024', hours: 135, amount: 21600 },
        { month: 'Mar 2024', hours: 130, amount: 20800 },
        { month: 'Apr 2024', hours: 125, amount: 20000 },
        { month: 'May 2024', hours: 140, amount: 22400 },
        { month: 'Jun 2024', hours: 135, amount: 21600 },
        { month: 'Jul 2024', hours: 125, amount: 20000 },
        { month: 'Aug 2024', hours: 130, amount: 20800 },
        { month: 'Sep 2024', hours: 120, amount: 19200 },
        { month: 'Oct 2024', hours: 110, amount: 17600 },
        { month: 'Nov 2024', hours: 110, amount: 17600 },
      ],
      employees: [
        {
          employeeId: 'emp-005',
          name: 'Emily Davis',
          billRate: 160,
          totalHours: 700,
          totalAmount: 112000,
          months: [
            { month: 'Jan 2024', hours: 70, amount: 11200 },
            { month: 'Feb 2024', hours: 68, amount: 10880 },
            { month: 'Mar 2024', hours: 65, amount: 10400 },
            { month: 'Apr 2024', hours: 62, amount: 9920 },
            { month: 'May 2024', hours: 70, amount: 11200 },
            { month: 'Jun 2024', hours: 68, amount: 10880 },
            { month: 'Jul 2024', hours: 62, amount: 9920 },
            { month: 'Aug 2024', hours: 65, amount: 10400 },
            { month: 'Sep 2024', hours: 60, amount: 9600 },
            { month: 'Oct 2024', hours: 55, amount: 8800 },
            { month: 'Nov 2024', hours: 55, amount: 8800 },
          ],
        },
        {
          employeeId: 'emp-006',
          name: 'Robert Brown',
          billRate: 160,
          totalHours: 700,
          totalAmount: 112000,
          months: [
            { month: 'Jan 2024', hours: 70, amount: 11200 },
            { month: 'Feb 2024', hours: 67, amount: 10720 },
            { month: 'Mar 2024', hours: 65, amount: 10400 },
            { month: 'Apr 2024', hours: 63, amount: 10080 },
            { month: 'May 2024', hours: 70, amount: 11200 },
            { month: 'Jun 2024', hours: 67, amount: 10720 },
            { month: 'Jul 2024', hours: 63, amount: 10080 },
            { month: 'Aug 2024', hours: 65, amount: 10400 },
            { month: 'Sep 2024', hours: 60, amount: 9600 },
            { month: 'Oct 2024', hours: 55, amount: 8800 },
            { month: 'Nov 2024', hours: 55, amount: 8800 },
          ],
        },
      ],
    },
  ];

  const totalBilled = billingData.reduce((sum, p) => sum + p.totalInvoiced, 0);
  const totalPending = billingData.reduce((sum, p) => sum + p.balanceToInvoice, 0);
  const totalBurnedHours = billingData.reduce((sum, p) => sum + p.totalBurnedHours, 0);
  const totalPOAmount = billingData.reduce((sum, p) => sum + p.poAmount, 0);
  const avgBurnRate = (billingData.reduce((sum, p) => sum + p.burnedPercentage, 0) / billingData.length).toFixed(1);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Billing Tracker</h1>
          <p className="text-slate-400">Track billing and effort by project</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatCard
          title="Total PO Amount"
          value={`$${(totalPOAmount / 1000).toFixed(0)}K`}
          icon={Receipt}
          color="blue"
        />
        <StatCard
          title="Total Invoiced"
          value={`$${(totalBilled / 1000).toFixed(0)}K`}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Balance to Invoice"
          value={`$${(totalPending / 1000).toFixed(0)}K`}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Total Burned Hours"
          value={totalBurnedHours.toLocaleString()}
          icon={Flame}
          color="red"
        />
        <StatCard
          title="Avg Burn Rate"
          value={`${avgBurnRate}%`}
          icon={TrendingUp}
          color="pink"
        />
        <StatCard
          title="Active Projects"
          value={billingData.length}
          icon={DollarSign}
          color="teal"
        />
      </div>

      <div className="mb-8">
        <BillingTable
          data={billingData}
          onEdit={(project) => console.log('Edit', project)}
          onDelete={(project) => console.log('Delete', project)}
        />
      </div>
    </div>
  );
};
