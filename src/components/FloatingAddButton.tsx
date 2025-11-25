import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, Receipt, FileCheck } from 'lucide-react';

interface FloatingAddButtonProps {
  onAddProposal: () => void;
  onAddPO: () => void;
  onAddInvoice: () => void;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onAddProposal,
  onAddPO,
  onAddInvoice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden min-w-[200px] animate-in slide-in-from-bottom-2">
          <button
            onClick={() => handleAction(onAddProposal)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">New Proposal</div>
              <div className="text-xs text-slate-400">Create proposal</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(onAddPO)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left border-t border-slate-700"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">New PO</div>
              <div className="text-xs text-slate-400">Create purchase order</div>
            </div>
          </button>

          <button
            onClick={() => handleAction(onAddInvoice)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left border-t border-slate-700"
          >
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">New Invoice</div>
              <div className="text-xs text-slate-400">Create invoice</div>
            </div>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center group ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <Plus className="w-8 h-8 transition-transform" />
      </button>
    </div>
  );
};
