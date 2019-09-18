import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { arrayMove } from '../../helpers';
import { SortEnd } from 'react-sortable-hoc';
import { MiniQuestions } from './MiniQuestions';
import { Root, CreateTitle, ConfigContainer } from './styles';
import { sortQuestion } from '../../actions/createQuizActions';

export const CreateQuiz: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.menu.questions);

	const handleOnSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
		const sortedQuestions = arrayMove(oldIndex, newIndex, questions);
		dispatch(sortQuestion(sortedQuestions));
	};

	return (
		<Root>
			<CreateTitle>Create</CreateTitle>
			<ConfigContainer>
				<MiniQuestions axis="y" onSortEnd={handleOnSortEnd} />
			</ConfigContainer>
		</Root>
	);
};
