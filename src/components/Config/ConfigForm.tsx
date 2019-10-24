import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { push } from 'connected-react-router';
import { setPresetId } from '../../actions';
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

export const ConfigForm: React.FC = () => {
	interface ConfigFormValues {
		presetId: string;
	}

	const dispatch = useDispatch();
	const quizPresets = useSelector((state: RootState) => state.quiz.presets);
	const initialFormValues = {
		presetId: quizPresets[0].id
	};

	const onFormSubmit = (values: ConfigFormValues): void => {
		dispatch(setPresetId(values.presetId));
		dispatch(push('/'));
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
						Save
					</SubmitBtn>
				</form>
			)}
		/>
	);
};
