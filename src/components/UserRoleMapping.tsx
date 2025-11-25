import React, { useState } from 'react';
import { Search, Edit2, Save, X, UserCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  department: string;
  joinedDate: string;
}

const ROLES = [
  { id: 'admin', name: 'Admin' },
  { id: 'delivery_manager', name: 'Delivery Manager' },
  { id: 'project_manager', name: 'Project Manager' },
  { id: 'finance_manager', name: 'Finance Manager' },
  { id: 'account_manager', name: 'Account Manager' },
  { id: 'team_member', name: 'Team Member' },
];

export const UserRoleMapping: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      currentRole: 'project_manager',
      department: 'Engineering',
      joinedDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      currentRole: 'delivery_manager',
      department: 'Delivery',
      joinedDate: '2022-08-20',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      currentRole: 'finance_manager',
      department: 'Finance',
      joinedDate: '2023-03-10',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      currentRole: 'project_manager',
      department: 'Engineering',
      joinedDate: '2023-05-12',
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      currentRole: 'team_member',
      department: 'Engineering',
      joinedDate: '2023-09-01',
    },
    {
      id: '6',
      name: 'Robert Brown',
      email: 'robert.brown@company.com',
      currentRole: 'account_manager',
      department: 'Sales',
      joinedDate: '2022-11-15',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditingRole(user.currentRole);
  };

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map(user =>
        user.id === editingId
          ? { ...user, currentRole: editingRole }
          : user
      ));
      setEditingId(null);
      setEditingRole('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingRole('');
  };

  const getRoleName = (roleId: string) => {
    return ROLES.find(r => r.id === roleId)?.name || roleId;
  };

  const getRoleColor = (roleId: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-500/20 text-red-400 border-red-500/30',
      delivery_manager: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      project_manager: 'bg-green-500/20 text-green-400 border-green-500/30',
      finance_manager: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      account_manager: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      team_member: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colors[roleId] || colors.team_member;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.currentRole === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleStats = ROLES.map(role => ({
    ...role,
    count: users.filter(u => u.currentRole === role.id).length,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or department..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Roles</option>
          {ROLES.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {roleStats.map(role => (
          <div key={role.id} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
            <div className="text-xs text-slate-400 mb-1">{role.name}</div>
            <div className="text-2xl font-bold text-white">{role.count}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Current Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Joined Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{user.department}</td>
                    <td className="px-4 py-3">
                      {editingId === user.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={editingRole}
                            onChange={(e) => setEditingRole(e.target.value)}
                            className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                          >
                            {ROLES.map(role => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.currentRole)}`}>
                          {getRoleName(user.currentRole)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{user.joinedDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {editingId === user.id ? (
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
                        ) : (
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                            title="Edit Role"
                          >
                            <Edit2 className="w-4 h-4 text-blue-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          Showing {filteredUsers.length} of {users.length} employees
        </div>
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          <span>Total: {users.length} users across {ROLES.length} roles</span>
        </div>
      </div>
    </div>
  );
};
