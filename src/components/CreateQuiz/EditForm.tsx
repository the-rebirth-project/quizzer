import React from 'react';
import { Form, Field } from 'react-final-form';
import { FormApi } from 'final-form';
import { Question } from '../../types';

interface EditFormProps {
	question: Question;
}

export const EditForm: React.FC<EditFormProps> = props => {
	interface Values {
		question: string;
		difficulty: string;
	}

	const initialValues = {
		question: props.question.question,
		difficulty: props.question.difficulty
	};

	const onFormSubmit = (values: Values, form: FormApi<Values>) => {
		console.log(values);
		setTimeout(form.reset);
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
