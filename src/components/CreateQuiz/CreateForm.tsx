import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';
import { shuffleArray } from '../../helpers';
import { createCustomQuestion, openCreateModal } from '../../actions';
import { Question } from '../../types';

export const CreateForm: React.FC = () => {
	const dispatch = useDispatch();

	const handleOnSubmit = (values: Question) => {
		// lay out initial structure of the custom question
		const customQuestion = {
			qId: uuid(),
			...values,
			category: 'custom',
			type: 'multiple_choice',
			incorrect_answers: ['Wrong Answer', 'Wrong Answer', 'Wrong Answer'],
			correct_answer: 'Correct Answer'
		};
		// add options prop
		customQuestion.options = shuffleArray([
			...customQuestion.incorrect_answers,
			customQuestion.correct_answer
		]);

		dispatch(createCustomQuestion(customQuestion));
		dispatch(openCreateModal());
	};

	return (
		<Form
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<Field name="question">
						{({ input, meta }) => (
							<div>
								<label htmlFor="question">Question: </label>
								<input
									{...input}
									type="text"
									placeholder="Enter Your Question"
									required
								/>
							</div>
						)}
					</Field>
					<Field name="difficulty">
						{({ input, meta }) => (
							<div>
								<label htmlFor="difficulty">Difficulty</label>
								<select {...input} name="difficulty">
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
						)}
					</Field>
					<button type="submit">Add</button>
				</form>
			)}
		/>
	);
};
