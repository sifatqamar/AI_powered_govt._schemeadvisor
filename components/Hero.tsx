import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Users, MousePointer2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shape 1 */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl opacity-80 animate-float-slow transform rotate-12 backdrop-blur-sm border border-white/20"></div>
        
        {/* Floating Shape 2 */}
        <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-white/10 rounded-full shadow-xl backdrop-blur-md border border-white/30 animate-float-medium"></div>
        
        {/* Floating Shape 3 */}
        <div className="absolute bottom-[20%] left-[20%] w-12 h-12 bg-teal-400 rounded-xl shadow-lg opacity-60 animate-float-fast transform -rotate-12"></div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg shadow-indigo-500/5 mb-8 animate-fadeIn transform hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-bold text-slate-700 tracking-wide">AI-Powered Advisor Active</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1] animate-slideUp drop-shadow-sm">
          Government Schemes <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">Simplified For You.</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-12 animate-slideUp leading-relaxed" style={{animationDelay: '0.1s'}}>
          Stop searching, start applying. Our intelligent system matches your profile with eligible government benefits, subsidies, and programs instantly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slideUp px-4" style={{animationDelay: '0.2s'}}>
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.6)] hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
            <span className="flex items-center gap-2 relative z-10">
              Check Eligibility <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button 
            onClick={scrollToFeatures}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all border border-white/50"
          >
            Learn More
          </button>
        </div>

        {/* Features Grid */}
        <div id="features-section" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn px-4" style={{animationDelay: '0.4s'}}>
          
          {/* Card 1 */}
          <div className="group relative bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Instant Analysis</h3>
              <p className="text-slate-600 leading-relaxed">We analyze your demographic profile against a vast database of government programs in milliseconds.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 delay-100">
             <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10">
              <div className="h-14 w-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg shadow-teal-500/30 group-hover:-rotate-12 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Verified Sources</h3>
              <p className="text-slate-600 leading-relaxed">Direct links to official government portals. We prioritize your safety by avoiding third-party agents.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                <MousePointer2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Simple Application</h3>
              <p className="text-slate-600 leading-relaxed">Step-by-step guidance on where to go and what documents you need to submit your application.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;