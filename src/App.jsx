import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateTournament from './components/CreateTournament';
import BracketView from './components/BracketView';
import ScoreModal from './components/ScoreModal';
import { generateBracket } from './utils/bracketEngine';

// Données par défaut pour démonstration
const MOCK_TOURNAMENTS = [
  {
    id: 't1',
    name: 'Alpha Cup E-Sport',
    game: 'League of Legends',
    format: 'Elimination Directe',
    status: 'En cours',
    rounds: generateBracket(['Team Vitality', 'Karmine Corp', 'Fnatic', 'G2 Esports', 'MAD Lions', 'BDS', 'SK Gaming', 'Astralis'])
  }
];

export default function App() {
  const [tournaments, setTournaments] = useState(MOCK_TOURNAMENTS);
  const [currentView, setCurrentView] = useState('home'); // home, create, bracket
  const [activeTournament, setActiveTournament] = useState(null);
  const [scoringMatchInfo, setScoringMatchInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const displayError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  const handleTournamentCreated = (newTournament) => {
    setTournaments([newTournament, ...tournaments]);
    setCurrentView('home');
  };

  const handleOpenScoring = (match, roundIndex) => {
    if (match.p1 && match.p2 && match.p2 !== "Bye" && !match.winner) {
      setScoringMatchInfo({ match, roundIndex });
    }
  };

  const handleSubmitScore = (s1, s2) => {
    if (s1 === s2) {
      displayError("Les matchs nuls ne sont pas autorisés dans ce format.");
      return;
    }

    const updatedTournament = { ...activeTournament };
    const roundIdx = scoringMatchInfo.roundIndex;
    const match = updatedTournament.rounds[roundIdx].find(m => m.id === scoringMatchInfo.match.id);

    match.score1 = s1;
    match.score2 = s2;
    match.winner = s1 > s2 ? match.p1 : match.p2;

    if (match.nextMatchId) {
      const nextRound = updatedTournament.rounds[roundIdx + 1];
      const nextMatch = nextRound.find(m => m.id === match.nextMatchId);
      if (nextMatch) {
        nextMatch[match.nextMatchSlot] = match.winner;
      }
    }

    if (!match.nextMatchId) {
      updatedTournament.status = 'Terminé';
    }

    setActiveTournament(updatedTournament);
    setTournaments(tournaments.map(t => t.id === updatedTournament.id ? updatedTournament : t));
    setScoringMatchInfo(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main>
        {currentView === 'home' && (
          <Dashboard
            tournaments={tournaments}
            setActiveTournament={setActiveTournament}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'create' && (
          <CreateTournament
            onTournamentCreated={handleTournamentCreated}
            displayError={displayError}
          />
        )}
        {currentView === 'bracket' && (
          <BracketView
            activeTournament={activeTournament}
            handleOpenScoring={handleOpenScoring}
          />
        )}
      </main>

      {errorMessage && (
        <div className="fixed bottom-6 right-6 bg-red-900/90 border border-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-[100] animate-in slide-in-from-bottom flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {scoringMatchInfo && (
        <ScoreModal
          scoringMatchInfo={scoringMatchInfo}
          onClose={() => setScoringMatchInfo(null)}
          onSubmit={handleSubmitScore}
        />
      )}
    </div>
  );
}

