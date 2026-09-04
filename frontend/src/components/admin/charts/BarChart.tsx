import React from 'react';

interface BarDataItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDataItem[];
  title: string;
  barColor?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  barColor = 'bg-cyan-500',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
        {title}
      </h4>

      <div className="space-y-3 pt-2">
        {data.length === 0 ? (
          <p className="text-xs text-slate-400 font-mono italic text-center py-6">No chart data available</p>
        ) : (
          data.map((item, idx) => {
            const percentage = Math.round((item.value / maxValue) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-700 truncate max-w-[200px]" title={item.label}>
                    {item.label}
                  </span>
                  <span className="text-slate-900 font-bold">{item.value}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
