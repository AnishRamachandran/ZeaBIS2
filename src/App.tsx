import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Employees } from './pages/Employees';
import { Customers } from './pages/Customers';
import { ProposalsPage } from './pages/ProposalsPage';
import { POsPage } from './pages/POsPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { Timesheets } from './pages/Timesheets';
import { BillingTracker } from './pages/BillingTracker';
import { InvoiceTracker } from './pages/InvoiceTracker';
import { Settings } from './pages/Settings';
import { FloatingAddButton } from './components/FloatingAddButton';
import { AddProposalForm, ProposalFormData } from './components/AddProposalForm';
import { AddPOForm, POFormData } from './components/AddPOForm';
import { AddInvoiceForm, InvoiceFormData } from './components/AddInvoiceForm';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAddProposal, setShowAddProposal] = useState(false);
  const [showAddPO, setShowAddPO] = useState(false);
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400">Loading ZeaBIS...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'employees':
        return <Employees />;
      case 'customers':
        return <Customers />;
      case 'proposals':
        return <ProposalsPage />;
      case 'pos':
        return <POsPage />;
      case 'invoices-page':
        return <InvoicesPage />;
      case 'timesheets':
        return <Timesheets />;
      case 'billing':
        return <BillingTracker />;
      case 'invoices':
        return <InvoiceTracker />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>

      <FloatingAddButton
        onAddProposal={() => setShowAddProposal(true)}
        onAddPO={() => setShowAddPO(true)}
        onAddInvoice={() => setShowAddInvoice(true)}
      />

      <AddProposalForm
        isOpen={showAddProposal}
        onClose={() => setShowAddProposal(false)}
        onSave={(proposal: ProposalFormData) => {
          console.log('New proposal:', proposal);
          setShowAddProposal(false);
        }}
      />

      <AddPOForm
        isOpen={showAddPO}
        onClose={() => setShowAddPO(false)}
        onSave={(po: POFormData) => {
          console.log('New PO:', po);
          setShowAddPO(false);
        }}
      />

      <AddInvoiceForm
        isOpen={showAddInvoice}
        onClose={() => setShowAddInvoice(false)}
        onSave={(invoice: InvoiceFormData) => {
          console.log('New invoice:', invoice);
          setShowAddInvoice(false);
        }}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
