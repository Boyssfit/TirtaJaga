import { useState } from 'react';
import {
  AlertCircle, Camera, Check, CheckCircle2, Clock, Droplets, MapPin,
  Menu, ShieldCheck, Star, TrendingUp, X
} from 'lucide-react';
import StatCard from '../components/StatCard';
import DonutWidget from '../components/DonutWidget';

const hotels = [
  { name: 'Cliff Resort Jimbaran', score: '9,2', status: 'Patuh', color: 'text-emerald-700 bg-emerald-50' },
  { name: 'Ocean Villa & Spa', score: '4,1', status: 'Perlu audit', color: 'text-red-700 bg-red-50' },
  { name: 'Bukit View Hotel', score: '8,5', status: 'Patuh', color: 'text-emerald-700 bg-emerald-50' },
];

function PageHeader({ title, description, onOpenMenu }) {
  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <button type="button" aria-label="Menu" onClick={onOpenMenu} className="p-2 text-slate-600 hover:bg-white rounded-lg lg:hidden">
        <Menu className="w-5 h-5" />
      </button>
    </header>
  );
}

function ProgressTracker({ progressSteps }) {
  return (
    <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pelacak tindak lanjut pemerintah</h3>
        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Diperbarui oleh Dinas
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
        {progressSteps.map((step, index) => (
          <div key={step.title} className={`p-3 rounded-lg border text-xs ${step.done ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Tahap {index + 1}</span>
              {step.done ? <Check className="w-4 h-4 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            <p className="font-medium text-[11px] leading-snug">{step.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrendChart({ forecast = false }) {
  const bars = forecast
    ? [38, 48, 42, 58, 51, 66, 59, 72, 64, 77, 70, 83, 75, 88]
    : [42, 68, 51, 79, 58, 43, 74, 62, 82];
  const labels = forecast
    ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    : ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGS', 'SEP'];

  return (
    <div className="h-48 flex items-end justify-between gap-1 sm:gap-2 border-b border-slate-100 px-2">
      {bars.map((height, index) => (
        <div key={labels[index]} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
          <div className="flex items-end gap-1 h-[82%] w-full justify-center">
            {!forecast && <div className="w-2 sm:w-3 rounded-t-sm bg-orange-400" style={{ height: `${height * 0.72}%` }} />}
            <div className={`w-2 sm:w-3 rounded-t-sm ${forecast ? 'bg-orange-400' : 'bg-[#152e4d]'}`} style={{ height: `${height}%` }} />
          </div>
          <span className="text-[8px] sm:text-[9px] text-slate-400">{forecast ? `H${labels[index]}` : labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function HotelTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left min-w-[500px]">
        <thead className="text-slate-500 bg-slate-50 uppercase tracking-wide">
          <tr><th className="p-3">Hotel / Akomodasi</th><th className="p-3">Skor kepatuhan</th><th className="p-3">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {hotels.map((hotel) => (
            <tr key={hotel.name}>
              <td className="p-3 font-semibold text-slate-700">{hotel.name}</td>
              <td className="p-3 text-slate-600">{hotel.score} / 10</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${hotel.color}`}>{hotel.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-slate-400 mt-3">Indeks demonstrasi berdasarkan data simulasi, bukan hasil audit resmi.</p>
    </div>
  );
}

function ReportForm({ onSubmit, onCancel }) {
  const [banjar, setBanjar] = useState('Banjar Jimbaran Utama');
  const [jenis, setJenis] = useState('Bau Limbah / H2S Menyengat');
  const [lokasi, setLokasi] = useState('');
  const [anonim, setAnonim] = useState(true);
  const [photoName, setPhotoName] = useState('');
  const [locationMessage, setLocationMessage] = useState('');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Perangkat ini tidak mendukung deteksi lokasi.');
      return;
    }
    setLocationMessage('Meminta izin lokasi perangkat…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLokasi(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
        setLocationMessage('Lokasi berhasil ditambahkan.');
      },
      () => setLocationMessage('Lokasi tidak tersedia. Anda tetap dapat mengisi lokasi secara manual.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ banjar, jenis, lokasi, anonim, photoName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block font-medium text-slate-600">
          Banjar / Desa Adat
          <select value={banjar} onChange={(event) => setBanjar(event.target.value)} className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <option>Banjar Jimbaran Utama</option><option>Banjar Kedonganan</option><option>Banjar Pemutih</option>
          </select>
        </label>
        <label className="block font-medium text-slate-600">
          Jenis indikasi
          <select value={jenis} onChange={(event) => setJenis(event.target.value)} className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <option>Bau Limbah / H2S Menyengat</option><option>Air Sumur Keruh / Berbau</option><option>Pengeboran Sumur Ilegal</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="report-location" className="block font-medium text-slate-600 mb-1">Detail lokasi atau koordinat GPS</label>
        <div className="flex gap-2">
          <input id="report-location" value={lokasi} onChange={(event) => setLokasi(event.target.value)} placeholder="Contoh: Jalan Uluwatu, dekat..." required className="min-w-0 flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
          <button type="button" onClick={detectLocation} className="px-3 py-2 rounded-lg bg-sky-50 text-sky-700 font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> GPS
          </button>
        </div>
        {locationMessage && <p role="status" className="mt-1 text-[10px] text-slate-500">{locationMessage}</p>}
      </div>
      <label className="block font-medium text-slate-600">
        Foto bukti (opsional)
        <span className="mt-1 flex items-center gap-2 p-3 border border-dashed border-slate-300 rounded-lg text-slate-500 cursor-pointer">
          <Camera className="w-4 h-4" /> {photoName || 'Pilih foto dari perangkat'}
          <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => setPhotoName(event.target.files?.[0]?.name || '')} />
        </span>
      </label>
      <label className="flex items-start gap-2 text-slate-600">
        <input type="checkbox" checked={anonim} onChange={(event) => setAnonim(event.target.checked)} className="mt-0.5 accent-orange-500" />
        <span>Kirim sebagai laporan anonim. Identitas saya tidak ditampilkan kepada publik.</span>
      </label>
      <div className="flex gap-2 pt-1">
        {onCancel && <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold">Batal</button>}
        <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg">Kirim laporan</button>
      </div>
    </form>
  );
}

export default function WargaDashboard({ user, activeTab = 'home', progressSteps, reports = [], setReports, onOpenMenu }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitReport = (report) => {
    setReports((current) => [{
      ...report,
      id: Date.now(),
      createdAt: new Date().toLocaleString('id-ID'),
      status: 'Laporan Diterima',
    }, ...current]);
    setFormSubmitted(true);
    setIsModalOpen(false);
  };

  const heading = {
    home: ['Dashboard Warga', user ? `Selamat datang, ${user.name}` : 'Akses publik · Anda dapat mengirim laporan tanpa akun'],
    aduan: ['Banjar Watch', 'Laporkan indikasi gangguan air secara aman dan transparan'],
    tracker: ['Pelacak Tindak Lanjut', 'Pantau tahapan penanganan laporan oleh pemerintah'],
    transparansi: ['Transparansi Hotel', 'Indeks kepatuhan neraca air akomodasi di Bukit Jimbaran'],
    grafik: ['Prediksi AI Kualitas Air', 'Proyeksi risiko kekeruhan hingga 14 hari ke depan · simulasi'],
  }[activeTab] || ['Dashboard Warga', 'Informasi air dan pengawasan bersama masyarakat'];

  return (
    <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#eaf0f6]">
      <PageHeader title={heading[0]} description={heading[1]} onOpenMenu={onOpenMenu} />

      {formSubmitted && (
        <div role="status" className="mb-5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Laporan tercatat dan diteruskan ke inbox Dinas (simulasi).</span>
          <button type="button" onClick={() => setFormSubmitted(false)} aria-label="Tutup notifikasi"><X className="w-4 h-4" /></button>
        </div>
      )}

      {activeTab === 'home' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Kualitas Air Sumur" value="3,2 NTU" subtitle="Jernih · ambang 5,0 NTU" icon={Droplets} isNavy badgeColor="text-emerald-300" />
            <StatCard title="Laporan Banjar Watch" value={(2434 + reports.length).toLocaleString('id-ID')} subtitle="Laporan warga terkumpul" icon={AlertCircle} badgeColor="text-slate-400" />
            <StatCard title="Tindak Lanjut Dinas" value="1.259" subtitle="85% laporan ditangani" icon={CheckCircle2} badgeColor="text-emerald-600" />
            <StatCard title="Skor Keadilan Air" value="8,5" subtitle="Indeks transparansi hotel" icon={Star} badgeColor="text-slate-400" />
          </div>
          <ProgressTracker progressSteps={progressSteps} />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <section className="xl:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4 gap-3">
                <div><h3 className="text-xs font-bold text-slate-700">Kekeruhan air & debit limbah hotel</h3><p className="text-[10px] text-slate-400 mt-1">Perbandingan bulanan · data ilustrasi</p></div>
                <button type="button" onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-semibold px-3 py-2 rounded-lg">Buat laporan</button>
              </div>
              <TrendChart />
              <div className="flex gap-4 mt-3 text-[10px] text-slate-500"><span className="flex gap-1.5 items-center"><i className="w-2 h-2 rounded-sm bg-orange-400" /> Kekeruhan (NTU)</span><span className="flex gap-1.5 items-center"><i className="w-2 h-2 rounded-sm bg-[#152e4d]" /> Debit limbah</span></div>
            </section>
            <DonutWidget onOpenModal={() => setIsModalOpen(true)} />
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 mb-4">Perkiraan kekeruhan 14 hari</h3>
              <TrendChart forecast />
              <p className="text-[10px] text-slate-400 mt-3">Prediksi AI akan menjadi actionable saat terhubung ke sensor dan model SVR + LSTM.</p>
            </section>
            <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4"><ShieldCheck className="w-4 h-4 text-emerald-600" /><h3 className="text-xs font-bold text-slate-700">Indeks kepatuhan akomodasi</h3></div>
              <HotelTable />
            </section>
          </div>
        </div>
      )}

      {activeTab === 'aduan' && (
        <div className="grid xl:grid-cols-2 gap-5">
          <section className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-1">Form laporan Banjar Watch</h3>
            <p className="text-xs text-slate-500 mb-5">Bagikan lokasi, indikasi, dan bukti bila tersedia. Akun tidak diperlukan.</p>
            <ReportForm onSubmit={submitReport} />
          </section>
          <section className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Laporan terkirim dari sesi ini</h3>
            <ReportList reports={reports} />
          </section>
        </div>
      )}

      {activeTab === 'tracker' && <ProgressTracker progressSteps={progressSteps} />}
      {activeTab === 'transparansi' && (
        <section className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4"><ShieldCheck className="w-4 h-4 text-emerald-600" /><h3 className="font-bold text-slate-800">Indeks transparansi air hotel</h3></div>
          <HotelTable />
        </section>
      )}
      {activeTab === 'grafik' && (
        <div className="space-y-5">
          <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-1"><TrendingUp className="w-4 h-4 text-orange-500" /><h3 className="font-bold text-slate-800">Forecast kekeruhan · 14 hari</h3></div>
            <p className="text-xs text-slate-500 mb-5">Nilai proyeksi berikut adalah data simulasi untuk demonstrasi UI.</p>
            <TrendChart forecast />
          </section>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">Prediksi ini belum menerima telemetri sensor. Keputusan keselamatan air tetap perlu didasarkan pada pengukuran lapangan terverifikasi.</div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative">
            <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Tutup form" className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 mb-1"><AlertCircle className="w-5 h-5 text-orange-500" /><h3 className="font-bold text-slate-800">Buat laporan Banjar Watch</h3></div>
            <p className="text-xs text-slate-500 mb-5">Laporan dapat dikirim secara anonim.</p>
            <ReportForm onSubmit={submitReport} onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

function ReportList({ reports }) {
  if (!reports.length) return <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-lg">Belum ada laporan baru pada sesi ini.</p>;
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <article key={report.id} className="p-3 border border-slate-100 rounded-lg">
          <div className="flex justify-between gap-2"><h4 className="text-xs font-bold text-slate-700">{report.jenis}</h4><span className="text-[10px] text-emerald-700">{report.status}</span></div>
          <p className="text-[11px] text-slate-500 mt-1">{report.banjar} · {report.lokasi}</p>
          <p className="text-[10px] text-slate-400 mt-1">{report.anonim ? 'Anonim' : 'Identitas disertakan'} · {report.createdAt}{report.photoName ? ` · ${report.photoName}` : ''}</p>
        </article>
      ))}
    </div>
  );
}
