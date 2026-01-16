import React from 'react';
import { ModuleData, ModuleType, Language } from '../types';
import MetricCard from './MetricCard';
import DatasetTable from './DatasetTable';
import { UI_LABELS } from '../constants';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Download } from 'lucide-react';

interface ModuleViewProps {
  data: ModuleData;
  language: Language;
}

// Dummy data for visualization if not provided
const dummyPerformanceData = [
  { name: 'v0.1', score: 45 },
  { name: 'v0.2', score: 58 },
  { name: 'v0.3', score: 72 },
  { name: 'v1.0 (Target)', score: 85 },
];

const ModuleView: React.FC<ModuleViewProps> = ({ data, language }) => {
  const isOverview = data.id === ModuleType.OVERVIEW;
  const labels = UI_LABELS[language];

  const handleExport = () => {
    const csvContent = [];
    
    // Header
    csvContent.push(`Module,${data.title}`);
    csvContent.push(`Summary,"${data.summary.replace(/"/g, '""')}"`);
    csvContent.push(''); 
    
    // Metrics
    if (data.metrics.length > 0) {
      csvContent.push('METRICS');
      csvContent.push('Name,Description,Tool,Formula');
      data.metrics.forEach(m => {
         const formula = m.formula.replace(/"/g, '""').replace(/(\r\n|\n|\r)/gm, ' '); 
         const desc = m.description.replace(/"/g, '""');
         csvContent.push(`"${m.name}","${desc}","${m.tool || ''}","${formula}"`);
      });
      csvContent.push('');
    }
    
    // Datasets
    if (data.datasets.length > 0) {
      csvContent.push('DATASETS');
      csvContent.push('Name,Tags,KPIs,Description');
      data.datasets.forEach(d => {
         const tags = d.tags ? d.tags.join('; ') : '';
         const kpis = d.kpis ? d.kpis.join('; ') : '';
         const desc = d.description.replace(/"/g, '""');
         csvContent.push(`"${d.name}","${tags}","${kpis}","${desc}"`);
      });
    }

    // Overview specific export
    if (isOverview && data.radarData) {
       csvContent.push('OVERVIEW DATA');
       csvContent.push('Dimension,Bio-Agent Score,Baseline Score');
       data.radarData.forEach(item => {
          csvContent.push(`"${item.subject}",${item.A},${item.B}`);
       });
    }

    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.title.replace(/\s+/g, '_')}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                {React.cloneElement(data.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
              </div>
              <h1 className="text-3xl font-bold">{data.title}</h1>
            </div>
            <p className="text-indigo-100 text-lg max-w-3xl leading-relaxed">
              {data.summary}
            </p>
          </div>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={18} />
            <span>{labels.exportReport}</span>
          </button>
        </div>
      </div>

      {isOverview && data.radarData ? (
        <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{labels.holisticTitle}</h2>
            <p className="text-sm text-slate-500">{labels.holisticDesc}</p>
          </div>
          <div className="h-96 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={labels.bioAgent}
                  dataKey="A"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
                <Radar
                  name={labels.baseline}
                  dataKey="B"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <Legend iconType="circle" />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   itemStyle={{ color: '#1e293b' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
             {data.radarData.map((item, idx) => (
               <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                 <div className="text-xs text-slate-500 uppercase font-semibold mb-1">{item.subject}</div>
                 <div className="text-2xl font-bold text-indigo-600">{item.A}</div>
                 <div className="text-xs text-slate-400 mt-1">{labels.baseline}: {item.B}</div>
               </div>
             ))}
          </div>
        </section>
      ) : (
        <>
          {/* Metrics Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{labels.metricsTitle}</h2>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {labels.standardFormulas}
              </span>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {data.metrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} language={language} />
              ))}
            </div>
          </section>

          {/* Datasets Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{labels.datasetsTitle}</h2>
            <DatasetTable datasets={data.datasets} language={language} />
          </section>

          {/* Progress Visualization (Mock) */}
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{labels.performanceTrend}</h2>
                <p className="text-sm text-slate-500">{labels.trendDesc}</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ModuleView;