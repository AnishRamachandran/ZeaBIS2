import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { DataTable, Column } from '../components/DataTable';
import { FileText, FileCheck, Receipt, Plus, ChevronRight, ChevronDown, LayoutDashboard } from 'lucide-react';

type TabType = 'dashboard' | 'proposals' | 'pos' | 'invoices';

interface Employee {
  id: string;
  name: string;
  hours: number;
  billRate: number;
  totalAmount: number;
  duration: string;
}

interface Invoice {
  id: string;
  number: string;
  name: string;
  status: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  employees: Employee[];
}

interface PO {
  id: string;
  name: string;
  status: string;
  amount: number;
  effort: number;
  utilized: number;
  billed: number;
  invoices: Invoice[];
}

interface Proposal {
  id: string;
  proposalId: string;
  name: string;
  project: string;
  status: string;
  amount: number;
  effort: number;
  startDate: string;
  endDate: string;
  pos: PO[];
}

export const Proposals: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [expandedProposals, setExpandedProposals] = useState<Set<string>>(new Set());
  const [expandedPOs, setExpandedPOs] = useState<Set<string>>(new Set());
  const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set());

  const toggleProposal = (id: string) => {
    const newSet = new Set(expandedProposals);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedProposals(newSet);
  };

  const togglePO = (id: string) => {
    const newSet = new Set(expandedPOs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedPOs(newSet);
  };

  const toggleInvoice = (id: string) => {
    const newSet = new Set(expandedInvoices);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedInvoices(newSet);
  };

  const proposalColumns: Column[] = [
    { key: 'proposalId', label: 'Proposal ID', sortable: true },
    { key: 'name', label: 'Proposal Name', sortable: true },
    { key: 'project', label: 'Project' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        value === 'Closed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
  ];

  const poColumns: Column[] = [
    { key: 'name', label: 'PO Name', sortable: true },
    { key: 'proposalId', label: 'Proposal ID' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Draft' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
    { key: 'effort', label: 'Effort (hrs)', sortable: true },
    { key: 'utilized', label: 'Utilized', sortable: true, render: (value) => `${value}%` },
    { key: 'billed', label: 'Billed', sortable: true, render: (value) => `${value}%` },
  ];

  const invoiceColumns: Column[] = [
    { key: 'number', label: 'Invoice #', sortable: true },
    { key: 'name', label: 'Invoice Name' },
    { key: 'po', label: 'PO' },
    { key: 'proposalId', label: 'Proposal ID' },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        value === 'Paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
        value === 'Pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      }`}>
        {value}
      </span>
    )},
    { key: 'invoiceDate', label: 'Invoice Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => `$${value?.toLocaleString() || 0}` },
  ];

  const hierarchyData: Proposal[] = [
    {
      id: '1',
      proposalId: 'PROP-2024-001',
      name: 'E-Commerce Platform Proposal',
      project: 'E-Commerce Platform',
      status: 'Active',
      amount: 250000,
      effort: 1500,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      pos: [
        {
          id: 'po1',
          name: 'PO-2024-001',
          status: 'Active',
          amount: 250000,
          effort: 1500,
          utilized: 68,
          billed: 55,
          invoices: [
            {
              id: 'inv1',
              number: 'INV-2024-001',
              name: 'January Billing',
              status: 'Paid',
              invoiceDate: '2024-01-31',
              dueDate: '2024-02-15',
              amount: 45000,
              employees: [
                { id: 'emp1', name: 'John Smith', hours: 160, billRate: 150, totalAmount: 24000, duration: 'Jan 1 - Jan 31' },
                { id: 'emp2', name: 'Sarah Johnson', hours: 140, billRate: 150, totalAmount: 21000, duration: 'Jan 1 - Jan 31' },
              ]
            },
            {
              id: 'inv2',
              number: 'INV-2024-002',
              name: 'February Billing',
              status: 'Paid',
              invoiceDate: '2024-02-29',
              dueDate: '2024-03-15',
              amount: 48000,
              employees: [
                { id: 'emp1', name: 'John Smith', hours: 168, billRate: 150, totalAmount: 25200, duration: 'Feb 1 - Feb 29' },
                { id: 'emp2', name: 'Sarah Johnson', hours: 152, billRate: 150, totalAmount: 22800, duration: 'Feb 1 - Feb 29' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      proposalId: 'PROP-2024-002',
      name: 'Mobile App Phase 1',
      project: 'Mobile App Development',
      status: 'Active',
      amount: 180000,
      effort: 1200,
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      pos: [
        {
          id: 'po2',
          name: 'PO-2024-002',
          status: 'Active',
          amount: 180000,
          effort: 1200,
          utilized: 45,
          billed: 40,
          invoices: [
            {
              id: 'inv3',
              number: 'INV-2024-003',
              name: 'March Billing',
              status: 'Pending',
              invoiceDate: '2024-03-31',
              dueDate: '2024-04-15',
              amount: 35000,
              employees: [
                { id: 'emp3', name: 'Mike Davis', hours: 120, billRate: 140, totalAmount: 16800, duration: 'Mar 1 - Mar 31' },
                { id: 'emp4', name: 'Emily Chen', hours: 130, billRate: 140, totalAmount: 18200, duration: 'Mar 1 - Mar 31' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: '3',
      proposalId: 'PROP-2024-003',
      name: 'Cloud Migration Services',
      project: 'Cloud Migration',
      status: 'Draft',
      amount: 320000,
      effort: 2000,
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      pos: [
        {
          id: 'po3',
          name: 'PO-2024-003',
          status: 'Draft',
          amount: 320000,
          effort: 2000,
          utilized: 0,
          billed: 0,
          invoices: []
        }
      ]
    }
  ];

  const proposalData = hierarchyData.map(p => ({
    id: p.id,
    proposalId: p.proposalId,
    name: p.name,
    project: p.project,
    status: p.status,
    amount: p.amount,
    effort: p.effort,
    startDate: p.startDate,
    endDate: p.endDate
  }));

  const poData = hierarchyData.flatMap(p =>
    p.pos.map(po => ({
      id: po.id,
      name: po.name,
      proposalId: p.proposalId,
      status: po.status,
      amount: po.amount,
      effort: po.effort,
      utilized: po.utilized,
      billed: po.billed
    }))
  );

  const invoiceData = hierarchyData.flatMap(p =>
    p.pos.flatMap(po =>
      po.invoices.map(inv => ({
        id: inv.id,
        number: inv.number,
        name: inv.name,
        po: po.name,
        proposalId: p.proposalId,
        status: inv.status,
        invoiceDate: inv.invoiceDate,
        dueDate: inv.dueDate,
        amount: inv.amount
      }))
    )
  );

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'proposals' as TabType, label: 'Proposals', icon: FileText },
    { id: 'pos' as TabType, label: 'Purchase Orders', icon: Receipt },
    { id: 'invoices' as TabType, label: 'Invoices', icon: FileCheck },
  ];

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Draft': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Closed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Paid': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Pending': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return statusMap[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Proposals & Billing</h1>
          <p className="text-slate-400">Manage proposals, POs, and invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Add {activeTab === 'proposals' ? 'Proposal' : activeTab === 'pos' ? 'PO' : 'Invoice'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Active Proposals" value={24} icon={FileText} color="blue" />
        <StatCard title="Active POs" value={18} icon={Receipt} color="green" />
        <StatCard title="Pending Invoices" value={12} icon={FileCheck} color="orange" />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden mb-6">
        <div className="flex border-b border-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        {activeTab === 'dashboard' && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/30 border-b border-slate-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Expand</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Effort</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {hierarchyData.map((proposal) => (
                    <React.Fragment key={proposal.id}>
                      <tr className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleProposal(proposal.id)}
                            className="p-1 hover:bg-slate-700 rounded transition-colors"
                          >
                            {expandedProposals.has(proposal.id) ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-blue-400">{proposal.proposalId}</td>
                        <td className="px-4 py-3 text-sm font-medium text-white">{proposal.name}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                            {proposal.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">${proposal.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{proposal.effort} hrs</td>
                      </tr>

                      {expandedProposals.has(proposal.id) && proposal.pos.map((po) => (
                        <React.Fragment key={po.id}>
                          <tr className="bg-slate-700/20 hover:bg-slate-700/30 transition-colors">
                            <td className="px-4 py-3 pl-12">
                              <button
                                onClick={() => togglePO(po.id)}
                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                              >
                                {expandedPOs.has(po.id) ? (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-green-400">{po.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">Purchase Order</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(po.status)}`}>
                                {po.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">${po.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{po.effort} hrs ({po.utilized}% utilized)</td>
                          </tr>

                          {expandedPOs.has(po.id) && po.invoices.map((invoice) => (
                            <React.Fragment key={invoice.id}>
                              <tr className="bg-slate-700/40 hover:bg-slate-700/50 transition-colors">
                                <td className="px-4 py-3 pl-20">
                                  <button
                                    onClick={() => toggleInvoice(invoice.id)}
                                    className="p-1 hover:bg-slate-700 rounded transition-colors"
                                  >
                                    {expandedInvoices.has(invoice.id) ? (
                                      <ChevronDown className="w-4 h-4 text-slate-400" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-slate-400" />
                                    )}
                                  </button>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-cyan-400">{invoice.number}</td>
                                <td className="px-4 py-3 text-sm text-slate-300">{invoice.name}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                                    {invoice.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-300">${invoice.amount.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm text-slate-300">{invoice.invoiceDate}</td>
                              </tr>

                              {expandedInvoices.has(invoice.id) && invoice.employees.map((employee) => (
                                <tr key={employee.id} className="bg-slate-700/60 hover:bg-slate-700/70 transition-colors">
                                  <td className="px-4 py-3 pl-28"></td>
                                  <td className="px-4 py-3 text-sm text-slate-400">{employee.id}</td>
                                  <td className="px-4 py-3 text-sm text-slate-300">{employee.name}</td>
                                  <td className="px-4 py-3 text-sm text-slate-300">{employee.duration}</td>
                                  <td className="px-4 py-3 text-sm text-slate-300">${employee.totalAmount.toLocaleString()}</td>
                                  <td className="px-4 py-3 text-sm text-slate-300">{employee.hours} hrs @ ${employee.billRate}/hr</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'proposals' && (
          <DataTable
            columns={proposalColumns}
            data={proposalData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
        {activeTab === 'pos' && (
          <DataTable
            columns={poColumns}
            data={poData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
        {activeTab === 'invoices' && (
          <DataTable
            columns={invoiceColumns}
            data={invoiceData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
          />
        )}
      </div>
    </div>
  );
};
