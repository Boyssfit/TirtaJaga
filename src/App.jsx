import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';
import WargaDashboard from './pages/WargaDashboard';
import PemerintahDashboard from './pages/PemerintahDashboard';
import PerusahaanDashboard from './pages/PerusahaanDashboard';

export default function App() {
  const [user, setUser] = useState(null); // null = Tamu / Public
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [reports, setReports] = useState([]);

  // Shared Progress Steps Kinerja (Sync antara Pemkab & Warga)
  const [progressSteps, setProgressSteps] = useState([
    { title: 'Laporan Diterima System', done: true },
    { title: 'Verifikasi GPS & Foto Banjar Watch', done: true },
    { title: 'Inspeksi Lapangan Dinas LHK', done: true },
    { title: 'Audit Neraca Air STP Hotel', done: false },
    { title: 'Penerbitan Sanksi / SP-1', done: false }
  ]);

  return (
    <div className="flex h-dvh min-h-0 bg-[#eaf0f6] text-slate-700 font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      <Sidebar
        user={user}
        onOpenLogin={() => {
          setIsSidebarOpen(false);
          setIsLoginOpen(true);
        }}
        onLogout={() => {
          setUser(null);
          setActiveTab('home');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Render Dashboard Sesuai User Role */}
      {(!user || user.role === 'warga') && (
        <WargaDashboard
          user={user}
          activeTab={activeTab}
          progressSteps={progressSteps}
          reports={reports}
          setReports={setReports}
          onOpenMenu={() => setIsSidebarOpen(true)}
        />
      )}
      {user?.role === 'pemerintah' && (
        <PemerintahDashboard
          activeTab={activeTab}
          progressSteps={progressSteps}
          setProgressSteps={setProgressSteps}
          reports={reports}
          onOpenMenu={() => setIsSidebarOpen(true)}
        />
      )}
      {user?.role === 'perusahaan' && (
        <PerusahaanDashboard activeTab={activeTab} onOpenMenu={() => setIsSidebarOpen(true)} />
      )}

      {/* Modal Auth */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setActiveTab('home');
        }}
      />
    </div>
  );
}