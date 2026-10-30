import React from 'react';
import { Home, FileText, MessageSquare, Bell, MapPin, BarChart3, Droplets } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#152e4d] text-white flex flex-col justify-between p-6 shadow-xl z-10">
      <div>
        <div className="flex flex-col items-center text-center my-4">
          <div className="w-20 h-20 rounded-full bg-[#0d1f35] border-4 border-[#22446e] flex items-center justify-center shadow-md mb-3">
            <div className="w-12 h-12 rounded-full bg-[#1e406d] flex items-center justify-center text-sky-300">
              <Droplets className="w-7 h-7" />
            </div>
          </div>
          <h1 className="font-bold text-base tracking-wider uppercase text-white">I WAYAN WARGA</h1>
          <p className="text-xs text-sky-300/80 font-light mt-0.5">Banjar Jimbaran, Bali</p>
        </div>

        <nav className="mt-8 space-y-1.5 text-slate-300">
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[#20416b] text-white font-medium text-sm transition shadow-sm">
            <Home className="w-4 h-4 text-sky-400" />
            <span>home</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1a375c] text-slate-300 hover:text-white font-medium text-sm transition">
            <FileText className="w-4 h-4" />
            <span>laporan saya</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1a375c] text-slate-300 hover:text-white font-medium text-sm transition">
            <MessageSquare className="w-4 h-4" />
            <span>aduan banjar</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1a375c] text-slate-300 hover:text-white font-medium text-sm transition">
            <Bell className="w-4 h-4" />
            <span>notifikasi</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1a375c] text-slate-300 hover:text-white font-medium text-sm transition">
            <MapPin className="w-4 h-4" />
            <span>peta zona air</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1a375c] text-slate-300 hover:text-white font-medium text-sm transition">
            <BarChart3 className="w-4 h-4" />
            <span>grafik AI</span>
          </a>
        </nav>
      </div>

      <div className="pt-4 border-t border-[#20416b]/50 text-[11px] text-slate-400 text-center">
        AquaWatch Warga v1.0
      </div>
    </aside>
  );
}