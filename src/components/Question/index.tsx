import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { useTransition } from 'react-spring';
import { Root, QuestionWrapper, OptionsWrapper } from './styles';

export const Question: React.FC = () => {
	const dispatch = useDispatch();
	const router = useSelector((state: RootState) => state.router);
	const started = useSelector((state: RootState) => state.quizApp.started);
	const transitions = useTransition(started, null, {
		from: {
			opacity: 0
		},
		enter: {
			opacity: 1
		},
		config: { tension: 100 }
	});

	return (
		<div>
			{transitions.map(({ props }) => (
				<Root style={props}>
					<QuestionWrapper>
						Which former Coronation Street actress was once a hostess on the
						British Game Show "Double Your Money"?
					</QuestionWrapper>
					<OptionsWrapper>Option here</OptionsWrapper>
					{console.log(router, dispatch)}
				</Root>
			))}
		</div>
	);
};
