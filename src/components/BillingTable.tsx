import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, Edit2, Save, X } from 'lucide-react';

interface MonthData {
  month: string;
  hours: number;
}

interface EmployeeData {
  employeeId: string;
  name: string;
  billRate: number;
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
  totalBurnedHours: number;
  balanceHours: number;
  burnedPercentage: number;
  months: MonthData[];
  employees: EmployeeData[];
}

interface BillingTableProps {
  data: ProjectData[];
  onSave?: (project: ProjectData) => void;
}

export const BillingTable: React.FC<BillingTableProps> = ({ data, onSave }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<ProjectData | null>(null);

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project.projectId);
    setEditedData(JSON.parse(JSON.stringify(project)));
  };

  const handleSave = () => {
    if (editedData) {
      onSave?.(editedData);
      setEditingProject(null);
      setEditedData(null);
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setEditedData(null);
  };

  const updateProjectHours = (monthIndex: number, hours: number) => {
    if (editedData) {
      const updated = { ...editedData };
      updated.months[monthIndex].hours = hours;
      updated.totalBurnedHours = updated.months.reduce((sum, m) => sum + m.hours, 0);
      updated.balanceHours = updated.poHours - updated.totalBurnedHours;
      updated.burnedPercentage = (updated.totalBurnedHours / updated.poHours) * 100;
      setEditedData(updated);
    }
  };

  const updateEmployeeHours = (empIndex: number, monthIndex: number, hours: number) => {
    if (editedData) {
      const updated = { ...editedData };
      updated.employees[empIndex].months[monthIndex].hours = hours;
      setEditedData(updated);
    }
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

  const renderProject = (project: ProjectData) => {
    const isEditing = editingProject === project.projectId;
    const displayData = isEditing && editedData ? editedData : project;

    return (
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
          <td className="px-4 py-3 text-sm font-medium text-white">{displayData.project}</td>
          <td className="px-4 py-3 text-sm text-slate-300">{displayData.projectManager}</td>
          <td className="px-4 py-3 text-sm text-slate-300">{displayData.customer}</td>
          <td className="px-4 py-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(displayData.invoiceStatus)}`}>
              {displayData.invoiceStatus}
            </span>
          </td>
          <td className="px-4 py-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(displayData.projectStatus)}`}>
              {displayData.projectStatus}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-slate-300">{displayData.proposalId}</td>
          <td className="px-4 py-3 text-sm text-slate-300">{displayData.poId}</td>
          <td className="px-4 py-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(displayData.poStatus)}`}>
              {displayData.poStatus}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-right text-slate-300">{displayData.poHours.toLocaleString()}</td>
          <td className="px-4 py-3 text-sm text-right text-slate-300">${displayData.billRate}/hr</td>
          <td className="px-4 py-3 text-sm text-right font-semibold text-blue-400">${displayData.poAmount.toLocaleString()}</td>
          <td className="px-4 py-3 text-sm text-right text-slate-300">{displayData.totalBurnedHours.toLocaleString()}</td>
          <td className="px-4 py-3 text-sm text-right text-slate-300">{displayData.balanceHours.toLocaleString()}</td>
          <td className="px-4 py-3 text-sm text-right">
            <span className={`font-semibold ${displayData.burnedPercentage > 90 ? 'text-red-400' : displayData.burnedPercentage > 75 ? 'text-orange-400' : 'text-green-400'}`}>
              {displayData.burnedPercentage.toFixed(1)}%
            </span>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center justify-center gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => toggleProject(project.projectId)}
                    className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1 hover:bg-green-500/20 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-green-400" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="p-1 hover:bg-green-500/20 rounded transition-colors"
                    title="Save"
                  >
                    <Save className="w-4 h-4 text-green-400" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>

        {expandedProjects.has(project.projectId) && (
          <tr>
            <td colSpan={15} className="px-4 py-4 bg-slate-900/30">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-500 rounded"></span>
                    Monthly Breakdown
                  </h4>
                  <div className="bg-slate-800/50 rounded-lg overflow-x-auto border border-slate-700">
                    <table className="w-full">
                      <thead className="bg-slate-900/50 border-b border-slate-700">
                        <tr>
                          {displayData.months.map((month, idx) => (
                            <th key={idx} className="px-4 py-2 text-center text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">
                              {month.month}
                            </th>
                          ))}
                          <th className="px-4 py-2 text-center text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-slate-700/30 transition-colors">
                          {displayData.months.map((month, idx) => (
                            <td key={idx} className="px-4 py-2 text-center whitespace-nowrap">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={month.hours}
                                  onChange={(e) => updateProjectHours(idx, parseInt(e.target.value) || 0)}
                                  className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-slate-300 text-center focus:outline-none focus:border-blue-500"
                                />
                              ) : (
                                <span className="text-sm text-slate-300">{month.hours.toLocaleString()}</span>
                              )}
                            </td>
                          ))}
                          <td className="px-4 py-2 text-center">
                            <span className="text-sm font-semibold text-blue-400 whitespace-nowrap">
                              {displayData.months.reduce((sum, m) => sum + m.hours, 0).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded"></span>
                    Employee Details
                  </h4>
                  <div className="bg-slate-800/50 rounded-lg overflow-x-auto border border-slate-700">
                    <table className="w-full">
                      <thead className="bg-slate-900/50 border-b border-slate-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300 uppercase sticky left-0 bg-slate-900/50">Employee</th>
                          {displayData.months.map((month, idx) => (
                            <th key={idx} className="px-4 py-2 text-center text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">
                              {month.month}
                            </th>
                          ))}
                          <th className="px-4 py-2 text-center text-xs font-semibold text-slate-300 uppercase whitespace-nowrap">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {displayData.employees.map((employee, empIdx) => (
                          <tr key={employee.employeeId} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-4 py-2 text-sm font-medium text-white sticky left-0 bg-slate-800/50 whitespace-nowrap">
                              {employee.name}
                            </td>
                            {employee.months.map((month, monthIdx) => (
                              <td key={monthIdx} className="px-4 py-2 text-center whitespace-nowrap">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    value={month.hours}
                                    onChange={(e) => updateEmployeeHours(empIdx, monthIdx, parseInt(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-slate-300 text-center focus:outline-none focus:border-blue-500"
                                  />
                                ) : (
                                  <span className="text-sm text-slate-300">{month.hours.toLocaleString()}</span>
                                )}
                              </td>
                            ))}
                            <td className="px-4 py-2 text-center">
                              <span className="text-sm font-semibold text-blue-400 whitespace-nowrap">
                                {employee.months.reduce((sum, m) => sum + m.hours, 0).toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
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
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Burned Hrs</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Balance Hrs</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Burned %</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.map((project) => renderProject(project))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
