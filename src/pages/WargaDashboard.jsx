import React from 'react';
import { Menu, Droplets, AlertCircle, CheckCircle2, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import DonutWidget from '../components/DonutWidget';

export default function WargaDashboard() {
  return (
    <div className="flex h-screen bg-[#eaf0f6] text-slate-700 font-sans selection:bg-orange-500 selection:text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 flex flex-col justify-between">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-wide">Dashboard Warga</h2>
          <button className="p-2 text-slate-600 hover:text-slate-900 rounded-lg transition">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="grid grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Kualitas Air Sumur"
            value="3,2 NTU"
            subtitle="✓ Jernih & Safe (Ambang 5.0)"
            icon={Droplets}
            isNavy={true}
            badgeColor="text-emerald-400"
          />
          <StatCard
            title="Laporan Masuk"
            value="2434"
            subtitle="Total Pengaduan Banjar"
            icon={AlertCircle}
            badgeColor="text-slate-400"
          />
          <StatCard
            title="Tindak Lanjut Dinas"
            value="1259"
            subtitle="85% Selesai Ditangani"
            icon={CheckCircle2}
            badgeColor="text-emerald-600"
          />
          <StatCard
            title="Skor Keadilan Air"
            value="8,5"
            subtitle="Indeks Transparansi Hotel"
            icon={Star}
            badgeColor="text-slate-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          <div className="col-span-2 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-600">Histori Kekeruhan Air vs Debit Limbah Hotel</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-medium px-4 py-1.5 rounded-lg transition shadow-sm">
                  Cek Status
                </button>
              </div>

              <div className="h-32 flex items-end justify-between gap-2 px-4 pt-4 border-b border-slate-100">
                {[
                  { m: 'JAN', h1: 'h-12 bg-orange-400', h2: 'h-16 bg-[#152e4d]' },
                  { m: 'FEB', h1: 'h-16 bg-orange-400', h2: 'h-20 bg-[#152e4d]' },
                  { m: 'MAR', h1: 'h-10 bg-orange-400', h2: 'h-14 bg-[#152e4d]' },
                  { m: 'APR', h1: 'h-14 bg-orange-400', h2: 'h-10 bg-[#152e4d]' },
                  { m: 'MAY', h1: 'h-18 bg-orange-400', h2: 'h-16 bg-[#152e4d]' },
                  { m: 'JUNE', h1: 'h-12 bg-orange-400', h2: 'h-24 bg-[#152e4d]' },
                  { m: 'JULY', h1: 'h-20 bg-orange-400', h2: 'h-12 bg-[#152e4d]' },
                  { m: 'AUG', h1: 'h-14 bg-orange-400', h2: 'h-10 bg-[#152e4d]' },
                  { m: 'SEP', h1: 'h-16 bg-orange-400', h2: 'h-18 bg-[#152e4d]' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full">
                    <div className="flex items-end gap-1 w-full justify-center h-24">
                      <div className={`w-2.5 ${item.h1} rounded-t-sm`} />
                      <div className={`w-2.5 ${item.h2} rounded-t-sm`} />
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium mt-1">{item.m}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 text-[10px] text-slate-500 mt-2">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-orange-400 rounded-sm" /> Kekeruhan Sumur Warga</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#152e4d] rounded-sm" /> Sedot Air Hotel</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-orange-500 font-medium">
                    <div className="w-2 h-2 rounded-full bg-orange-500" /> Prediksi AI (SVR)
                  </span>
                  <span className="flex items-center gap-1.5 text-[#152e4d] font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#152e4d]" /> Model LSTM
                  </span>
                </div>
              </div>

              <div className="h-24 bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Proyeksi Risiko Kekeruhan 14 Hari Ke Depan (Safe Zone)</p>
              </div>
            </div>
          </div>

          <DonutWidget />
        </div>
      </main>
    </div>
  );
}