import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Root } from './scoreboardStyles';

/** RULES
 * Provide props to component describing how many teams are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */

export const Scoreboard: React.FC = () => {
	const teams = useSelector((state: RootState) => state.scoreboard.teams);

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
