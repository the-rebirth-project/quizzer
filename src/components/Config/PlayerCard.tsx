import React from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer, removePlayer } from '../../actions';
import { Player } from '../../types';
import { Root, PlayerName } from './playerCardStyles';

interface PlayerCardProps {
	pNum: number;
	active: boolean;
	playerData: Player | undefined;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
	active,
	pNum,
	playerData
}) => {
	const dispatch = useDispatch();
	const onCardClick = (): void => {
		// push new player else if already selected, pop new player off of players array
		playerData
			? dispatch(removePlayer(playerData.id))
			: dispatch(addPlayer({ id: pNum, pName: `Player ${pNum}`, score: 0 }));
	};
	return (
		<Root active={active} onClick={onCardClick}>
			<PlayerName>Player {pNum}</PlayerName>
		</Root>
	);
};
