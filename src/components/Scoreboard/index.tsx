import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router';
import { RootState } from '../../types';
import { Root } from './styles';

/** RULES
 * Provide props to component describing how many teams are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */
interface RouteParams {
	qId: string;
}

export const Scoreboard: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const teams = useSelector((state: RootState) => state.scoreboard.teams);
	const qPos = parseInt(props.match.params.qId); // cur index of question in arr + 1

	const goToNextQuestion = (): void => {
		setTimeout(() => {
			dispatch(push(`/start/q/${qPos}`));
		}, 5000);
	};

	useEffect(() => {
		goToNextQuestion();
	});

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
