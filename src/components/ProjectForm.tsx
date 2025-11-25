import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectFormData) => void;
  mode?: 'add' | 'view' | 'edit';
  initialData?: Partial<ProjectFormData>;
}

export interface ProjectFormData {
  name: string;
  project_owner: string;
  customer_manager: string;
  project_status: string;
  billing_type: string;
  start_date: string;
  end_date: string;
  primary_contact: string;
  department: string;
  project_type: string;
  currency_type: string;
  customer_id: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  isOpen,
  onClose,
  onSave,
  mode = 'add',
  initialData,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    project_owner: '',
    customer_manager: '',
    project_status: 'Active',
    billing_type: 'T&M',
    start_date: '',
    end_date: '',
    primary_contact: '',
    department: '',
    project_type: 'Development',
    currency_type: 'USD',
    customer_id: '',
  });

  const isReadOnly = mode === 'view';

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReadOnly) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : 'View'} Project`} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Owner *
            </label>
            <input
              type="text"
              name="project_owner"
              value={formData.project_owner}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Customer Manager *
            </label>
            <input
              type="text"
              name="customer_manager"
              value={formData.customer_manager}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status *
            </label>
            <select
              name="project_status"
              value={formData.project_status}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Billing Type *
            </label>
            <select
              name="billing_type"
              value={formData.billing_type}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            >
              <option value="T&M">T&M (Time & Materials)</option>
              <option value="Fixed">Fixed Price</option>
              <option value="Retainer">Retainer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Primary Contact
            </label>
            <input
              type="text"
              name="primary_contact"
              value={formData.primary_contact}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Type *
            </label>
            <select
              name="project_type"
              value={formData.project_type}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            >
              <option value="Development">Development</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Consulting">Consulting</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Currency *
            </label>
            <select
              name="currency_type"
              value={formData.currency_type}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            {isReadOnly ? 'Close' : 'Cancel'}
          </button>
          {!isReadOnly && (
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30"
            >
              {mode === 'add' ? 'Add Project' : 'Save Changes'}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};
