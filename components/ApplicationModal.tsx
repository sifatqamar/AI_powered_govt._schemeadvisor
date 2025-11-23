import React from 'react';
import { Scheme, UserProfile } from '../types';
import { X, ExternalLink, Shield, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface ApplicationModalProps {
  scheme: Scheme;
  userProfile: UserProfile;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ scheme, userProfile, onClose }) => {
  
  const handleRedirect = () => {
    // Open official link in new tab
    window.open(scheme.officialLink, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/90 backdrop-filter backdrop-blur-xl rounded-3xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden flex flex-col max-h-[90vh] transform transition-all hover:scale-[1.01] duration-300">
        
        {/* Header with gradient background */}
        <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex justify-between items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="z-10">
            <h3 className="text-xl font-bold tracking-tight">Application Gateway</h3>
            <p className="text-indigo-100 text-sm mt-1 opacity-90">Ready to apply for {scheme.name}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors z-10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="space-y-6">
            
            {/* Context Card */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                    <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-slate-800">Secure Redirection</h4>
                    <p className="text-sm text-slate-600 mt-1">
                        You are about to visit the official <strong>{scheme.provider}</strong> portal. 
                        SchemeXpert does not collect your documents directly.
                    </p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Recommended Documents
                </h4>
                <div className="grid gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                        <CheckCircle2 className="h-5 w-5 text-teal-500" />
                        <span className="text-sm text-slate-700 font-medium">Identity Proof (Aadhaar/Voter ID)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                        <CheckCircle2 className="h-5 w-5 text-teal-500" />
                        <span className="text-sm text-slate-700 font-medium">Income Certificate</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                        <CheckCircle2 className="h-5 w-5 text-teal-500" />
                        <span className="text-sm text-slate-700 font-medium">Residence Proof</span>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-amber-800 text-sm border border-amber-100">
                 <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                 <p>Ensure you have a stable internet connection before proceeding. The application process may take 10-15 minutes on the government portal.</p>
            </div>

            <div className="pt-4">
                <button 
                onClick={handleRedirect}
                className="group relative w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="flex items-center justify-center gap-2">
                    Proceed to Official Website 
                    <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                    Opens in a new tab • {scheme.officialLink ? new URL(scheme.officialLink).hostname : 'Official Portal'}
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;