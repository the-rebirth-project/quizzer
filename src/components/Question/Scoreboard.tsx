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

// HORRIBLE CODE. I KNOW.
export const Scoreboard: React.FC = () => {
	const players = useSelector((state: RootState) => state.scoreboard.players);
	const firstPlayer = players.reduce((prevPlayer, player) => {
		return prevPlayer.score > player.score ? prevPlayer : player;
	});
	const lastPlayer = players.reduce((prevPlayer, player) => {
		return prevPlayer.score < player.score ? prevPlayer : player;
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
				{players.length > 2 &&
					players.reduce((prevP, p) =>
						prevP.score === p.score ? prevP : p
					) !== players[0] &&
					sortedPlayers.map((p, i) => {
						// if index is 0
						if (i === 0) {
							return (
								<Score first>
									{p.pName}: <Points>{p.score}</Points>
								</Score>
							);
						} else if (i === sortedPlayers.length - 1) {
							// if last index
							return (
								<Score last>
									{p.pName}: <Points>{p.score}</Points>
								</Score>
							);
						} else {
							// if any indices between first and last
							return (
								<Score>
									{p.pName}: <Points>{p.score}</Points>
								</Score>
							);
						}
					})}
				{players.length >= 2 &&
					players.reduce((prevP, p) =>
						prevP.score === p.score ? prevP : p
					) === players[0] && (
						<>
							{players.map(p => (
								<Score>
									{p.pName}: <Points>{p.score}</Points>
								</Score>
							))}
						</>
					)}
				{players.length === 1 && (
					<Score>
						{players[0].pName}: <Points>{players[0].score}</Points>
					</Score>
				)}
				{players.length === 2 &&
					players.reduce((prevP, p) =>
						prevP.score === p.score ? prevP : p
					) !== players[0] && (
						<>
							{players[0].score > players[1].score && (
								<>
									<Score first>
										{players[0].pName}: <Points>{players[0].score}</Points>
									</Score>
									<Score last>
										{players[1].pName}: <Points>{players[1].score}</Points>
									</Score>
								</>
							)}
							{players[1].score > players[0].score && (
								<>
									<Score first>
										{players[1].pName}: <Points>{players[1].score}</Points>
									</Score>
									<Score last>
										{players[0].pName}: <Points>{players[0].score}</Points>
									</Score>
								</>
							)}
						</>
					)}
			</RightContainer>
		</Root>
	);
};
