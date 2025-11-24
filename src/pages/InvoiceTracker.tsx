import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { FileCheck, DollarSign, Clock, CheckCircle } from 'lucide-react';

export const InvoiceTracker: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const columns: Column[] = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'po', label: 'PO' },
    { key: 'project', label: 'Project' },
    { key: 'invoiceDate', label: 'Invoice Date', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        value === 'Overdue' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
  ];

  const invoiceData = [
    { id: 1, invoiceNumber: 'INV-2024-001', po: 'PO-2024-001', project: 'E-Commerce Platform', invoiceDate: '2024-01-31', dueDate: '2024-02-15', amount: 45000, status: 'Paid' },
    { id: 2, invoiceNumber: 'INV-2024-002', po: 'PO-2024-001', project: 'E-Commerce Platform', invoiceDate: '2024-02-29', dueDate: '2024-03-15', amount: 48000, status: 'Paid' },
    { id: 3, invoiceNumber: 'INV-2024-003', po: 'PO-2024-002', project: 'Mobile App Development', invoiceDate: '2024-03-31', dueDate: '2024-04-15', amount: 35000, status: 'Pending' },
    { id: 4, invoiceNumber: 'INV-2024-004', po: 'PO-2024-003', project: 'Cloud Migration', invoiceDate: '2024-04-30', dueDate: '2024-05-15', amount: 52000, status: 'Pending' },
    { id: 5, invoiceNumber: 'INV-2024-005', po: 'PO-2024-001', project: 'E-Commerce Platform', invoiceDate: '2024-10-31', dueDate: '2024-11-10', amount: 42000, status: 'Overdue' },
  ];

  const renderExpandedRow = (row: any) => {
    const details = [
      { employee: 'John Smith', effort: 80, cost: 12000 },
      { employee: 'Sarah Johnson', effort: 90, cost: 13500 },
      { employee: 'Michael Chen', effort: 70, cost: 10500 },
    ];

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white mb-3">Invoice Details</h4>
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{detail.employee}</span>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">{detail.effort} hrs</span>
              <span className="text-green-400 font-semibold">${detail.cost.toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg mt-4">
          <span className="text-sm font-semibold text-white">Total</span>
          <span className="text-lg font-bold text-blue-400">$36,000</span>
        </div>
      </div>
    );
  };

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
        <StatCard title="Total Invoiced" value="$398K" icon={FileCheck} color="blue" />
        <StatCard title="Collected" value="$345K" icon={CheckCircle} color="green" />
        <StatCard title="Pending" value="$45K" icon={Clock} color="orange" />
        <StatCard title="Overdue" value="$8K" icon={DollarSign} color="pink" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={invoiceData}
          expandable={true}
          renderExpandedRow={renderExpandedRow}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
        />
      </div>
    </div>
  );
};
