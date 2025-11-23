import React from 'react';
import { Landmark, Menu, X } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onReset}>
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Scheme<span className="text-indigo-600">Xpert</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={onReset} className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </button>
            <button onClick={onReset} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Find Schemes
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-indigo-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => { onReset(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">
              Home
            </button>
            <button onClick={() => { onReset(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
              Find Schemes
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;