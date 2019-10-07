import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import uuid from 'uuid/v4';
import { shuffleArray } from '../../helpers';
import { createCustomQuestion } from '../../actions';
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

interface CreateFormProps {
	setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateForm: React.FC<CreateFormProps> = props => {
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
		setCreateModalOpen(false);
	};

	return (
		<Form
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<Field name="question">
						{({ input, meta }) => (
							<div>
								<label htmlFor="question">Question: </label>
								<input
									{...input}
									type="text"
									placeholder="Enter Your Question"
									required
								/>
							</div>
						)}
					</Field>
					<Field name="difficulty">
						{({ input, meta }) => (
							<div>
								<label htmlFor="difficulty">Difficulty</label>
								<select {...input} name="difficulty">
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
						)}
					</Field>
					<div>
						<label htmlFor="o1">Option 1</label>
						<Field
							name="o1"
							component="input"
							placeholder="First Option"
							required
						/>
						<Field name="checked" component="input" type="radio" value="o1" />
					</div>
					<div>
						<label htmlFor="o2">Option 2</label>
						<Field
							name="o2"
							component="input"
							placeholder="Second Option"
							required
						/>
						<Field name="checked" component="input" type="radio" value="o2" />
					</div>
					<div>
						<label htmlFor="o3">Option 3</label>
						<Field name="o3" component="input" placeholder="Third Option" />
						<Field name="checked" component="input" type="radio" value="o3" />
					</div>
					<div>
						<label htmlFor="o4">Option 4</label>
						<Field name="o4" component="input" placeholder="Fourth Option" />
						<Field name="checked" component="input" type="radio" value="o4" />
					</div>
					<div>
						<label htmlFor="timer">Timer: </label>
						<Field
							name="timer"
							component="input"
							type="number"
							min="1"
							disabled={!values.timed}
						/>
						<Field name="timed" component="input" type="checkbox" />
					</div>

					<button type="submit">Add</button>
				</form>
			)}
		/>
	);
};
