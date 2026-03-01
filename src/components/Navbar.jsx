import { Swords, ArrowLeft } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
            <Swords className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white">
              VERSUS<span className="text-slate-400 font-light">.LAB</span>
            </h1>
          </div>
        </div>
        {currentView !== 'home' && (
          <button
            onClick={() => setCurrentView('home')}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
      </div>
    </nav>
  );
}

