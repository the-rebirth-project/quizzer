import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { arrayMove } from '../../helpers';
import { SortEnd } from 'react-sortable-hoc';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { MiniQuestions } from './MiniQuestions';
import { Toolbar } from './Toolbar';
import { sortQuestion } from '../../actions/createQuizActions';
import { RootState } from '../../types';
import { NavBtnsContainer, ButtonContainer, NavBtn } from '../Layout/styles';
import {
	GreyBG,
	GlobalStyle,
	Root,
	Sidebar,
	CreateTitle,
	MiniQuestionsContainer
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

	const goLeft = (): void => {
		dispatch(push('/'));
	};

	return (
		<GreyBG>
			<GlobalStyle />
			{transitions.map(({ props, key }) => (
				<animated.div key={key} style={props}>
					<Root>
						<Sidebar>
							<Toolbar />
							<CreateTitle>Create</CreateTitle>
							<NavBtnsContainer>
								<ButtonContainer onClick={goLeft} left>
									<NavBtn icon={faLongArrowAltLeft} />
								</ButtonContainer>
							</NavBtnsContainer>
						</Sidebar>
						<MiniQuestionsContainer>
							<MiniQuestions
								distance={3}
								axis="y"
								lockAxis="y"
								onSortEnd={handleOnSortEnd}
							/>
						</MiniQuestionsContainer>
					</Root>
				</animated.div>
			))}
		</GreyBG>
	);
};
