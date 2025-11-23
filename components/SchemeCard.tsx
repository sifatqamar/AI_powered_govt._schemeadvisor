import React from 'react';
import { Scheme } from '../types';
import { ArrowRight, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  onApply: (scheme: Scheme) => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onApply }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Education': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Health': return 'bg-red-50 text-red-700 border-red-200';
      case 'Agriculture': return 'bg-green-50 text-green-700 border-green-200';
      case 'Business': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-100 hover:border-indigo-100 flex flex-col h-full hover:-translate-y-2">
      
      {/* Decorative background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getCategoryColor(scheme.category)} shadow-sm`}>
            {scheme.category}
          </span>
          <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1.5 rounded-full border border-green-100 shadow-sm">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold text-green-700">{scheme.matchScore}% Match</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {scheme.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm">
          <Building2 className="h-4 w-4 text-indigo-400" />
          <span className="font-medium">{scheme.provider}</span>
        </div>

        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {scheme.description}
        </p>

        <div className="mb-6 flex-grow bg-slate-50/80 rounded-xl p-4 border border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Benefits</h4>
          <ul className="space-y-2.5">
            {scheme.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
            {scheme.benefits.length > 3 && (
              <li className="text-xs text-indigo-500 font-bold pl-6 pt-1">+{scheme.benefits.length - 3} more benefits</li>
            )}
          </ul>
        </div>

        <div className="mt-auto pt-2 flex gap-3">
          <button 
            onClick={() => onApply(scheme)}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2 group-hover:gap-3"
          >
            Details & Apply <ArrowRight className="h-4 w-4 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;