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

interface ProjectData {
  projectId: string;
  project: string;
  projectManager: string;
  customer: string;
  invoiceStatus: string;
  projectStatus: string;
  proposalId: string;
  poId: string;
  poStatus: string;
  poHours: number;
  billRate: number;
  poAmount: number;
  totalInvoiced: number;
  balanceToInvoice: number;
  totalBurnedHours: number;
  balanceHours: number;
  burnedPercentage: number;
  months: MonthData[];
  employees: EmployeeData[];
}

interface BillingTableProps {
  data: ProjectData[];
  onEdit?: (project: ProjectData) => void;
  onDelete?: (project: ProjectData) => void;
}

export const BillingTable: React.FC<BillingTableProps> = ({ data, onEdit, onDelete }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [expandedEmployees, setExpandedEmployees] = useState<Set<string>>(new Set());

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
      expandedEmployees.forEach(empKey => {
        if (empKey.startsWith(projectId)) {
          expandedEmployees.delete(empKey);
        }
      });
      setExpandedEmployees(new Set(expandedEmployees));
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleEmployee = (projectId: string, employeeId: string) => {
    const key = `${projectId}-${employeeId}`;
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
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Partial': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Active': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Closed': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      'On Hold': 'bg-red-500/20 text-red-400 border-red-500/30',
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Project</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">PM</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Invoice Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Project Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Proposal ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">PO ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">PO Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">PO Hours</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Bill Rate</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">PO Amount</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Invoiced</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Balance</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Burned Hrs</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Balance Hrs</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Burned %</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase tracking-wider w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.map((project) => (
              <React.Fragment key={project.projectId}>
                <tr className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleProject(project.projectId)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      {expandedProjects.has(project.projectId) ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{project.project}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{project.projectManager}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{project.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.invoiceStatus)}`}>
                      {project.invoiceStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.projectStatus)}`}>
                      {project.projectStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{project.proposalId}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{project.poId}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.poStatus)}`}>
                      {project.poStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-slate-300">{project.poHours.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-300">${project.billRate}/hr</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-blue-400">${project.poAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-green-400">${project.totalInvoiced.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-orange-400">${project.balanceToInvoice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-300">{project.totalBurnedHours.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-300">{project.balanceHours.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className={`font-semibold ${project.burnedPercentage > 90 ? 'text-red-400' : project.burnedPercentage > 75 ? 'text-orange-400' : 'text-green-400'}`}>
                      {project.burnedPercentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(project)}
                        className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => onDelete?.(project)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedProjects.has(project.projectId) && (
                  <tr>
                    <td colSpan={18} className="px-4 py-4 bg-slate-900/30">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-blue-500 rounded"></span>
                          Monthly Breakdown
                        </h4>
                        <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                          <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-slate-700">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300 uppercase">Month</th>
                                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase">Hours</th>
                                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                              {project.months.map((month, idx) => (
                                <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                                  <td className="px-4 py-2 text-sm text-slate-300">{month.month}</td>
                                  <td className="px-4 py-2 text-sm text-right text-slate-300">{month.hours.toLocaleString()}</td>
                                  <td className="px-4 py-2 text-sm text-right text-green-400 font-semibold">${month.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <h4 className="text-sm font-semibold text-white mt-6 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-green-500 rounded"></span>
                          Employee Details
                        </h4>
                        {project.employees.map((employee) => {
                          const empKey = `${project.projectId}-${employee.employeeId}`;
                          const isExpanded = expandedEmployees.has(empKey);

                          return (
                            <div key={employee.employeeId} className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                              <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                                onClick={() => toggleEmployee(project.projectId, employee.employeeId)}
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
                                  <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                                    <table className="w-full">
                                      <thead className="bg-slate-900 border-b border-slate-700">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300 uppercase">Month</th>
                                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase">Hours</th>
                                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300 uppercase">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-700">
                                        {employee.months.map((month, idx) => (
                                          <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                                            <td className="px-4 py-2 text-sm text-slate-300">{month.month}</td>
                                            <td className="px-4 py-2 text-sm text-right text-slate-300">{month.hours.toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm text-right text-green-400 font-semibold">${month.amount.toLocaleString()}</td>
                                          </tr>
                                        ))}
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
