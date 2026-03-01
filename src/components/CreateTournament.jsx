import { useState } from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { generateBracket } from '../utils/bracketEngine';

export default function CreateTournament({ onTournamentCreated, displayError }) {
  const [newTName, setNewTName] = useState('');
  const [newTGame, setNewTGame] = useState('');
  const [newTParticipants, setNewTParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantList = newTParticipants.split('\n').map(p => p.trim()).filter(p => p.length > 0);

    if (participantList.length < 2) {
      displayError("Veuillez saisir au moins 2 participants.");
      return;
    }

    const newTournament = {
      id: `t${Date.now()}`,
      name: newTName,
      game: newTGame,
      format: 'Elimination Directe',
      status: 'En cours',
      rounds: generateBracket(participantList)
    };

    onTournamentCreated(newTournament);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ShieldAlert className="text-blue-500" /> Configuration du Tournoi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Nom du tournoi</label>
            <input
              required
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={newTName}
              onChange={(e) => setNewTName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Jeu / Sport</label>
            <input
              required
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              value={newTGame}
              onChange={(e) => setNewTGame(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Participants <span className="text-slate-500 font-normal">(1 par ligne)</span>
            </label>
            <textarea
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-40 focus:outline-none focus:border-blue-500 transition-all"
              value={newTParticipants}
              onChange={(e) => setNewTParticipants(e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" /> Générer l'Arbre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

