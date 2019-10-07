import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { arrayMove } from '../../helpers';
import { SortEnd } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { MiniQuestions } from './MiniQuestions';
import { sortQuestion } from '../../actions/createQuizActions';
import { RootState } from '../../types';
import {
	GreyBG,
	GlobalStyle,
	Root,
	TitleContainer,
	CreateTitle,
	ConfigContainer
} from './styles';

export const CreateQuiz: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const { location } = useSelector((state: RootState) => state.router);
	const shouldTransition = location.pathname.includes('create') ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { transform: 'translate(100%,0)' },
		enter: { transform: 'translate(0%,0)' },
		leave: { transform: 'translate(-50%,0)' }
	});

	const handleOnSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
		const sortedQuestions = arrayMove(oldIndex, newIndex, questions);
		dispatch(sortQuestion(sortedQuestions));
	};

	return (
		<GreyBG>
			<GlobalStyle />
			{transitions.map(({ props, key }) => (
				<animated.div key={key} style={props}>
					<Root>
						<TitleContainer>
							<Link to="/">Home</Link>
							<CreateTitle>Create</CreateTitle>
						</TitleContainer>
						<ConfigContainer>
							<MiniQuestions
								distance={3}
								axis="y"
								lockAxis="y"
								onSortEnd={handleOnSortEnd}
							/>
						</ConfigContainer>
					</Root>
				</animated.div>
			))}
		</GreyBG>
	);
};
