import React, { useState } from 'react';
import { GlobalFilters, FilterValues } from '../components/GlobalFilters';
import { StatCard } from '../components/StatCard';
import { BillingTable } from '../components/BillingTable';
import { Clock, Flame, TrendingUp, Users, FileText, Plus } from 'lucide-react';

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

export const BillingTracker: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    year: new Date().getFullYear().toString(),
    months: [new Date().toLocaleString('default', { month: 'long' })],
  });

  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const availableProjects = [
    { id: 'proj-004', name: 'Data Analytics Dashboard', customer: 'Analytics Co' },
    { id: 'proj-005', name: 'API Integration', customer: 'Integration Inc' },
    { id: 'proj-006', name: 'Security Audit', customer: 'SecureTech' },
  ];

  const [billingData, setBillingData] = useState<ProjectData[]>([
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
      totalBurnedHours: 1920,
      balanceHours: 480,
      burnedPercentage: 80.0,
      months: [
        { month: 'Jan 2024', hours: 180 },
        { month: 'Feb 2024', hours: 175 },
        { month: 'Mar 2024', hours: 190 },
        { month: 'Apr 2024', hours: 185 },
        { month: 'May 2024', hours: 200 },
        { month: 'Jun 2024', hours: 195 },
        { month: 'Jul 2024', hours: 188 },
        { month: 'Aug 2024', hours: 192 },
        { month: 'Sep 2024', hours: 170 },
        { month: 'Oct 2024', hours: 165 },
        { month: 'Nov 2024', hours: 160 },
      ],
      employees: [
        {
          employeeId: 'emp-001',
          name: 'John Smith',
          billRate: 150,
          months: [
            { month: 'Jan 2024', hours: 90 },
            { month: 'Feb 2024', hours: 88 },
            { month: 'Mar 2024', hours: 95 },
            { month: 'Apr 2024', hours: 92 },
            { month: 'May 2024', hours: 100 },
            { month: 'Jun 2024', hours: 98 },
            { month: 'Jul 2024', hours: 94 },
            { month: 'Aug 2024', hours: 96 },
            { month: 'Sep 2024', hours: 85 },
            { month: 'Oct 2024', hours: 82 },
            { month: 'Nov 2024', hours: 80 },
          ],
        },
        {
          employeeId: 'emp-002',
          name: 'Sarah Johnson',
          billRate: 150,
          months: [
            { month: 'Jan 2024', hours: 90 },
            { month: 'Feb 2024', hours: 87 },
            { month: 'Mar 2024', hours: 95 },
            { month: 'Apr 2024', hours: 93 },
            { month: 'May 2024', hours: 100 },
            { month: 'Jun 2024', hours: 97 },
            { month: 'Jul 2024', hours: 94 },
            { month: 'Aug 2024', hours: 96 },
            { month: 'Sep 2024', hours: 85 },
            { month: 'Oct 2024', hours: 83 },
            { month: 'Nov 2024', hours: 80 },
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
      totalBurnedHours: 1620,
      balanceHours: 180,
      burnedPercentage: 90.0,
      months: [
        { month: 'Jan 2024', hours: 150 },
        { month: 'Feb 2024', hours: 155 },
        { month: 'Mar 2024', hours: 148 },
        { month: 'Apr 2024', hours: 152 },
        { month: 'May 2024', hours: 160 },
        { month: 'Jun 2024', hours: 158 },
        { month: 'Jul 2024', hours: 145 },
        { month: 'Aug 2024', hours: 150 },
        { month: 'Sep 2024', hours: 142 },
        { month: 'Oct 2024', hours: 140 },
        { month: 'Nov 2024', hours: 120 },
      ],
      employees: [
        {
          employeeId: 'emp-003',
          name: 'Michael Chen',
          billRate: 140,
          months: [
            { month: 'Jan 2024', hours: 75 },
            { month: 'Feb 2024', hours: 78 },
            { month: 'Mar 2024', hours: 74 },
            { month: 'Apr 2024', hours: 76 },
            { month: 'May 2024', hours: 80 },
            { month: 'Jun 2024', hours: 79 },
            { month: 'Jul 2024', hours: 72 },
            { month: 'Aug 2024', hours: 75 },
            { month: 'Sep 2024', hours: 71 },
            { month: 'Oct 2024', hours: 70 },
            { month: 'Nov 2024', hours: 60 },
          ],
        },
        {
          employeeId: 'emp-004',
          name: 'David Wilson',
          billRate: 140,
          months: [
            { month: 'Jan 2024', hours: 75 },
            { month: 'Feb 2024', hours: 77 },
            { month: 'Mar 2024', hours: 74 },
            { month: 'Apr 2024', hours: 76 },
            { month: 'May 2024', hours: 80 },
            { month: 'Jun 2024', hours: 79 },
            { month: 'Jul 2024', hours: 73 },
            { month: 'Aug 2024', hours: 75 },
            { month: 'Sep 2024', hours: 71 },
            { month: 'Oct 2024', hours: 70 },
            { month: 'Nov 2024', hours: 60 },
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
      totalBurnedHours: 1400,
      balanceHours: 600,
      burnedPercentage: 70.0,
      months: [
        { month: 'Jan 2024', hours: 140 },
        { month: 'Feb 2024', hours: 135 },
        { month: 'Mar 2024', hours: 130 },
        { month: 'Apr 2024', hours: 125 },
        { month: 'May 2024', hours: 140 },
        { month: 'Jun 2024', hours: 135 },
        { month: 'Jul 2024', hours: 125 },
        { month: 'Aug 2024', hours: 130 },
        { month: 'Sep 2024', hours: 120 },
        { month: 'Oct 2024', hours: 110 },
        { month: 'Nov 2024', hours: 110 },
      ],
      employees: [
        {
          employeeId: 'emp-005',
          name: 'Emily Davis',
          billRate: 160,
          months: [
            { month: 'Jan 2024', hours: 70 },
            { month: 'Feb 2024', hours: 68 },
            { month: 'Mar 2024', hours: 65 },
            { month: 'Apr 2024', hours: 62 },
            { month: 'May 2024', hours: 70 },
            { month: 'Jun 2024', hours: 68 },
            { month: 'Jul 2024', hours: 62 },
            { month: 'Aug 2024', hours: 65 },
            { month: 'Sep 2024', hours: 60 },
            { month: 'Oct 2024', hours: 55 },
            { month: 'Nov 2024', hours: 55 },
          ],
        },
        {
          employeeId: 'emp-006',
          name: 'Robert Brown',
          billRate: 160,
          months: [
            { month: 'Jan 2024', hours: 70 },
            { month: 'Feb 2024', hours: 67 },
            { month: 'Mar 2024', hours: 65 },
            { month: 'Apr 2024', hours: 63 },
            { month: 'May 2024', hours: 70 },
            { month: 'Jun 2024', hours: 67 },
            { month: 'Jul 2024', hours: 63 },
            { month: 'Aug 2024', hours: 65 },
            { month: 'Sep 2024', hours: 60 },
            { month: 'Oct 2024', hours: 55 },
            { month: 'Nov 2024', hours: 55 },
          ],
        },
      ],
    },
  ]);

  const totalPOHours = billingData.reduce((sum, p) => sum + p.poHours, 0);
  const totalBurnedHours = billingData.reduce((sum, p) => sum + p.totalBurnedHours, 0);
  const avgBurnRate = (billingData.reduce((sum, p) => sum + p.burnedPercentage, 0) / billingData.length).toFixed(1);
  const totalEmployees = billingData.reduce((sum, p) => sum + p.employees.length, 0);
  const totalPOs = billingData.length;

  const handleAddProject = () => {
    if (selectedProject) {
      const project = availableProjects.find(p => p.id === selectedProject);
      if (project) {
        const newProject: ProjectData = {
          projectId: project.id,
          project: project.name,
          projectManager: 'TBD',
          customer: project.customer,
          invoiceStatus: 'Pending',
          projectStatus: 'Active',
          proposalId: `PROP-${project.id}`,
          poId: `PO-${project.id}`,
          poStatus: 'Active',
          poHours: 1000,
          billRate: 150,
          poAmount: 150000,
          totalBurnedHours: 0,
          balanceHours: 1000,
          burnedPercentage: 0,
          months: Array.from({ length: 11 }, (_, i) => ({
            month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            hours: 0,
          })),
          employees: [],
        };
        setBillingData([...billingData, newProject]);
        setShowAddProject(false);
        setSelectedProject('');
      }
    }
  };

  const handleSave = (updatedProject: ProjectData) => {
    setBillingData(billingData.map(p =>
      p.projectId === updatedProject.projectId ? updatedProject : p
    ));
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Billing Tracker</h1>
          <p className="text-slate-400">Track billing and effort by project</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddProject(!showAddProject)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
          <GlobalFilters filters={filters} onFilterChange={setFilters} />
        </div>
      </div>

      {showAddProject && (
        <div className="mb-6 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Add Existing Project</h3>
          <div className="flex items-center gap-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a project...</option>
              {availableProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name} - {project.customer}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddProject}
              disabled={!selectedProject}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddProject(false);
                setSelectedProject('');
              }}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatCard
          title="Total PO Hours"
          value={totalPOHours.toLocaleString()}
          icon={Clock}
          color="blue"
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
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total POs"
          value={totalPOs}
          icon={FileText}
          color="teal"
        />
        <StatCard
          title="Active Projects"
          value={billingData.filter(p => p.projectStatus === 'Active').length}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Month-wise Hours Overview</h3>
          <p className="text-sm text-slate-400">Total hours across all projects by month</p>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {billingData.length > 0 && billingData[0].months.map((monthData, index) => {
              const totalHours = billingData.reduce((sum, project) => {
                return sum + (project.months[index]?.hours || 0);
              }, 0);

              return (
                <div key={monthData.month} className="flex flex-col items-center min-w-[100px]">
                  <div className="w-full bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors">
                    <div className="text-xs text-slate-400 mb-1 text-center">{monthData.month}</div>
                    <div className="text-xl font-bold text-white text-center">{totalHours}</div>
                    <div className="text-xs text-slate-500 text-center">hours</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <BillingTable
          data={billingData}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};
