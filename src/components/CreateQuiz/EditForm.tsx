import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { openEditModal, saveEditedQuestion } from '../../actions';
import { Question } from '../../types';

interface EditFormProps {
	question: Question;
}

export const EditForm: React.FC<EditFormProps> = props => {
	interface Values {
		question: string;
		difficulty: string;
	}

	const { question } = props;
	const dispatch = useDispatch();

	const initialValues = {
		question: props.question.question,
		difficulty: props.question.difficulty
	};

	const onFormSubmit = (values: Values) => {
		const newQuestion = {
			...question,
			...values
		};
		dispatch(saveEditedQuestion(newQuestion));
		dispatch(openEditModal());
	};

	return (
		<Form
			initialValues={initialValues}
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<Field name="question">
						{({ input, meta }) => (
							<div>
								<label>Question: </label>
								<input
									{...input}
									type="text"
									placeholder="Enter New Question"
									required
								/>
							</div>
						)}
					</Field>
					<Field name="difficulty">
						{({ input, meta }) => (
							<div>
								<label>Difficulty: </label>
								<select {...input}>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
						)}
					</Field>
					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
