import React from 'react';
import { Team } from '../../types';
import { Root } from './styles';

/** RULES
 * Provide props to component describing how many teams are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */

interface ScoreboardProps {
	teams: Team[];
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ teams }) => {
	return (
		<Root>
			<h1>Scoreboard</h1>

			{teams.map(t => (
				<h3>
					{t.tName}: {t.score}
				</h3>
			))}
		</Root>
	);
};
