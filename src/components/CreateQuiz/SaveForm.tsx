import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';
import { showModal, savePreset } from '../../actions';
import { RootState, QuizPreset } from '../../types';
import {
	FieldContainer,
	LabelText,
	StyledInput,
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
			questions
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
						<Field
							name="presetName"
							component={StyledInput}
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
