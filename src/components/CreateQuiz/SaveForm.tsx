import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import uuid from 'uuid/v4';
import { showModal, savePreset } from '../../actions';
import { RootState, QuizPreset } from '../../types';
import {
	FieldContainer,
	LabelText,
	StyledInputField,
	SubmitBtn
} from './formStyles';

interface SaveFormProps {
	setSaveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SaveForm: React.FC<SaveFormProps> = ({ setSaveModalOpen }) => {
	interface FormValues {
		presetName: string;
	}

	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);

	const onFormSubmit = (values: FormValues): void => {
		setSaveModalOpen(false);
		dispatch(showModal());
		const preset: QuizPreset = {
			id: uuid(),
			presetName: values.presetName,
			questions: questions
		};
		dispatch(savePreset(preset));
	};

	return (
		<Form
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<LabelText>Question</LabelText>
						<StyledInputField
							name="presetName"
							component="input"
							type="text"
							placeholder="Enter a name for your quiz preset"
						/>
					</FieldContainer>

					<SubmitBtn primary type="submit">
						Save
					</SubmitBtn>
				</form>
			)}
		/>
	);
};
