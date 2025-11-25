import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { InvoiceTable } from '../components/InvoiceTable';
import { FileCheck, DollarSign, Clock, CheckCircle } from 'lucide-react';

export const InvoiceTracker: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const invoiceData = [
    {
      invoiceId: 'inv-001',
      invoiceNumber: 'INV-2024-001',
      project: 'E-Commerce Platform',
      projectManager: 'John Smith',
      customer: 'TechCorp Inc',
      poId: 'PO-2024-001',
      invoiceDate: '2024-11-30',
      dueDate: '2024-12-15',
      status: 'Paid',
      totalAmount: 48000,
      months: [
        { month: 'Sep 2024', hours: 80, amount: 12000 },
        { month: 'Oct 2024', hours: 85, amount: 12750 },
        { month: 'Nov 2024', hours: 155, amount: 23250 },
      ],
      employees: [
        {
          employeeId: 'emp-001',
          name: 'John Smith',
          billRate: 150,
          totalHours: 160,
          totalAmount: 24000,
          months: [
            { month: 'Sep 2024', hours: 40, amount: 6000 },
            { month: 'Oct 2024', hours: 42, amount: 6300 },
            { month: 'Nov 2024', hours: 78, amount: 11700 },
          ],
        },
        {
          employeeId: 'emp-002',
          name: 'Sarah Johnson',
          billRate: 150,
          totalHours: 160,
          totalAmount: 24000,
          months: [
            { month: 'Sep 2024', hours: 40, amount: 6000 },
            { month: 'Oct 2024', hours: 43, amount: 6450 },
            { month: 'Nov 2024', hours: 77, amount: 11550 },
          ],
        },
      ],
    },
    {
      invoiceId: 'inv-002',
      invoiceNumber: 'INV-2024-002',
      project: 'Mobile App Development',
      projectManager: 'Emily Davis',
      customer: 'StartupXYZ',
      poId: 'PO-2024-002',
      invoiceDate: '2024-11-30',
      dueDate: '2024-12-15',
      status: 'Pending',
      totalAmount: 42000,
      months: [
        { month: 'Sep 2024', hours: 95, amount: 13300 },
        { month: 'Oct 2024', hours: 92, amount: 12880 },
        { month: 'Nov 2024', hours: 113, amount: 15820 },
      ],
      employees: [
        {
          employeeId: 'emp-003',
          name: 'Michael Chen',
          billRate: 140,
          totalHours: 150,
          totalAmount: 21000,
          months: [
            { month: 'Sep 2024', hours: 47, amount: 6580 },
            { month: 'Oct 2024', hours: 46, amount: 6440 },
            { month: 'Nov 2024', hours: 57, amount: 7980 },
          ],
        },
        {
          employeeId: 'emp-004',
          name: 'David Wilson',
          billRate: 140,
          totalHours: 150,
          totalAmount: 21000,
          months: [
            { month: 'Sep 2024', hours: 48, amount: 6720 },
            { month: 'Oct 2024', hours: 46, amount: 6440 },
            { month: 'Nov 2024', hours: 56, amount: 7840 },
          ],
        },
      ],
    },
    {
      invoiceId: 'inv-003',
      invoiceNumber: 'INV-2024-003',
      project: 'Cloud Migration',
      projectManager: 'Michael Chen',
      customer: 'Enterprise Solutions',
      poId: 'PO-2024-003',
      invoiceDate: '2024-10-31',
      dueDate: '2024-11-10',
      status: 'Overdue',
      totalAmount: 35200,
      months: [
        { month: 'Aug 2024', hours: 65, amount: 10400 },
        { month: 'Sep 2024', hours: 60, amount: 9600 },
        { month: 'Oct 2024', hours: 95, amount: 15200 },
      ],
      employees: [
        {
          employeeId: 'emp-005',
          name: 'Emily Davis',
          billRate: 160,
          totalHours: 110,
          totalAmount: 17600,
          months: [
            { month: 'Aug 2024', hours: 32, amount: 5120 },
            { month: 'Sep 2024', hours: 30, amount: 4800 },
            { month: 'Oct 2024', hours: 48, amount: 7680 },
          ],
        },
        {
          employeeId: 'emp-006',
          name: 'Robert Brown',
          billRate: 160,
          totalHours: 110,
          totalAmount: 17600,
          months: [
            { month: 'Aug 2024', hours: 33, amount: 5280 },
            { month: 'Sep 2024', hours: 30, amount: 4800 },
            { month: 'Oct 2024', hours: 47, amount: 7520 },
          ],
        },
      ],
    },
  ];

  const totalInvoiced = invoiceData.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidInvoices = invoiceData.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingInvoices = invoiceData.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const overdueInvoices = invoiceData.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Invoice Tracker</h1>
          <p className="text-slate-400">Track invoice status and collections</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Invoiced"
          value={`$${(totalInvoiced / 1000).toFixed(0)}K`}
          icon={FileCheck}
          color="blue"
        />
        <StatCard
          title="Collected"
          value={`$${(paidInvoices / 1000).toFixed(0)}K`}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Pending"
          value={`$${(pendingInvoices / 1000).toFixed(0)}K`}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Overdue"
          value={`$${(overdueInvoices / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="red"
        />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {invoiceData.length > 0 && invoiceData[0].months.map((monthData) => {
              const totalHoursForMonth = invoiceData.reduce((sum, invoice) => {
                const monthEntry = invoice.months.find(m => m.month === monthData.month);
                return sum + (monthEntry?.hours || 0);
              }, 0);

              return (
                <div key={monthData.month} className="flex flex-col items-center min-w-[100px]">
                  <div className="w-full bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors">
                    <div className="text-2xl font-bold text-white text-center mb-1">{totalHoursForMonth}</div>
                    <div className="text-xs text-slate-400 text-center">{monthData.month}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <InvoiceTable
          data={invoiceData}
          onEdit={(invoice) => console.log('Edit', invoice)}
          onDelete={(invoice) => console.log('Delete', invoice)}
        />
      </div>
    </div>
  );
};
