import {
  Home, FileText, MessageSquare, BarChart3, Droplets,
  LogIn, LogOut, ShieldCheck, Building2, AlertTriangle, Lock,
  Upload, Award, CheckSquare, Activity
} from 'lucide-react';

export default function Sidebar({ user, onOpenLogin, onLogout, activeTab, setActiveTab, isOpen, onClose }) {
  // Config Menu Dinamis Berdasarkan Role
  const getNavItems = () => {
    if (!user || user.role === 'warga') {
      return [
        { id: 'home', label: 'Overview Warga', icon: Home },
        { id: 'aduan', label: 'Banjar Watch (Aduan)', icon: MessageSquare },
        { id: 'tracker', label: 'Pelacak Step Dinas', icon: CheckSquare },
        { id: 'transparansi', label: 'Transparansi Hotel', icon: FileText },
        { id: 'grafik', label: 'Prediksi AI Sumur', icon: BarChart3 },
      ];
    }
    if (user.role === 'pemerintah') {
      return [
        { id: 'home', label: 'Command Center', icon: Activity },
        { id: 'inbox', label: 'Inbox Aduan Warga', icon: MessageSquare },
        { id: 'anomali', label: 'Detektor Anomali IPAL', icon: AlertTriangle },
        { id: 'sanksi', label: 'Sanksi & Moratorium', icon: Lock },
        { id: 'grafik_macro', label: 'Engine AI Kawasan', icon: BarChart3 },
      ];
    }
    if (user.role === 'perusahaan') {
      return [
        { id: 'home', label: 'Overview Hotel', icon: Home },
        { id: 'upload', label: 'Upload Data Actual', icon: Upload },
        { id: 'kuota', label: 'Sisa Kuota AMDAL', icon: Activity },
        { id: 'warning', label: 'Early Warning System', icon: AlertTriangle },
        { id: 'sertifikat', label: 'Sertifikat Green Label', icon: Award },
      ];
    }
    return [];
  };

  const getRoleBadge = () => {
    if (!user) return { title: 'TAMU / WARGA', detail: 'Mode Tanpa Akun (Publik)', icon: Droplets, color: 'text-sky-400' };
    if (user.role === 'pemerintah') return { title: 'DINAS LHK BADUNG', detail: 'Command Center Tim Kab.', icon: ShieldCheck, color: 'text-amber-400' };
    if (user.role === 'perusahaan') return { title: 'CLIFF RESORT & SPA', detail: 'Kawasan Bukit Jimbaran', icon: Building2, color: 'text-emerald-400' };
    return { title: user.name, detail: user.detail, icon: Droplets, color: 'text-sky-400' };
  };

  const badge = getRoleBadge();
  const IconHeader = badge.icon;
  const navItems = getNavItems();

  return (
    <>
    {isOpen && <button type="button" aria-label="Tutup menu" onClick={onClose} className="fixed inset-0 bg-slate-950/50 z-20 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 max-h-dvh overflow-hidden bg-[#152e4d] text-white flex flex-col justify-between p-6 shadow-xl shrink-0 transition-transform duration-200 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Profile Header */}
        <div className="flex shrink-0 flex-col items-center text-center my-4">
          <div className="w-20 h-20 rounded-full bg-[#0d1f35] border-4 border-[#22446e] flex items-center justify-center shadow-md mb-3">
            <div className={`w-12 h-12 rounded-full bg-[#1e406d] flex items-center justify-center ${badge.color}`}>
              <IconHeader className="w-7 h-7" />
            </div>
          </div>
          <h1 className="font-bold text-sm tracking-wider uppercase text-white">
            {badge.title}
          </h1>
          <p className="text-[11px] text-sky-300/80 font-light mt-0.5">
            {badge.detail}
          </p>
        </div>

        {/* Login / Logout Button */}
        <div className="mb-6 shrink-0">
          {user ? (
            <button
              onClick={onLogout}
              className="w-full bg-[#0d1f35] hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 font-semibold py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Keluar Akun
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" /> Masuk Akun
            </button>
          )}
        </div>

        {/* Dynamic Navigation Items */}
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-1.5 text-slate-300">
          {navItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-xs transition ${
                  isActive ? 'bg-[#20416b] text-white font-bold shadow-sm' : 'hover:bg-[#1a375c] text-slate-300'
                }`}
              >
                <ItemIcon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-sky-300/70'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 pt-4 border-t border-[#20416b]/50 text-[10px] text-slate-400 text-center">
        AquaWatch Tirta Jaga v1.0
      </div>
    </aside>
    </>
  );
}