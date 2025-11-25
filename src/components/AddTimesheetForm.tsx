import React, { useState } from 'react';
import { Modal } from './Modal';

interface AddTimesheetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (timesheet: TimesheetFormData) => void;
}

export interface TimesheetFormData {
  employee: string;
  project: string;
  date: string;
  hours: number;
  description: string;
  status: string;
}

export const AddTimesheetForm: React.FC<AddTimesheetFormProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TimesheetFormData>({
    employee: '',
    project: '',
    date: new Date().toISOString().split('T')[0],
    hours: 0,
    description: '',
    status: 'Pending',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      employee: '',
      project: '',
      date: new Date().toISOString().split('T')[0],
      hours: 0,
      description: '',
      status: 'Pending',
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hours' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Timesheet Entry" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Employee *
            </label>
            <input
              type="text"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              placeholder="Enter employee name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project *
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              placeholder="Enter project name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Hours *
            </label>
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              required
              min="0"
              max="24"
              step="0.5"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="What did you work on?"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30"
          >
            Add Timesheet
          </button>
        </div>
      </form>
    </Modal>
  );
};
