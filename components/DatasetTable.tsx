import React from 'react';
import { Dataset, Language } from '../types';
import { FileText } from 'lucide-react';
import { UI_LABELS } from '../constants';

interface DatasetTableProps {
  datasets: Dataset[];
  language: Language;
}

const DatasetTable: React.FC<DatasetTableProps> = ({ datasets, language }) => {
  const labels = UI_LABELS[language];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4">{labels.datasetName}</th>
              <th className="px-6 py-4">{labels.tags}</th>
              <th className="px-6 py-4">{labels.kpis}</th>
              <th className="px-6 py-4">{labels.desc}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {datasets.map((dataset, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  {dataset.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {dataset.tags?.map((tag, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-wrap gap-1">
                    {dataset.kpis?.map((kpi, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {kpi}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-sm text-slate-500 leading-relaxed">
                  {dataset.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatasetTable;