import React from 'react';
import { Form, Field } from 'react-final-form';

export const EditForm: React.FC = () => {
	interface Values {
		question: string;
	}

	const onFormSubmit = (values: Values) => {
		console.log(values);
	};

	return (
		<Form
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
					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
