import { Trophy } from 'lucide-react';

export default function BracketView({ activeTournament, handleOpenScoring }) {
  if (!activeTournament) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="p-6 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white">{activeTournament.name}</h2>
          <p className="text-blue-400 font-semibold">{activeTournament.game}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold border ${activeTournament.status === 'Terminé' ? 'bg-emerald-900/50 border-emerald-500/30 text-emerald-400' : 'bg-orange-900/50 border-orange-500/30 text-orange-400'}`}>
          {activeTournament.status}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-10 flex items-center bg-slate-950 relative">
         <div className="flex gap-16 min-h-full items-center">
           {activeTournament.rounds.map((round, rIndex) => (
              <div key={rIndex} className="flex flex-col justify-around min-w-[280px] h-full gap-8 relative">
                 <div className="absolute -top-10 left-0 w-full text-center text-slate-500 font-bold tracking-widest text-sm uppercase">
                   {rIndex === activeTournament.rounds.length - 1 ? 'Finale' :
                    rIndex === activeTournament.rounds.length - 2 ? 'Demi-Finales' : `Round ${rIndex + 1}`}
                 </div>

                 {round.map((match) => {
                   const isClickable = match.p1 && match.p2 && match.p2 !== "Bye" && !match.winner;

                   return (
                     <div
                       key={match.id}
                       onClick={() => handleOpenScoring(match, rIndex)}
                       className={`bg-slate-800 rounded-xl overflow-hidden border-2 transition-all relative z-10
                         ${match.winner ? 'border-slate-700 opacity-80' : 
                           isClickable ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-pointer hover:-translate-y-1 hover:border-blue-400' : 'border-slate-800'}`}
                     >
                       <div className={`flex justify-between items-center p-3 border-b border-slate-700/50 ${match.winner === match.p1 ? 'bg-blue-600/20' : ''}`}>
                          <div className="flex items-center gap-2 overflow-hidden">
                            {match.winner === match.p1 && <Trophy className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                            <span className={`truncate font-semibold ${match.winner && match.winner !== match.p1 ? 'text-slate-500' : 'text-slate-200'}`}>
                              {match.p1 || 'À déterminer'}
                            </span>
                          </div>
                          <span className={`font-mono text-lg font-bold ml-3 ${match.winner === match.p1 ? 'text-blue-400' : 'text-slate-500'}`}>
                            {match.score1 !== null ? match.score1 : '-'}
                          </span>
                       </div>
                       <div className={`flex justify-between items-center p-3 ${match.winner === match.p2 ? 'bg-blue-600/20' : ''}`}>
                          <div className="flex items-center gap-2 overflow-hidden">
                            {match.winner === match.p2 && <Trophy className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                            <span className={`truncate font-semibold ${match.winner && match.winner !== match.p2 ? 'text-slate-500' : 'text-slate-200'}`}>
                              {match.p2 || 'À déterminer'}
                            </span>
                          </div>
                          <span className={`font-mono text-lg font-bold ml-3 ${match.winner === match.p2 ? 'text-blue-400' : 'text-slate-500'}`}>
                            {match.score2 !== null ? match.score2 : '-'}
                          </span>
                       </div>
                     </div>
                   );
                 })}
              </div>
           ))}
         </div>
      </div>
    </div>
  );
}

