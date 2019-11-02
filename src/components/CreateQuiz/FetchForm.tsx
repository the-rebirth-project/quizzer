import React from 'react';
import { Form } from 'react-final-form';
import { FieldContainer, LabelText, StyledInputField } from './formStyles';

export const FetchForm: React.FC = () => {
	interface FormValues {
		fetchNum: number;
		category: string;
		difficulty: string;
		type: string;
	}

	const onFormSubmit = (values: FormValues): void => {};

	return (
		<Form
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<LabelText>Question</LabelText>
						<StyledInputField
							name="question"
							component="input"
							type="text"
							placeholder="Enter New Question"
						/>
					</FieldContainer>
				</form>
			)}
		/>
	);
};
