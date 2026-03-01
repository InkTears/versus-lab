export const generateBracket = (participants) => {
  if (!participants || participants.length === 0) return [];

  const count = participants.length;
  const nextPow2 = Math.pow(2, Math.ceil(Math.log2(count || 1)));
  const padded = [...participants];

  for (let i = count; i < nextPow2; i++) {
      padded.push("Bye");
  }

  const rounds = [];
  let matchCounter = 1;

  const r1 = [];
  for (let i = 0; i < padded.length; i += 2) {
      const p1 = padded[i];
      const p2 = padded[i+1];
      const isBye = p2 === "Bye";
      r1.push({
          id: `m${matchCounter++}`,
          p1: p1,
          p2: p2,
          score1: isBye ? 1 : null,
          score2: isBye ? 0 : null,
          winner: isBye ? p1 : null,
          nextMatchId: null,
          nextMatchSlot: null
      });
  }
  rounds.push(r1);

  let numMatches = r1.length / 2;
  let roundIndex = 1;

  while (numMatches >= 1) {
      const currentRound = [];
      for (let i = 0; i < numMatches; i++) {
          currentRound.push({
              id: `m${matchCounter++}`,
              p1: null,
              p2: null,
              score1: null,
              score2: null,
              winner: null,
              nextMatchId: null,
              nextMatchSlot: null
          });
      }

      const prevRound = rounds[roundIndex - 1];
      for (let i = 0; i < prevRound.length; i++) {
          const nextMatchIndex = Math.floor(i / 2);
          prevRound[i].nextMatchId = currentRound[nextMatchIndex].id;
          prevRound[i].nextMatchSlot = (i % 2 === 0) ? 'p1' : 'p2';
      }

      rounds.push(currentRound);
      numMatches = numMatches / 2;
      roundIndex++;
  }

  for (let r = 0; r < rounds.length - 1; r++) {
      for (const m of rounds[r]) {
          if (m.winner && rounds[r+1]) {
              const nextM = rounds[r+1].find(nx => nx.id === m.nextMatchId);
              if (nextM) {
                  nextM[m.nextMatchSlot] = m.winner;
              }
          }
      }
  }

  return rounds;
};

