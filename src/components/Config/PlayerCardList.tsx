import React from 'react';
import { useSelector } from 'react-redux';
import { PlayerCard } from './PlayerCard';
import { RootState } from '../../types';
import { Root } from './playerCardListStyles';

export const PlayerCardList: React.FC = () => {
  const numPlayers = [1, 2, 3, 4];
  const players = useSelector((state: RootState) => state.scoreboard.players);
  return (
    <Root>
      {numPlayers.map(n => (
        <PlayerCard
          key={n}
          pNum={n}
          active={players.filter(p => p.id === n)[0] ? true : false}
          playerData={players.filter(p => p.id === n)[0]}
        />
      ))}
    </Root>
  );
};
