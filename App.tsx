import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfileForm from './components/ProfileForm';
import SchemeCard from './components/SchemeCard';
import ApplicationModal from './components/ApplicationModal';
import ChatAssistant from './components/ChatAssistant';
import { UserProfile, Scheme } from './types';
import { generateSchemes } from './services/geminiService';
import { Search, ArrowLeft } from 'lucide-react';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const handleStart = () => {
    setHasStarted(true);
    // Smooth scroll to form if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (schemes.length > 0) {
      // Go back to form to edit details
      setSchemes([]);
    } else {
      // Go back to Hero
      setHasStarted(false);
    }
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);
    setLoading(true);
    try {
      const results = await generateSchemes(profile);
      setSchemes(results);
    } catch (error) {
      console.error("Failed to fetch schemes", error);
      // Fallback or error toast could go here
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setHasStarted(false);
    setSchemes([]);
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <Navbar onReset={resetFlow} />

      <main className="pt-16">
        {!hasStarted ? (
          <Hero onStart={handleStart} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            
            {/* Back Button */}
            <div className="mb-6">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-white/50"
              >
                <ArrowLeft className="h-4 w-4" />
                {schemes.length > 0 ? "Edit Profile" : "Back to Home"}
              </button>
            </div>

            {!schemes.length && !loading ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Check Your Eligibility</h2>
                  <p className="text-slate-600">Fill in the details below to let our AI find the best schemes for you.</p>
                </div>
                <ProfileForm 
                  onSubmit={handleProfileSubmit} 
                  isLoading={loading} 
                  initialData={userProfile}
                />
              </div>
            ) : (
              <div className="space-y-8 min-h-[80vh]">
                 {/* Results Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">Recommended For You</h2>
                    <p className="text-slate-600 mt-1">
                      Based on your profile, we found {schemes.length} schemes with high eligibility match.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter schemes..." 
                      className="bg-transparent border-none outline-none text-sm w-full" 
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-80 bg-white rounded-2xl animate-pulse shadow-sm"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schemes.map((scheme) => (
                      <SchemeCard 
                        key={scheme.id} 
                        scheme={scheme} 
                        onApply={setSelectedScheme} 
                      />
                    ))}
                  </div>
                )}
                
                {schemes.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-500">No schemes found. Try adjusting your profile details.</p>
                        <button onClick={handleBack} className="mt-4 text-indigo-600 font-medium hover:underline">Edit Profile</button>
                    </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedScheme && userProfile && (
        <ApplicationModal 
          scheme={selectedScheme} 
          userProfile={userProfile} 
          onClose={() => setSelectedScheme(null)} 
        />
      )}

      <ChatAssistant userProfile={userProfile} />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4 text-lg font-semibold text-white">SchemeXpert</p>
          <p className="text-sm">Empowering citizens with AI-driven governance access.</p>
          <div className="mt-8 text-xs border-t border-slate-800 pt-8">
            &copy; {new Date().getFullYear()} SchemeXpert. All rights reserved. Disclaimer: This is a demo application.
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
            animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;