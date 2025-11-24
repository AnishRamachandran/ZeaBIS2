import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react';

interface MonthData {
  month: string;
  hours: number;
  amount: number;
}

interface EmployeeData {
  employeeId: string;
  name: string;
  billRate: number;
  totalHours: number;
  totalAmount: number;
  months: MonthData[];
}

interface InvoiceData {
  invoiceId: string;
  invoiceNumber: string;
  project: string;
  projectManager: string;
  customer: string;
  poId: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  totalAmount: number;
  months: MonthData[];
  employees: EmployeeData[];
}

interface InvoiceTableProps {
  data: InvoiceData[];
  onEdit?: (invoice: InvoiceData) => void;
  onDelete?: (invoice: InvoiceData) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ data, onEdit, onDelete }) => {
  const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set());
  const [expandedEmployees, setExpandedEmployees] = useState<Set<string>>(new Set());

  const toggleInvoice = (invoiceId: string) => {
    const newExpanded = new Set(expandedInvoices);
    if (newExpanded.has(invoiceId)) {
      newExpanded.delete(invoiceId);
      expandedEmployees.forEach(empKey => {
        if (empKey.startsWith(invoiceId)) {
          expandedEmployees.delete(empKey);
        }
      });
      setExpandedEmployees(new Set(expandedEmployees));
    } else {
      newExpanded.add(invoiceId);
    }
    setExpandedInvoices(newExpanded);
  };

  const toggleEmployee = (invoiceId: string, employeeId: string) => {
    const key = `${invoiceId}-${employeeId}`;
    const newExpanded = new Set(expandedEmployees);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedEmployees(newExpanded);
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'Paid': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Pending': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Draft': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return statusMap[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider w-8"></th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Invoice #</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Project</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">PM</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">PO ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Invoice Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase tracking-wider w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.map((invoice) => (
              <React.Fragment key={invoice.invoiceId}>
                <tr className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleInvoice(invoice.invoiceId)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      {expandedInvoices.has(invoice.invoiceId) ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.project}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.projectManager}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.customer}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.poId}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.invoiceDate}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{invoice.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-green-400">${invoice.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(invoice)}
                        className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => onDelete?.(invoice)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedInvoices.has(invoice.invoiceId) && (
                  <tr>
                    <td colSpan={11} className="px-4 py-4 bg-slate-900/30">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-blue-500 rounded"></span>
                          Monthly Breakdown
                        </h4>
                        <div className="bg-slate-800/50 rounded-lg overflow-x-auto border border-slate-700">
                          <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-slate-700">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300 uppercase sticky left-0 bg-slate-900/50">Metric</th>
                                {invoice.months.map((month, idx) => (
                                  <th key={idx} className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">{month.month}</th>
                                ))}
                                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                              <tr className="hover:bg-slate-700/30 transition-colors">
                                <td className="px-4 py-2 text-sm font-medium text-slate-300 sticky left-0 bg-slate-800/50">Hours</td>
                                {invoice.months.map((month, idx) => (
                                  <td key={idx} className="px-4 py-2 text-sm text-right text-slate-300 whitespace-nowrap">{month.hours.toLocaleString()}</td>
                                ))}
                                <td className="px-4 py-2 text-sm text-right font-semibold text-blue-400 whitespace-nowrap">
                                  {invoice.months.reduce((sum, m) => sum + m.hours, 0).toLocaleString()}
                                </td>
                              </tr>
                              <tr className="hover:bg-slate-700/30 transition-colors">
                                <td className="px-4 py-2 text-sm font-medium text-slate-300 sticky left-0 bg-slate-800/50">Amount</td>
                                {invoice.months.map((month, idx) => (
                                  <td key={idx} className="px-4 py-2 text-sm text-right text-green-400 font-semibold whitespace-nowrap">${month.amount.toLocaleString()}</td>
                                ))}
                                <td className="px-4 py-2 text-sm text-right font-semibold text-green-400 whitespace-nowrap">
                                  ${invoice.months.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h4 className="text-sm font-semibold text-white mt-6 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-green-500 rounded"></span>
                          Employee Details
                        </h4>
                        {invoice.employees.map((employee) => {
                          const empKey = `${invoice.invoiceId}-${employee.employeeId}`;
                          const isExpanded = expandedEmployees.has(empKey);

                          return (
                            <div key={employee.employeeId} className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                              <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                                onClick={() => toggleEmployee(invoice.invoiceId, employee.employeeId)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <button className="p-1">
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4 text-slate-400" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-slate-400" />
                                    )}
                                  </button>
                                  <span className="text-sm font-medium text-white">{employee.name}</span>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="text-right">
                                    <div className="text-slate-400 text-xs">Bill Rate</div>
                                    <div className="text-slate-300 font-semibold">${employee.billRate}/hr</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-slate-400 text-xs">Total Hours</div>
                                    <div className="text-slate-300 font-semibold">{employee.totalHours.toLocaleString()}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-slate-400 text-xs">Total Amount</div>
                                    <div className="text-green-400 font-semibold">${employee.totalAmount.toLocaleString()}</div>
                                  </div>
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="px-4 pb-4">
                                  <div className="bg-slate-900/50 rounded-lg overflow-x-auto border border-slate-700">
                                    <table className="w-full">
                                      <thead className="bg-slate-900 border-b border-slate-700">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300 uppercase sticky left-0 bg-slate-900">Metric</th>
                                          {employee.months.map((month, idx) => (
                                            <th key={idx} className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">{month.month}</th>
                                          ))}
                                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">Total</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-700">
                                        <tr className="hover:bg-slate-700/30 transition-colors">
                                          <td className="px-4 py-2 text-sm font-medium text-slate-300 sticky left-0 bg-slate-900/50">Hours</td>
                                          {employee.months.map((month, idx) => (
                                            <td key={idx} className="px-4 py-2 text-sm text-right text-slate-300 whitespace-nowrap">{month.hours.toLocaleString()}</td>
                                          ))}
                                          <td className="px-4 py-2 text-sm text-right font-semibold text-blue-400 whitespace-nowrap">
                                            {employee.months.reduce((sum, m) => sum + m.hours, 0).toLocaleString()}
                                          </td>
                                        </tr>
                                        <tr className="hover:bg-slate-700/30 transition-colors">
                                          <td className="px-4 py-2 text-sm font-medium text-slate-300 sticky left-0 bg-slate-900/50">Amount</td>
                                          {employee.months.map((month, idx) => (
                                            <td key={idx} className="px-4 py-2 text-sm text-right text-green-400 font-semibold whitespace-nowrap">${month.amount.toLocaleString()}</td>
                                          ))}
                                          <td className="px-4 py-2 text-sm text-right font-semibold text-green-400 whitespace-nowrap">
                                            ${employee.months.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
