import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { fetchQuestionsThunk } from '../../actions';
import { MiniQuestion } from './MiniQuestion';
import { Root, CreateTitle, ConfigContainer } from './styles';

export const CreateQuiz: React.FC = () => {
	const dispatch = useDispatch();
	const [clickedFetchBtn, setClickedFetchBtn] = useState(false);
	let randQuestions = useSelector((state: RootState) => state.menu.questions);

	const onButtonClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
			setClickedFetchBtn(true);
		};
		fetchRandomQuestions();
	};

	return (
		<Root>
			<CreateTitle>Create</CreateTitle>
			<ConfigContainer>
				<button onClick={onButtonClick}>Fetch a random question</button>
				<div>
					{clickedFetchBtn &&
						randQuestions.map(q => <MiniQuestion question={q} type="random" />)}
				</div>
			</ConfigContainer>
		</Root>
	);
};
