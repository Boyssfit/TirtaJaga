import { useState } from 'react';
import {
  Activity, AlertTriangle, CheckSquare, Clock3, FileText, LockKeyhole,
  ShieldAlert, TrendingUp
} from 'lucide-react';

const anomalyRows = [
  { name: 'Cliff Resort Jimbaran', qin: 120, qout: 105 },
  { name: 'Ocean Villa & Spa', qin: 310, qout: 12 },
  { name: 'Bukit View Hotel', qin: 95, qout: 82 },
];

const statusStyles = {
  Aman: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Waspada: 'bg-amber-100 text-amber-800 border-amber-200',
  Kritis: 'bg-red-100 text-red-800 border-red-200',
};

function Metric({ label, value, note, icon: Icon }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between text-slate-500 text-xs"><span>{label}</span><Icon className="w-4 h-4 text-orange-500" /></div>
      <p className="text-xl font-bold text-slate-800 mt-2">{value}</p>
      <p className="text-[10px] text-slate-400 mt-1">{note}</p>
    </div>
  );
}

function StepEditor({ progressSteps, setProgressSteps }) {
  const toggleStep = (index) => {
    setProgressSteps((current) => current.map((step, stepIndex) => (
      stepIndex === index ? { ...step, done: !step.done } : step
    )));
  };
  return (
    <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-amber-500" /> Update step kinerja · terlihat oleh warga</h3>
      <div className="space-y-2">
        {progressSteps.map((step, index) => (
          <label key={step.title} className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
            <span className="flex items-center gap-3 text-xs font-semibold text-slate-700">
              <input type="checkbox" checked={step.done} onChange={() => toggleStep(index)} className="w-4 h-4 accent-emerald-600" />
              Tahap {index + 1}: {step.title}
            </span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${step.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{step.done ? 'Selesai' : 'Pending'}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function AnomalyTable({ sanctions, onIssue }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left min-w-[650px]">
        <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
          <tr><th className="p-3">Hotel / Industri</th><th className="p-3">Qin · sumur</th><th className="p-3">Qout · STP</th><th className="p-3">Status neraca</th><th className="p-3">Aksi pengawasan</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {anomalyRows.map((row) => {
            const flagged = row.qin > 200 && row.qout / row.qin < 0.1;
            return (
              <tr key={row.name} className={flagged ? 'bg-red-50/60' : ''}>
                <td className={`p-3 font-semibold ${flagged ? 'text-red-900' : 'text-slate-700'}`}>{row.name}</td>
                <td className="p-3">{row.qin} m³/hari</td><td className="p-3">{row.qout} m³/hari</td>
                <td className={`p-3 font-semibold ${flagged ? 'text-red-700' : 'text-emerald-700'}`}>{flagged ? 'Zero-meter · audit' : 'Dalam batas pantau'}</td>
                <td className="p-3">
                  {flagged ? (
                    sanctions[row.name] ? <span className="text-amber-700 font-semibold">{sanctions[row.name]}</span> :
                    <button type="button" onClick={() => onIssue(row.name, 'SP-1')} className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 rounded font-semibold text-[10px]">Terbitkan SP-1</button>
                  ) : <span className="text-slate-400">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-[10px] text-slate-400 mt-3">Nilai Qin/Qout dan red-flag pada tampilan ini adalah data demonstrasi, bukan hasil sensor langsung.</p>
    </div>
  );
}

function ForecastChart() {
  const points = [80, 74, 77, 65, 69, 58, 61, 52, 48, 51, 40, 43, 35, 29];
  return (
    <div className="h-52 flex items-end gap-1 border-b border-slate-100">
      {points.map((height, index) => (
        <div key={index} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
          <div className="w-full max-w-5 rounded-t bg-[#152e4d]" style={{ height: `${height}%` }} />
          <span className="text-[9px] text-slate-400">H{index + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default function PemerintahDashboard({ activeTab = 'home', progressSteps, setProgressSteps, reports = [], onOpenMenu }) {
  const [status, setStatus] = useState('Waspada');
  const [sanctions, setSanctions] = useState({});
  const safeYield = 10000;
  const currentExtraction = 8420;
  const remainingPercent = ((safeYield - currentExtraction) / safeYield) * 100;
  const moratorium = remainingPercent < 15;
  const title = {
    home: 'Command Center Dinas LHK Badung',
    inbox: 'Inbox Aduan Warga',
    anomali: 'Detektor Anomali IPAL',
    sanksi: 'Sanksi & Moratorium',
    grafik_macro: 'Engine AI Kawasan',
  }[activeTab] || 'Command Center Dinas LHK Badung';

  const issueSanction = (name, level) => setSanctions((current) => ({ ...current, [name]: `${level} diterbitkan · simulasi` }));

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#eaf0f6] space-y-5">
      <header className="bg-[#152e4d] text-white p-5 sm:p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase">TIRTA JAGA · Pengawasan kawasan Bukit Jimbaran</span>
          <h2 className="text-xl font-bold mt-1">{title}</h2>
          <p className="text-xs text-sky-200 mt-1">Pengelolaan laporan, safe yield, dan tindak lanjut lintas pihak</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#0d1f35] px-4 py-3 rounded-xl text-right border border-[#20416b]">
            <span className="text-[10px] text-slate-400">Ekstraksi / safe yield kawasan</span>
            <p className="text-sm font-bold text-amber-400">{currentExtraction.toLocaleString('id-ID')} / {safeYield.toLocaleString('id-ID')} m³/hari</p>
          </div>
          <button type="button" aria-label="Menu" onClick={onOpenMenu} className="p-2 text-white hover:bg-white/10 rounded-lg lg:hidden"><Activity className="w-5 h-5" /></button>
        </div>
      </header>

      {activeTab === 'home' && (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Metric label="Safe yield terpakai" value="84,2%" note="Sisa 1.580 m³/hari" icon={Activity} />
            <Metric label="Status kawasan" value={status} note="Dapat diperbarui petugas" icon={AlertTriangle} />
            <Metric label="Aduan baru" value={reports.length} note="Diterima pada sesi ini" icon={FileText} />
            <Metric label="Moratorium sumur" value={moratorium ? 'Aktif' : 'Belum aktif'} note="Trigger saat sisa safe yield <15%" icon={LockKeyhole} />
          </div>
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div><h3 className="text-sm font-bold text-slate-800">Status krisis & trigger SOP adaptif</h3><p className="text-xs text-slate-500 mt-1">Ubah status untuk menampilkan arahan tindakan.</p></div>
              <div className="flex gap-2">
                {['Aman', 'Waspada', 'Kritis'].map((value) => <button key={value} type="button" onClick={() => setStatus(value)} aria-pressed={status === value} className={`px-3 py-2 rounded-lg border text-xs font-semibold ${status === value ? statusStyles[value] : 'border-slate-200 text-slate-500'}`}>{value}</button>)}
              </div>
            </div>
            <div role="status" className={`mt-4 p-4 rounded-lg border text-xs ${statusStyles[status]}`}>
              <strong>Instruksi SOP · {status}:</strong>{' '}
              {status === 'Aman' ? 'Lanjutkan pemantauan rutin dan verifikasi kualitas air berkala.' :
                status === 'Waspada' ? 'Perketat pemantauan sumur dan STP, validasi data harian, serta siapkan distribusi air tangki.' :
                  'Koordinasikan pembatasan debit pompa hingga 30%, kirim armada tangki darurat, dan lakukan inspeksi lapangan segera.'}
            </div>
          </section>
          <StepEditor progressSteps={progressSteps} setProgressSteps={setProgressSteps} />
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-blue-600" /> Monitoring neraca air & red-flag</h3>
            <AnomalyTable sanctions={sanctions} onIssue={issueSanction} />
          </section>
        </>
      )}

      {activeTab === 'inbox' && (
        <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Aduan Banjar Watch</h3>
          {reports.length ? <div className="space-y-3">{reports.map((report) => (
            <article key={report.id} className="p-4 border border-slate-100 rounded-lg">
              <div className="flex flex-wrap justify-between gap-2"><h4 className="text-sm font-semibold text-slate-800">{report.jenis}</h4><span className="text-[10px] bg-amber-50 text-amber-700 rounded-full px-2 py-1">{report.status}</span></div>
              <p className="text-xs text-slate-500 mt-1">{report.banjar} · {report.lokasi}</p>
              <p className="text-[10px] text-slate-400 mt-2">{report.anonim ? 'Pelapor anonim' : 'Identitas disertakan'} · {report.createdAt}{report.photoName ? ` · Bukti: ${report.photoName}` : ''}</p>
            </article>
          ))}</div> : <div className="p-6 text-center bg-slate-50 rounded-lg"><Clock3 className="w-5 h-5 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-500">Belum ada aduan baru. Laporan yang dikirim dari Banjar Watch akan tampil di sini.</p></div>}
        </section>
      )}

      {activeTab === 'anomali' && (
        <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4 text-red-500" /> Deteksi zero-meter / indikasi bypass</h3>
          <AnomalyTable sanctions={sanctions} onIssue={issueSanction} />
        </section>
      )}

      {activeTab === 'sanksi' && (
        <div className="space-y-5">
          <section className={`p-5 rounded-xl border ${moratorium ? 'bg-red-50 border-red-200 text-red-900' : 'bg-white border-slate-100 text-slate-700'}`}>
            <div className="flex gap-3 items-start"><LockKeyhole className={`w-5 h-5 ${moratorium ? 'text-red-600' : 'text-emerald-600'}`} /><div><h3 className="font-bold text-sm">Moratorium perizinan sumur baru · {moratorium ? 'Aktif' : 'Belum aktif'}</h3><p className="text-xs mt-1">Sistem mengunci izin baru otomatis ketika sisa safe yield kawasan di bawah 15%. Sisa saat ini {remainingPercent.toFixed(1)}%.</p></div></div>
          </section>
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Panel surat peringatan digital (simulasi)</h3>
            <AnomalyTable sanctions={sanctions} onIssue={issueSanction} />
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => issueSanction('Ocean Villa & Spa', 'SP-1')} className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold">Terbitkan SP-1</button>
              <button type="button" onClick={() => issueSanction('Ocean Villa & Spa', 'SP-2')} className="px-3 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold">Terbitkan SP-2</button>
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Aksi hanya mengubah status demonstrasi pada dashboard ini; belum menandatangani atau mengirim surat resmi.</p>
          </section>
        </div>
      )}

      {activeTab === 'grafik_macro' && (
        <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-1"><TrendingUp className="w-4 h-4 text-orange-500" /><h3 className="font-bold text-slate-800">Forecast makro kawasan · 14 hari</h3></div>
          <p className="text-xs text-slate-500 mb-5">Indikator proyeksi akuifer · ilustrasi data, menunggu integrasi model SVR + LSTM.</p>
          <ForecastChart />
          <div className="flex justify-between mt-3 text-[10px] text-slate-400"><span>Hari ini</span><span>14 hari ke depan</span></div>
          <p className="text-xs text-slate-500 mt-5 p-3 bg-amber-50 rounded-lg">Validasi data sensor dan penilaian petugas tetap diperlukan sebelum prediksi dipakai untuk keputusan operasional.</p>
        </section>
      )}

      {!['home', 'inbox', 'anomali', 'sanksi', 'grafik_macro'].includes(activeTab) && (
        <div className="bg-white p-5 rounded-xl text-sm text-slate-600">Pilih menu Command Center untuk melihat ringkasan pengawasan.</div>
      )}
    </main>
  );
}
