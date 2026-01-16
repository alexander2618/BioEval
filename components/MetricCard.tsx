import React from 'react';
import { Metric, Language } from '../types';
import { Terminal, Copy } from 'lucide-react';
import { UI_LABELS } from '../constants';

interface MetricCardProps {
  metric: Metric;
  language: Language;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, language }) => {
  const labels = UI_LABELS[language];
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-slate-800">{metric.name}</h3>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
            {metric.tool}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {metric.description}
        </p>
      </div>
      <div className="bg-slate-900 p-4 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-slate-400 hover:text-white p-1" title="Copy code">
             <Copy size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs uppercase tracking-wider font-semibold">
           <Terminal size={14} />
           <span>{labels.pythonImpl}</span>
        </div>
        <pre className="text-xs md:text-sm font-mono text-emerald-400 overflow-x-auto code-scroll pb-2">
          <code>{metric.formula}</code>
        </pre>
      </div>
    </div>
  );
};

export default MetricCard;