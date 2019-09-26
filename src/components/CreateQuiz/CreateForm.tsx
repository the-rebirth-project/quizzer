import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
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
			incorrect_answers: values.options.filter(
				o => o !== values.correct_answer
			),
			correct_answer: values.correct_answer
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
					<FieldArray name="options">
						{({ fields }) => (
							<div>
								{fields.map((name, index) => (
									<div key={name}>
										<Field name={`${name}.options`}></Field>
									</div>
								))}
							</div>
						)}
					</FieldArray>
					<Field name="options[0]">
						{({ input, meta }) => (
							<div>
								<label htmlFor="option1">Option 1</label>
								<input
									{...input}
									name="option1"
									type="text"
									placeholder="First Option"
								/>
							</div>
						)}
					</Field>
					<Field name="options[1]">
						{({ input, meta }) => (
							<div>
								<label htmlFor="option2">Option 2</label>
								<input
									{...input}
									name="option2"
									type="text"
									placeholder="Second Option"
								/>
							</div>
						)}
					</Field>
					<Field name="options[2]">
						{({ input, meta }) => (
							<div>
								<label htmlFor="option3">Option 3</label>
								<input
									{...input}
									name="option3"
									type="text"
									placeholder="Third Option"
								/>
							</div>
						)}
					</Field>
					<Field name="options[3]">
						{({ input, meta }) => (
							<div>
								<label htmlFor="option4">Option 4</label>
								<input
									{...input}
									name="option4"
									type="text"
									placeholder="Fourth Option"
								/>
							</div>
						)}
					</Field>
					<Field name="correct_answer">
						{({ input, meta }) => (
							<select>
								{values.options.map(o => (
									<option value={o}>{o}</option>
								))}
							</select>
						)}
					</Field>
					<button type="submit">Add</button>
				</form>
			)}
		/>
	);
};
