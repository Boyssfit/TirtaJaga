import { useState } from 'react';
import { X, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'warga@gmail.com' && password === 'warga123') {
      onLoginSuccess({ email, role: 'warga', name: 'I Wayan Warga', detail: 'Banjar Jimbaran, Bali' });
      onClose();
    } else if (email === 'pemerintah@gmail.com' && password === 'pemerintah123') {
      onLoginSuccess({ email, role: 'pemerintah', name: 'DINAS LHK BADUNG', detail: 'Command Center Tim Kab.' });
      onClose();
    } else if (email === 'perusahaan@gmail.com' && password === 'perusahaan123') {
      onLoginSuccess({ email, role: 'perusahaan', name: 'CLIFF RESORT & SPA', detail: 'Kawasan Bukit Jimbaran' });
      onClose();
    } else {
      setError('Email atau password salah! Silakan periksa kredensial contoh.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#152e4d] text-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#20416b] relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <h3 className="text-lg font-bold tracking-wide">Masuk Akun AquaWatch</h3>
          <p className="text-xs text-sky-200/80 mt-1">Pilih peran akun sesuai kredensial</p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-500/20 border border-red-500/50 text-red-200 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label htmlFor="login-email" className="block text-slate-300 font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                id="login-email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 pl-8 bg-[#0d1f35] border border-[#20416b] rounded-xl text-white outline-none focus:border-sky-400"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 pl-8 bg-[#0d1f35] border border-[#20416b] rounded-xl text-white outline-none focus:border-sky-400"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition mt-4 shadow-md"
          >
            Masuk Akun
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#20416b] text-[10px] text-slate-300 space-y-1">
          <p className="font-semibold text-sky-300">Contoh Akun Demo:</p>
          <p>• Warga: <code className="text-white">warga@gmail.com</code> / <code className="text-white">warga123</code></p>
          <p>• Pemerintah: <code className="text-white">pemerintah@gmail.com</code> / <code className="text-white">pemerintah123</code></p>
          <p>• Perusahaan: <code className="text-white">perusahaan@gmail.com</code> / <code className="text-white">perusahaan123</code></p>
        </div>
      </div>
    </div>
  );
}