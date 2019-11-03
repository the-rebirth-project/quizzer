import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import { showModal, fetchQuestionsThunk } from '../../actions';
import {
	FieldContainer,
	LabelText,
	StyledInputField,
	SubmitBtn,
	TimerLabel
} from './formStyles';

interface FetchFormProps {
	setFetchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchForm: React.FC<FetchFormProps> = ({ setFetchModalOpen }) => {
	interface FormValues {
		fetchNum: number;
		category: string;
		difficulty: string;
		type: string;
		timer: number | undefined;
		timed: boolean;
	}
	interface Category {
		id: number;
		name: string;
	}

	const initialValues: FormValues = {
		fetchNum: 1,
		category: 'any',
		difficulty: 'any',
		type: 'any',
		timer: undefined,
		timed: false
	};

	const dispatch = useDispatch();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			const response = await axios.get('https://opentdb.com/api_category.php');
			const categories: Category[] = response.data.trivia_categories;
			setCategories(categories);
		};
		fetchCategories();
	}, []);

	const onFormSubmit = (values: FormValues): void => {
		console.log(values);
		const fetchQuestions = async () => {
			await fetchQuestionsThunk(
				dispatch,
				values.fetchNum,
				values.category,
				values.difficulty,
				values.type,
				values.timed ? values.timer : undefined
			);
		};
		fetchQuestions();
		setFetchModalOpen(false);
		dispatch(showModal());
	};

	return (
		<Form
			initialValues={initialValues}
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<LabelText>Fetch</LabelText>
						<StyledInputField
							name="fetchNum"
							component="input"
							type="number"
							min="1"
							max="50"
							placeholder="Number of Questions to Fetch"
						/>
					</FieldContainer>
					<FieldContainer>
						<LabelText>Category</LabelText>
						<StyledInputField name="category" component="select">
							<option value="any">Any Category</option>
							{categories.map(c => (
								<option value={c.id}>{c.name}</option>
							))}
						</StyledInputField>
					</FieldContainer>

					<FieldContainer>
						<LabelText>Difficulty</LabelText>
						<StyledInputField name="difficulty" component="select">
							<option value="any">Any Difficulty</option>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</StyledInputField>
					</FieldContainer>

					<FieldContainer>
						<LabelText>Type</LabelText>
						<StyledInputField name="type" component="select">
							<option value="any">Any Type</option>
							<option value="multiple">Multiple Choice</option>
							<option value="boolean">True / False</option>
						</StyledInputField>
					</FieldContainer>

					<FieldContainer>
						<Field
							name="timed"
							component="input"
							type="checkbox"
							style={{ opacity: 0 }}
						/>
						<TimerLabel checked={values.timed}>Timer</TimerLabel>
						<StyledInputField
							name="timer"
							component="input"
							type="number"
							min="1"
							disabled={!values.timed}
						/>
					</FieldContainer>

					<SubmitBtn type="submit" primary>
						Fetch
					</SubmitBtn>
				</form>
			)}
		/>
	);
};
