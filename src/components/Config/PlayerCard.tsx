import React, { useState } from 'react';
import { Root, PlayerName } from './playerCardStyles';

interface PlayerCardProps {
	pNum: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = props => {
	const [isActive, setIsActive] = useState(false);
	const onCardClick = (): void => {
		setIsActive(!isActive);
	};
	return (
		<Root active={isActive} onClick={onCardClick}>
			<PlayerName>Player {props.pNum}</PlayerName>
		</Root>
	);
};
