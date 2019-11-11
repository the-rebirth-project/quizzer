import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../types';

interface RouteParams {
	curPlayerId: string;
}

export const TurnOverlay: React.FC<
	RouteComponentProps<RouteParams>
> = props => {
	const { curPlayerId } = props.match.params;
	const curPlayer = useSelector(
		(state: RootState) => state.scoreboard.players
	).filter(p => p.id === parseInt(curPlayerId))[0];

	return (
		<div>
			<h1>This overlay should show the which player's turn it is</h1>
		</div>
	);
};
