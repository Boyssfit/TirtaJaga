import React from 'react';
import { Send } from 'lucide-react';

export default function DonutWidget() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-orange-500"
                strokeDasharray="45, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-slate-800">45%</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-2">Risiko Intrusi Air Laut</p>
        </div>

        <div className="space-y-3 mt-6 text-xs border-t border-slate-100 pt-4">
          <div className="flex justify-between items-center text-slate-600">
            <span>Banjar Jimbaran Utama</span>
            <span className="font-semibold text-emerald-600">Normal</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Banjar Kedonganan</span>
            <span className="font-semibold text-amber-600">Waspada</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Kawasan Pantai Muaya</span>
            <span className="font-semibold text-emerald-600">Normal</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Sumur Konsensus Warga</span>
            <span className="font-semibold text-sky-600">Terverifikasi</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-4">
        <Send className="w-3.5 h-3.5" />
        Buat Laporan Baru
      </button>
    </div>
  );
}