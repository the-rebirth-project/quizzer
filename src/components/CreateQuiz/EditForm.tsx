import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { saveEditedQuestion, showModal } from '../../actions';
import { Question } from '../../types';
import {
	FieldContainer,
	LabelText,
	StyledInputField,
	StyledSelect,
	OptionLabel
} from './formStyles';

interface EditFormProps {
	question: Question;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditForm: React.FC<EditFormProps> = props => {
	interface FormValues {
		question: string;
		difficulty: string;
		o1: string;
		o2: string;
		o3: string;
		o4: string;
		checked: string;
		timer: number;
		timed: boolean;
	}

	const { question, setModalOpen } = props;
	const dispatch = useDispatch();

	const onFormSubmit = (values: FormValues) => {
		const options = [values.o1, values.o2, values.o3, values.o4];
		const getNewCorrectAnswer = (): string => {
			const index = parseInt(values.checked.slice(1)) - 1;
			return options[index];
		};

		const newQuestion = {
			...question,
			question: values.question,
			difficulty: values.difficulty,
			options,
			correct_answer: getNewCorrectAnswer(),
			timer: values.timer,
			modifiers: {
				timed: values.timed
			}
		};
		dispatch(saveEditedQuestion(newQuestion));
		setModalOpen(false);
		dispatch(showModal());
	};

	const getCheckedValue = (): string => {
		for (let i = 0; i < question.options.length; i++) {
			// if at any index we find the correct answer, return the appropriate string literal
			if (question.options[i] === question.correct_answer) return `o${i + 1}`;
		}
		return '';
	};

	const initialValues = {
		question: question.question,
		difficulty: question.difficulty,
		o1: question.options[0],
		o2: question.options[1],
		o3: question.options[2],
		o4: question.options[3],
		checked: getCheckedValue(),
		timer: question.timer,
		timed: question.modifiers.timed
	};

	return (
		<Form
			initialValues={initialValues}
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

					<FieldContainer>
						<Field name="difficulty">
							{({ input, meta }) => (
								<>
									<LabelText>Difficulty</LabelText>
									<StyledSelect {...input}>
										<option value="easy">Easy</option>
										<option value="medium">Medium</option>
										<option value="hard">Hard</option>
									</StyledSelect>
								</>
							)}
						</Field>
					</FieldContainer>

					<FieldContainer>
						<Field
							name="checked"
							component="input"
							type="radio"
							value="o1"
							style={{ opacity: 0 }}
						/>
						<OptionLabel name="o1" checked={values.checked}>
							Option 1
						</OptionLabel>
						<StyledInputField
							name="o1"
							component="input"
							type="text"
							checked={values.checked}
						/>
					</FieldContainer>

					<FieldContainer>
						<Field
							name="checked"
							component="input"
							type="radio"
							value="o2"
							style={{ opacity: 0 }}
						/>
						<OptionLabel name="o2" checked={values.checked}>
							Option 2
						</OptionLabel>
						<StyledInputField
							name="o2"
							component="input"
							type="text"
							checked={values.checked}
						/>
					</FieldContainer>

					{question.type !== 'boolean' && (
						<>
							<FieldContainer>
								<Field
									name="checked"
									component="input"
									type="radio"
									value="o3"
									style={{ opacity: 0 }}
								/>
								<OptionLabel name="o3" checked={values.checked}>
									Option 3
								</OptionLabel>
								<StyledInputField
									name="o3"
									component="input"
									type="text"
									checked={values.checked}
								/>
							</FieldContainer>

							<FieldContainer>
								<Field
									name="checked"
									component="input"
									type="radio"
									value="o4"
									style={{ opacity: 0 }}
								/>
								<OptionLabel name="o4" checked={values.checked}>
									Option 4
								</OptionLabel>
								<StyledInputField
									name="o4"
									component="input"
									type="text"
									checked={values.checked}
								/>
							</FieldContainer>
						</>
					)}
					<FieldContainer>
						<Field
							name="timed"
							component="input"
							type="checkbox"
							style={{ opacity: 0 }}
						/>
						<LabelText>Timer</LabelText>
						<StyledInputField
							name="timer"
							component="input"
							type="number"
							min="1"
							disabled={!values.timed}
						/>
					</FieldContainer>

					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
