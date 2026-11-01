import { useState } from 'react';
import { Activity, Award, CheckCircle2, Droplets, ShieldAlert, ShieldCheck, Upload } from 'lucide-react';

function Metric({ label, value, note, icon: Icon }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between text-slate-500 text-xs"><span>{label}</span><Icon className="w-4 h-4 text-emerald-600" /></div>
      <p className="text-xl font-bold text-slate-800 mt-2">{value}</p>
      <p className="text-[10px] text-slate-400 mt-1">{note}</p>
    </div>
  );
}

function UploadForm({ values, setValues, onSubmit, submitted }) {
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2"><Upload className="w-4 h-4 text-emerald-600" /> Upload data aktual harian</h3>
      <p className="text-xs text-slate-500 mb-5">Input manual untuk demonstrasi. Data tidak tersinkron ke perangkat IoT / server.</p>
      {submitted && <div role="status" className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex gap-2"><CheckCircle2 className="w-4 h-4" /> Data tersimpan pada sesi ini.</div>}
      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4 text-xs">
        <label className="block font-medium text-slate-600">Debit sumur bor · Qin (m³/hari)
          <input type="number" min="0" step="any" value={values.qin} onChange={update('qin')} required className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
        </label>
        <label className="block font-medium text-slate-600">Debit efluen STP · Qout (m³/hari)
          <input type="number" min="0" step="any" value={values.qout} onChange={update('qout')} required className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
        </label>
        <label className="block font-medium text-slate-600">pH efluen
          <input type="number" min="0" max="14" step="0.1" value={values.ph} onChange={update('ph')} required className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
        </label>
        <label className="block font-medium text-slate-600">Kekeruhan efluen · NTU
          <input type="number" min="0" step="0.1" value={values.ntu} onChange={update('ntu')} required className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
        </label>
        <button type="submit" className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition">Simpan data harian</button>
      </form>
    </section>
  );
}

