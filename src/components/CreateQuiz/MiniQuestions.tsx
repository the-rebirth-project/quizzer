import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestionsThunk } from '../../actions';
import { SortableContainer } from 'react-sortable-hoc';
import { QuestionItem } from './QuestionItem';
import { RootState } from '../../types';
import { Root } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const modalOpen = useSelector((state: RootState) => state.modal.open);

	const renderMiniQuestions = (): JSX.Element[] => {
		// type hardcoded as random for now
		return questions.map((q, i) => (
			<QuestionItem disabled={modalOpen} type="random" index={i} />
		));
	};

	const onButtonClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
		};
		fetchRandomQuestions();
	};

	return (
		<Root>
			<button onClick={onButtonClick}>Fetch a random question</button>
			{renderMiniQuestions()}
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
