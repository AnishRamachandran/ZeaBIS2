import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Save } from 'lucide-react';

interface Permission {
  view: boolean;
  edit: boolean;
  delete: boolean;
  hidden: boolean;
}

interface RolePermissions {
  [key: string]: Permission;
}

interface Role {
  id: string;
  name: string;
  permissions: RolePermissions;
}

const MODULES = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'projects', name: 'Projects' },
  { id: 'customers', name: 'Customers' },
  { id: 'employees', name: 'Employees' },
  { id: 'timesheets', name: 'Timesheets' },
  { id: 'proposals', name: 'Proposals' },
  { id: 'billing_tracker', name: 'Billing Tracker' },
  { id: 'invoice_tracker', name: 'Invoice Tracker' },
  { id: 'settings', name: 'Settings' },
];

const DEFAULT_PERMISSIONS: Permission = {
  view: false,
  edit: false,
  delete: false,
  hidden: false,
};

export const RBACManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Admin',
      permissions: Object.fromEntries(
        MODULES.map(m => [m.id, { view: true, edit: true, delete: true, hidden: false }])
      ),
    },
    {
      id: 'delivery_manager',
      name: 'Delivery Manager',
      permissions: {
        dashboard: { view: true, edit: false, delete: false, hidden: false },
        projects: { view: true, edit: true, delete: false, hidden: false },
        customers: { view: true, edit: false, delete: false, hidden: false },
        employees: { view: true, edit: true, delete: false, hidden: false },
        timesheets: { view: true, edit: true, delete: false, hidden: false },
        proposals: { view: true, edit: true, delete: false, hidden: false },
        billing_tracker: { view: true, edit: false, delete: false, hidden: false },
        invoice_tracker: { view: true, edit: false, delete: false, hidden: false },
        settings: { view: false, edit: false, delete: false, hidden: true },
      },
    },
    {
      id: 'project_manager',
      name: 'Project Manager',
      permissions: {
        dashboard: { view: true, edit: false, delete: false, hidden: false },
        projects: { view: true, edit: true, delete: false, hidden: false },
        customers: { view: true, edit: false, delete: false, hidden: false },
        employees: { view: true, edit: false, delete: false, hidden: false },
        timesheets: { view: true, edit: true, delete: false, hidden: false },
        proposals: { view: true, edit: false, delete: false, hidden: false },
        billing_tracker: { view: true, edit: false, delete: false, hidden: false },
        invoice_tracker: { view: true, edit: false, delete: false, hidden: false },
        settings: { view: false, edit: false, delete: false, hidden: true },
      },
    },
    {
      id: 'finance_manager',
      name: 'Finance Manager',
      permissions: {
        dashboard: { view: true, edit: false, delete: false, hidden: false },
        projects: { view: true, edit: false, delete: false, hidden: false },
        customers: { view: true, edit: true, delete: false, hidden: false },
        employees: { view: true, edit: false, delete: false, hidden: false },
        timesheets: { view: true, edit: false, delete: false, hidden: false },
        proposals: { view: true, edit: true, delete: false, hidden: false },
        billing_tracker: { view: true, edit: true, delete: false, hidden: false },
        invoice_tracker: { view: true, edit: true, delete: false, hidden: false },
        settings: { view: false, edit: false, delete: false, hidden: true },
      },
    },
    {
      id: 'account_manager',
      name: 'Account Manager',
      permissions: {
        dashboard: { view: true, edit: false, delete: false, hidden: false },
        projects: { view: true, edit: false, delete: false, hidden: false },
        customers: { view: true, edit: true, delete: false, hidden: false },
        employees: { view: true, edit: false, delete: false, hidden: false },
        timesheets: { view: false, edit: false, delete: false, hidden: true },
        proposals: { view: true, edit: true, delete: false, hidden: false },
        billing_tracker: { view: true, edit: false, delete: false, hidden: false },
        invoice_tracker: { view: true, edit: false, delete: false, hidden: false },
        settings: { view: false, edit: false, delete: false, hidden: true },
      },
    },
    {
      id: 'team_member',
      name: 'Team Member',
      permissions: {
        dashboard: { view: true, edit: false, delete: false, hidden: false },
        projects: { view: true, edit: false, delete: false, hidden: false },
        customers: { view: false, edit: false, delete: false, hidden: true },
        employees: { view: false, edit: false, delete: false, hidden: true },
        timesheets: { view: true, edit: true, delete: false, hidden: false },
        proposals: { view: false, edit: false, delete: false, hidden: true },
        billing_tracker: { view: false, edit: false, delete: false, hidden: true },
        invoice_tracker: { view: false, edit: false, delete: false, hidden: true },
        settings: { view: false, edit: false, delete: false, hidden: true },
      },
    },
  ]);

  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleRole = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const updatePermission = (
    roleId: string,
    moduleId: string,
    permission: keyof Permission,
    value: boolean
  ) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const updatedPermissions = { ...role.permissions };
        if (!updatedPermissions[moduleId]) {
          updatedPermissions[moduleId] = { ...DEFAULT_PERMISSIONS };
        }
        updatedPermissions[moduleId] = {
          ...updatedPermissions[moduleId],
          [permission]: value,
        };

        if (permission === 'hidden' && value) {
          updatedPermissions[moduleId].view = false;
          updatedPermissions[moduleId].edit = false;
          updatedPermissions[moduleId].delete = false;
        }

        if (permission === 'edit' && value && !updatedPermissions[moduleId].view) {
          updatedPermissions[moduleId].view = true;
        }

        if (permission === 'delete' && value && !updatedPermissions[moduleId].edit) {
          updatedPermissions[moduleId].view = true;
          updatedPermissions[moduleId].edit = true;
        }

        return { ...role, permissions: updatedPermissions };
      }
      return role;
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving RBAC permissions:', roles);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">Configure role-based access control for each module</p>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-3">
        {roles.map(role => {
          const isExpanded = expandedRole === role.id;
          const moduleCount = MODULES.filter(m => role.permissions[m.id]?.view).length;

          return (
            <div key={role.id} className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                onClick={() => toggleRole(role.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button className="p-1">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div>
                    <span className="text-sm font-medium text-white">{role.name}</span>
                    <p className="text-xs text-slate-400 mt-1">
                      Access to {moduleCount} of {MODULES.length} modules
                    </p>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-700">
                  <div className="overflow-x-auto">
                    <table className="w-full mt-4">
                      <thead>
                        <tr className="text-xs text-slate-400 border-b border-slate-700">
                          <th className="text-left py-2 px-3 font-medium">Module</th>
                          <th className="text-center py-2 px-3 font-medium">View</th>
                          <th className="text-center py-2 px-3 font-medium">Edit</th>
                          <th className="text-center py-2 px-3 font-medium">Delete</th>
                          <th className="text-center py-2 px-3 font-medium">Hidden</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {MODULES.map(module => {
                          const permissions = role.permissions[module.id] || DEFAULT_PERMISSIONS;
                          const isHidden = permissions.hidden;

                          return (
                            <tr key={module.id} className={`hover:bg-slate-800/30 transition-colors ${isHidden ? 'opacity-50' : ''}`}>
                              <td className="py-3 px-3 text-sm text-slate-300">{module.name}</td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={permissions.view}
                                  disabled={isHidden}
                                  onChange={(e) => updatePermission(role.id, module.id, 'view', e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={permissions.edit}
                                  disabled={isHidden}
                                  onChange={(e) => updatePermission(role.id, module.id, 'edit', e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-green-500 focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={permissions.delete}
                                  disabled={isHidden}
                                  onChange={(e) => updatePermission(role.id, module.id, 'delete', e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-red-500 focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={permissions.hidden}
                                  onChange={(e) => updatePermission(role.id, module.id, 'hidden', e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-slate-500 focus:ring-2 focus:ring-slate-500"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