function History({ entries }) {
  if (!entries.length) return <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-lg">Belum ada data yang dikirim dari form pada sesi ini.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left min-w-[560px]">
        <thead className="bg-slate-50 text-slate-500 uppercase"><tr><th className="p-3">Waktu</th><th className="p-3">Qin</th><th className="p-3">Qout</th><th className="p-3">pH / NTU</th><th className="p-3">Status</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{entries.map((entry) => (
          <tr key={entry.id}><td className="p-3 text-slate-500">{entry.date}</td><td className="p-3">{entry.qin} m³/d</td><td className="p-3">{entry.qout} m³/d</td><td className="p-3">{entry.ph} / {entry.ntu}</td><td className={`p-3 font-semibold ${entry.warning ? 'text-amber-700' : 'text-emerald-700'}`}>{entry.warning ? 'Perlu diperiksa' : 'Terkirim'}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default function PerusahaanDashboard({ activeTab = 'home', onOpenMenu }) {
  const [values, setValues] = useState({ qin: '120', qout: '105', ph: '7.2', ntu: '2.4' });
  const [entries, setEntries] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState(3600);
  const [submitted, setSubmitted] = useState(false);
  const quota = 4500;
  const usedPercent = Math.min((monthlyUsage / quota) * 100, 100);
  const qin = Number(values.qin);
  const qout = Number(values.qout);
  const ph = Number(values.ph);
  const ntu = Number(values.ntu);
  const currentWarning = (qin > 0 && qout / qin < 0.75) || ph < 6 || ph > 9 || ntu > 5;

  const handleUpload = (event) => {
    event.preventDefault();
    const warning = (qin > 0 && qout / qin < 0.75) || ph < 6 || ph > 9 || ntu > 5;
    setEntries((current) => [{
      ...values,
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      warning,
    }, ...current]);
    setMonthlyUsage((current) => current + qin);
    setSubmitted(true);
  };

  const title = {
    home: 'Overview Hotel',
    upload: 'Upload Data Aktual',
    kuota: 'Kuota AMDAL Kawasan',
    warning: 'Early Warning System',
    sertifikat: 'Sertifikat Green Label',
  }[activeTab] || 'Overview Hotel';

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#eaf0f6] space-y-5">
      <header className="bg-[#152e4d] text-white p-5 sm:p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div><span className="text-[10px] sm:text-xs text-emerald-400 font-bold uppercase">Portal industri akomodasi</span><h2 className="text-xl font-bold mt-1">CLIFF RESORT &amp; SPA</h2><p className="text-xs text-sky-200 mt-1">{title} · Bukit Jimbaran</p></div>
        <div className="flex items-center gap-2"><div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Green Label · contoh</div><button type="button" aria-label="Menu" onClick={onOpenMenu} className="p-2 text-white hover:bg-white/10 rounded-lg lg:hidden"><Activity className="w-5 h-5" /></button></div>
      </header>

      {activeTab === 'home' && (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Metric label="Debit sumur hari ini" value={`${values.qin} m³`} note="Qin · input terakhir" icon={Droplets} />
            <Metric label="Debit efluen STP" value={`${values.qout} m³`} note="Qout · input terakhir" icon={Activity} />
            <Metric label="Penggunaan kuota" value={`${monthlyUsage.toLocaleString('id-ID')} m³`} note={`Dari ${quota.toLocaleString('id-ID')} m³/bulan`} icon={Activity} />
            <Metric label="Status neraca air" value={currentWarning ? 'Perlu cek' : 'Normal'} note="Berdasarkan ambang demonstrasi" icon={currentWarning ? ShieldAlert : ShieldCheck} />
          </div>
          <div className="grid xl:grid-cols-2 gap-5">
            <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm mb-1">Ringkasan neraca air</h3><p className="text-xs text-slate-500 mb-4">Periksa keseimbangan Qin, Qout, dan kehilangan proses.</p>
              <div className={`p-4 rounded-lg border text-xs ${currentWarning ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                {currentWarning ? 'Peringatan: rasio atau mutu efluen melewati ambang pemantauan. Periksa STP dan validasi data sebelum audit.' : 'Rasio neraca air dan parameter mutu berada dalam rentang pemantauan pada data input terakhir.'}
              </div>
            </section>
            <QuotaCard monthlyUsage={monthlyUsage} quota={quota} usedPercent={usedPercent} />
          </div>
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100"><h3 className="font-bold text-slate-800 text-sm mb-4">Riwayat data harian</h3><History entries={entries} /></section>
        </>
      )}

      {activeTab === 'upload' && (
        <div className="grid xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2"><UploadForm values={values} setValues={setValues} onSubmit={handleUpload} submitted={submitted} /></div>
          <QuotaCard monthlyUsage={monthlyUsage} quota={quota} usedPercent={usedPercent} />
          <section className="xl:col-span-3 bg-white p-5 rounded-xl shadow-sm border border-slate-100"><h3 className="font-bold text-slate-800 text-sm mb-4">Riwayat pengiriman</h3><History entries={entries} /></section>
        </div>
      )}

      {activeTab === 'kuota' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <QuotaCard monthlyUsage={monthlyUsage} quota={quota} usedPercent={usedPercent} />
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Batas pemanfaatan air</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Kuota bulanan pada halaman ini merupakan data contoh AMDAL kawasan. Gunakan data izin dan pengukuran resmi sebagai dasar operasional.</p>
            {monthlyUsage >= quota && <p className="mt-4 p-3 bg-red-50 text-red-800 text-xs rounded-lg">Kuota contoh telah tercapai. Periksa batas izin dan hubungi petugas berwenang.</p>}
          </section>
        </div>
      )}

      {activeTab === 'warning' && (
        <section className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4 text-amber-600" /> Early warning neraca air & mutu efluen</h3>
          <div role="status" className={`p-4 rounded-lg border text-xs ${currentWarning ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
            <strong>{currentWarning ? 'Perlu pemeriksaan teknisi' : 'Tidak ada anomali pada data saat ini'}</strong>
            <p className="mt-1">{currentWarning ? `Periksa rasio Qin/Qout (${qin > 0 ? (qout / qin).toFixed(2) : '—'}), pH (${values.ph}), dan kekeruhan (${values.ntu} NTU). Ambang demonstrasi: rasio <0,75, pH 6–9, dan NTU ≤5.` : 'Data input terakhir masih berada dalam ambang pemantauan simulasi. Tetap lakukan pemantauan STP rutin.'}</p>
          </div>
          <div className="mt-5"><h4 className="text-xs font-bold text-slate-700 mb-3">Kirim data pengukuran terbaru</h4><UploadForm values={values} setValues={setValues} onSubmit={handleUpload} submitted={submitted} /></div>
        </section>
      )}

      {activeTab === 'sertifikat' && (
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><Award className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-slate-800">Lencana Tri Hita Karana · Green Label</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">Lencana demonstrasi untuk menunjukkan konsep transparansi kepatuhan. Validasi dokumen dan sertifikat resmi belum terhubung di prototipe ini.</p>
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            {['Parahyangan · menjaga kesucian tirta', 'Pawongan · akuntabilitas bersama', 'Palemahan · menjaga daya dukung'].map((value) => <div key={value} className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium">{value}</div>)}
          </div>
        </section>
      )}
    </main>
  );
}

function QuotaCard({ monthlyUsage, quota, usedPercent }) {
  const remaining = Math.max(quota - monthlyUsage, 0);
  return (
    <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kuota izin AMDAL bulanan</h3>
        <p className="text-2xl font-bold text-slate-800">{monthlyUsage.toLocaleString('id-ID')} / {quota.toLocaleString('id-ID')} m³</p>
        <div className="w-full bg-slate-100 h-3 rounded-full mt-3 overflow-hidden"><div className={`h-full transition-all ${usedPercent >= 90 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${usedPercent}%` }} /></div>
        <p className="text-[11px] text-slate-400 mt-2">{monthlyUsage > quota ? `Melebihi kuota contoh ${ (monthlyUsage - quota).toLocaleString('id-ID') } m³` : `Sisa kuota contoh: ${remaining.toLocaleString('id-ID')} m³`}</p>
      </div>
      <div className={`p-3 mt-5 border rounded-xl text-[11px] ${usedPercent >= 90 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
        {usedPercent >= 90 ? 'Penggunaan mendekati batas bulanan. Periksa kuota izin resmi.' : 'Penggunaan masih berada di bawah batas kuota contoh.'}
      </div>
    </section>
  );
}
