import React from 'react';

interface DonutItem {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutItem[];
  title: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
        {/* Simple Progress Ring Representation */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {total > 0 &&
              data.map((item, idx) => {
                const strokeDasharray = `${(item.value / total) * 100} 100`;
                let cumulativeOffset = 0;
                for (let i = 0; i < idx; i++) {
                  cumulativeOffset += (data[i].value / total) * 100;
                }
                return (
                  <path
                    key={idx}
                    stroke={item.color}
                    strokeWidth="4"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-cumulativeOffset}
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                );
              })}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-mono font-bold text-slate-900">{total}</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 w-full">
          {data.map((item, idx) => {
            const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={idx} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700">{item.label}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {item.value} <span className="text-slate-400 font-normal">({pct}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
