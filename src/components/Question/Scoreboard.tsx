import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import {
	Root,
	ScoreboardTitle,
	LeftContainer,
	RightContainer,
	Score,
	Points
} from './scoreboardStyles';

/** RULES
 * Provide props to component describing how many players are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */

export const Scoreboard: React.FC = () => {
	const players = useSelector((state: RootState) => state.scoreboard.players);
	const firstPlayer = players.reduce((prevPlayer, team) => {
		return prevPlayer.score > team.score ? prevPlayer : team;
	});
	const lastPlayer = players.reduce((prevPlayer, team) => {
		return prevPlayer.score < team.score ? prevPlayer : team;
	});
	const sortedPlayers = [
		firstPlayer,
		...players.filter(t => t !== firstPlayer && t !== lastPlayer),
		lastPlayer
	];

	return (
		<Root>
			<LeftContainer>
				<ScoreboardTitle>Scoreboard</ScoreboardTitle>
			</LeftContainer>

			<RightContainer>
				{sortedPlayers.map((t, i) => {
					// if index is 0
					if (i === 0) {
						return (
							<Score first>
								{t.pName}: <Points>{t.score}</Points>
							</Score>
						);
					} else if (i === sortedPlayers.length - 1) {
						// if last index
						return (
							<Score last>
								{t.pName}: <Points>{t.score}</Points>
							</Score>
						);
					} else {
						// if any indices between first and last
						return (
							<Score>
								{t.pName}: <Points>{t.score}</Points>
							</Score>
						);
					}
				})}
			</RightContainer>
		</Root>
	);
};
