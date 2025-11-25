import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { FileCheck, Clock, DollarSign } from 'lucide-react';

export const InvoicesPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});

  const columns: Column[] = [
    { key: 'invoice_number', label: 'Invoice #', sortable: true },
    { key: 'invoice_name', label: 'Invoice Name' },
    { key: 'po', label: 'PO' },
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
    { key: 'invoice_date', label: 'Invoice Date' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
  ];

  const invoiceData = [
    {
      id: 1,
      invoice_number: 'INV-2024-001',
      invoice_name: 'January Billing',
      po: 'PO-2024-001',
      status: 'Paid',
      invoice_date: '2024-01-31',
      due_date: '2024-02-15',
      amount: 45000,
    },
    {
      id: 2,
      invoice_number: 'INV-2024-002',
      invoice_name: 'February Billing',
      po: 'PO-2024-001',
      status: 'Paid',
      invoice_date: '2024-02-29',
      due_date: '2024-03-15',
      amount: 48000,
    },
    {
      id: 3,
      invoice_number: 'INV-2024-003',
      invoice_name: 'March Billing',
      po: 'PO-2024-002',
      status: 'Pending',
      invoice_date: '2024-03-31',
      due_date: '2024-04-15',
      amount: 35000,
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
          <p className="text-slate-400">Manage invoices and payments</p>
        </div>
        <GlobalFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Invoices" value={42} icon={FileCheck} color="blue" />
        <StatCard title="Pending" value={12} icon={Clock} color="orange" />
        <StatCard title="Total Invoiced" value="$1.8M" icon={DollarSign} color="green" />
      </div>

      <div className="mb-8">
        <DataTable
          columns={columns}
          data={invoiceData}
          onEdit={(row) => console.log('Edit invoice', row)}
          onDelete={(row) => console.log('Delete invoice', row)}
        />
      </div>
    </div>
  );
};
