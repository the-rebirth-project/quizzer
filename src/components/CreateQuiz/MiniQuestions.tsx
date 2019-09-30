import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestionsThunk } from '../../actions';
import { SortableContainer } from 'react-sortable-hoc';
import { QuestionItem } from './QuestionItem';
import { CreateForm } from './CreateForm';
import { Modal } from '../Modal';
import { RootState } from '../../types';
import { Root } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const [modalOpen, setModalOpen] = useState(false);

	const onButtonClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
		};
		fetchRandomQuestions();
	};

	const onCreateBtnClick = (): void => {
		setModalOpen(true);
	};

	return (
		<Root>
			<button onClick={onButtonClick}>Fetch a random question</button>
			<button onClick={onCreateBtnClick}>Create Question</button>
			<Modal
				open={modalOpen}
				setModalOpen={setModalOpen}
				aria-label="Create Question"
			>
				<CreateForm setCreateModalOpen={setModalOpen} />
			</Modal>
			{questions.map((q, i) => (
				<QuestionItem
					disabled={modalOpen}
					question={q}
					type="random"
					index={i}
				/>
			))}
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
