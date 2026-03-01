import { Trophy, Users, Plus } from 'lucide-react';

export default function Dashboard({ tournaments, setActiveTournament, setCurrentView }) {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Tableau de bord</h2>
          <p className="text-slate-400">Gérez vos tournois et consultez les résultats en temps réel.</p>
        </div>
        <button
          onClick={() => setCurrentView('create')}
          className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Créer un tournoi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map(t => (
          <div
            key={t.id}
            onClick={() => { setActiveTournament(t); setCurrentView('bracket'); }}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.status === 'Terminé' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {t.status}
              </span>
              <Trophy className={`w-5 h-5 ${t.status === 'Terminé' ? 'text-emerald-400' : 'text-slate-500'} group-hover:text-orange-500 transition-colors`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1 truncate">{t.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{t.game}</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-auto pt-4 border-t border-slate-700/50">
              <Users className="w-4 h-4" />
              <span>{t.rounds[0].length * 2} Participants</span>
            </div>
          </div>
        ))}
        {tournaments.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
            Aucun tournoi actif.
          </div>
        )}
      </div>
    </div>
  );
}

