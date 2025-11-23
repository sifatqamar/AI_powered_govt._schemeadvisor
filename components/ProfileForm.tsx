import React, { useState } from 'react';
import { UserProfile, Gender, EmploymentStatus } from '../types';
import { User, MapPin, Briefcase, DollarSign, Activity } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  initialData?: UserProfile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    name: '',
    age: 0,
    gender: Gender.PreferNotToSay,
    location: '',
    occupation: EmploymentStatus.Unemployed,
    annualIncome: 0,
    category: '',
    disability: false
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-panel rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-2 text-center">
          {step === 1 && "Let's start with the basics"}
          {step === 2 && "Tell us about your work"}
          {step === 3 && "Almost there! Final details"}
        </h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
                  <input
                    required
                    type="number"
                    min="0"
                    max="120"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="e.g. 25"
                    value={formData.age || ''}
                    onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Gender</label>
                <div className="flex flex-wrap gap-3">
                  {Object.values(Gender).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleChange('gender', g)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        formData.gender === g
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Location (City/State)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="e.g. Mumbai, California, London"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Current Occupation</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(EmploymentStatus).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleChange('occupation', status)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                        formData.occupation === status
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <Briefcase className="h-5 w-5 opacity-70" />
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Annual Household Income</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    required
                    type="number"
                    min="0"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="e.g. 500000"
                    value={formData.annualIncome || ''}
                    onChange={(e) => handleChange('annualIncome', parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-slate-400 mt-1 ml-1">In your local currency</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Social Category (Optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. General, Veteran, Minority, etc."
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-1 ml-1">Helps find category-specific reservations or schemes.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Activity className="h-5 w-5 text-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Person with Disability?</h4>
                    <p className="text-xs text-slate-500">Enable this to see special disability benefits</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData.disability}
                    onChange={(e) => handleChange('disability', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  "Find Schemes"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;