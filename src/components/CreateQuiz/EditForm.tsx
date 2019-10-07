import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { saveEditedQuestion } from '../../actions';
import { Question } from '../../types';
import {
	StyledLabel,
	StyledInputField,
	StyledSelect,
	FieldContainer
} from './formStyles';

interface EditFormProps {
	question: Question;
	setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditForm: React.FC<EditFormProps> = props => {
	interface Values {
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

	const { question, setEditModalOpen } = props;
	const dispatch = useDispatch();

	const onFormSubmit = (values: Values) => {
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
		setEditModalOpen(false);
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
						<StyledLabel>
							Question{' '}
							<StyledInputField
								name="question"
								component="input"
								type="text"
								placeholder="Enter New Question"
							/>
						</StyledLabel>
					</FieldContainer>
					<Field name="difficulty">
						{({ input, meta }) => (
							<StyledLabel>
								Difficulty{' '}
								<StyledSelect {...input}>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</StyledSelect>
							</StyledLabel>
						)}
					</Field>
					<FieldContainer>
						<StyledLabel>
							<Field name="checked" component="input" type="radio" value="o1" />
							Option 1{' '}
							<StyledInputField name="o1" component="input" type="text" />
						</StyledLabel>
					</FieldContainer>

					<FieldContainer>
						<StyledLabel>
							<Field name="checked" component="input" type="radio" value="o2" />
							Option 2{' '}
							<StyledInputField name="o2" component="input" type="text" />
						</StyledLabel>
					</FieldContainer>

					{question.type !== 'boolean' && (
						<>
							<FieldContainer>
								<StyledLabel>
									<Field
										name="checked"
										component="input"
										type="radio"
										value="o3"
									/>
									Option 3{' '}
									<StyledInputField name="o3" component="input" type="text" />
								</StyledLabel>
							</FieldContainer>

							<FieldContainer>
								<StyledLabel>
									<Field
										name="checked"
										component="input"
										type="radio"
										value="o4"
									/>
									Option 4
									<StyledInputField name="o4" component="input" type="text" />
								</StyledLabel>
							</FieldContainer>
						</>
					)}
					<FieldContainer>
						<StyledLabel>
							<Field name="timed" component="input" type="checkbox" />
							Timer
							<StyledInputField
								name="timer"
								component="input"
								type="number"
								min="1"
								disabled={!values.timed}
							/>
						</StyledLabel>
					</FieldContainer>

					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
