import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { RootState } from '../../types';
import {
	FieldContainer,
	StyledSelect,
	LabelText
} from '../CreateQuiz/formStyles';
import { SubmitBtn } from '../CreateQuiz/formStyles';

/**
 * Fields for:
 * - Choosing how many questions to pick from the quiz preset
 * - Choosing whether the quiz should be comprised of only True/False questions or MCQs. If there are only 			 one of the two, then do not the show the fields at all
 * -
 */

// should refrain from using any as type for our argument here
interface ConfigFormProps {
	onFormSubmit: (arg0: any) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ onFormSubmit }) => {
	const quizPresets = useSelector((state: RootState) => state.quiz.presets);
	const initialFormValues = {
		presetId: quizPresets[0].id
	};
	return (
		<Form
			onSubmit={onFormSubmit}
			initialValues={initialFormValues}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<Field name="presetId">
							{({ input, meta }) => (
								<>
									<LabelText>Select Preset</LabelText>
									<StyledSelect {...input}>
										{quizPresets.map(p => (
											<option value={p.id}>{p.presetName}</option>
										))}
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
