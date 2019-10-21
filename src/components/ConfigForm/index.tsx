import React from 'react';
import { Form, Field } from 'react-final-form';
import {
	FieldContainer,
	StyledSelect,
	LabelText
} from '../CreateQuiz/formStyles';
import { SubmitBtn } from './styles';

/**
 * Fields for:
 * - Choosing how many questions to pick from the quiz preset
 * - Choosing whether the quiz should be comprised of only True/False questions or MCQs. If there are only 			 one of the two, then do not the show the fields at all
 * -
 */

interface ConfigFormProps {
	onFormSubmit: () => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ onFormSubmit }) => {
	return (
		<Form
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<Field name="quizName">
							{({ input, meta }) => (
								<>
									<LabelText>Quiz Name</LabelText>
									<StyledSelect {...input}>
										<option value="quiz1">Quiz 1</option>
										<option value="quiz2">Quiz 2</option>
										<option value="quiz3">Quiz 3</option>
									</StyledSelect>
								</>
							)}
						</Field>
					</FieldContainer>

					<SubmitBtn primary type="submit">
						Start
					</SubmitBtn>
				</form>
			)}
		/>
	);
};
