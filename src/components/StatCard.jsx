export default function StatCard({ title, value, subtitle, icon: Icon, isNavy = false, badgeColor = 'text-emerald-400' }) {
  if (isNavy) {
    return (
      <div className="bg-[#152e4d] text-white p-5 rounded-xl shadow-md flex flex-col justify-between h-28 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-sky-200">
          <span className="font-medium">{title}</span>
          <div className="w-6 h-6 rounded-full bg-[#20416b] flex items-center justify-center text-sky-300">
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          <p className={`text-[10px] mt-0.5 ${badgeColor}`}>{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-28">
      <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>{title}</span>
        <Icon className="w-4 h-4 text-orange-500 fill-orange-500" />
      </div>
      <div>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">{value}</span>
        <p className={`text-[10px] mt-0.5 ${badgeColor}`}>{subtitle}</p>
      </div>
    </div>
  );
}