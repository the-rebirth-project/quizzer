import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import {
	Root,
	ScoreboardTitle,
	LeftContainer,
	RightContainer,
	Score
} from './scoreboardStyles';

/** RULES
 * Provide props to component describing how many teams are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */

export const Scoreboard: React.FC = () => {
	const teams = useSelector((state: RootState) => state.scoreboard.teams);
	const firstTeam = teams.reduce((prevTeam, team) => {
		return prevTeam.score > team.score ? prevTeam : team;
	});
	const lastTeam = teams.reduce((prevTeam, team) => {
		return prevTeam.score < team.score ? prevTeam : team;
	});
	const sortedTeams = [
		firstTeam,
		...teams.filter(t => t !== firstTeam && t !== lastTeam),
		lastTeam
	];

	return (
		<Root>
			<LeftContainer>
				<ScoreboardTitle>Scoreboard</ScoreboardTitle>
			</LeftContainer>

			<RightContainer>
				{sortedTeams.map((t, i) => {
					// if index is 0
					if (i === 0) {
						return (
							<Score first>
								{t.tName}: {t.score}
							</Score>
						);
					} else if (i === sortedTeams.length - 1) {
						// if last index
						return (
							<Score last>
								{t.tName}: {t.score}
							</Score>
						);
					} else {
						// if any indices between first and last
						return (
							<Score>
								{t.tName}: {t.score}
							</Score>
						);
					}
				})}
			</RightContainer>
		</Root>
	);
};
