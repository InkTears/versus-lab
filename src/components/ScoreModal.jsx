import { useState } from 'react';
import { Trophy } from 'lucide-react';

export default function ScoreModal({ scoringMatchInfo, onClose, onSubmit }) {
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  if (!scoringMatchInfo) return null;
  const match = scoringMatchInfo.match;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <Trophy className="text-orange-500" /> Saisir le Résultat
        </h3>

        <div className="flex items-center gap-4 mb-8 mt-6">
          <div className="flex-1 text-center">
            <label className="block text-sm font-bold text-blue-400 mb-3 truncate px-2">{match.p1}</label>
            <input
              type="number"
              min="0"
              className="w-20 mx-auto text-center text-3xl font-black bg-slate-900 border-2 border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              autoFocus
            />
          </div>
          <div className="font-black text-slate-600 text-xl pt-6">VS</div>
          <div className="flex-1 text-center">
            <label className="block text-sm font-bold text-orange-400 mb-3 truncate px-2">{match.p2}</label>
            <input
              type="number"
              min="0"
              className="w-20 mx-auto text-center text-3xl font-black bg-slate-900 border-2 border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
          <button
            className="px-5 py-2.5 rounded-lg text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors disabled:opacity-50"
            onClick={() => onSubmit(parseInt(score1, 10), parseInt(score2, 10))}
            disabled={score1 === '' || score2 === ''}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

