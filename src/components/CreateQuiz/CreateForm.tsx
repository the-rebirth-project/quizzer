import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';
import { shuffleArray } from '../../helpers';
import { createCustomQuestion, showModal } from '../../actions';
import {
	StyledInputField,
	StyledSelect,
	FieldContainer,
	OptionLabel,
	LabelText
} from './formStyles';

interface CreateFormProps {
	setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateForm: React.FC<CreateFormProps> = props => {
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

	const dispatch = useDispatch();
	const { setCreateModalOpen } = props;

	const handleOnSubmit = (values: FormValues) => {
		const options = [values.o1, values.o2, values.o3, values.o4];
		const determineCorrectAnswer = (): string => {
			let correct_answer: string;

			// assigns value of correct_answer based on value of formOptions.checked. by default it returns an error string.
			switch (values.checked) {
				case 'o1':
					correct_answer = options[0];
					break;
				case 'o2':
					correct_answer = options[1];
					break;
				case 'o3':
					correct_answer = options[2];
					break;
				case 'o4':
					correct_answer = options[3];
					break;
				default:
					correct_answer = options[0];
			}

			return correct_answer;
		};

		const correct_answer = determineCorrectAnswer();

		// lay out initial structure of the custom question
		const customQuestion = {
			qId: uuid(),
			question: values.question,
			difficulty: values.difficulty,
			category: 'custom',
			type:
				options.includes('True') || options.includes('False')
					? 'boolean'
					: 'multiple',
			incorrect_answers: options.filter(o => o !== correct_answer),
			correct_answer,
			options,
			timer: values.timer,
			player: { id: 0, pName: '', score: 0 },
			modifiers: {
				timed: values.timed,
				rapidfire: false
			}
		};
		// shuffle options prop if type is not boolean (True/False Questions)
		if (customQuestion.type !== 'boolean')
			customQuestion.options = shuffleArray([
				...customQuestion.incorrect_answers,
				customQuestion.correct_answer
			]);

		dispatch(createCustomQuestion(customQuestion));
		dispatch(showModal());
		setCreateModalOpen(false);
	};

	return (
		<Form
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<FieldContainer>
						<LabelText>Question</LabelText>
						<StyledInputField
							name="question"
							component="input"
							type="text"
							placeholder="Enter your question"
							required
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

					<FieldContainer>
						<Field name="timed" component="input" type="checkbox" />
						<LabelText>Timer</LabelText>
						<StyledInputField
							name="timer"
							component="input"
							type="number"
							min="1"
							disabled={!values.timed}
						/>
					</FieldContainer>

					<button type="submit">Add</button>
				</form>
			)}
		/>
	);
};
