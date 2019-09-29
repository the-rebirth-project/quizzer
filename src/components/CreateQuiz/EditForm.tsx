import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { saveEditedQuestion } from '../../actions';
import { Question } from '../../types';

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
	}

	const { question, setEditModalOpen } = props;
	const dispatch = useDispatch();

	const onFormSubmit = (values: Values) => {
		const newMCQQuestion = {
			...question,
			question: values.question,
			difficulty: values.difficulty,
			options: [values.o1, values.o2, values.o3, values.o4]
		};
		const newBooleanQuestion = {
			...question,
			question: values.question,
			difficulty: values.difficulty,
			options: [values.o1, values.o2]
		};
		// if the question is of boolean type, dispatch the action with the altered question object
		question.type === 'multiple'
			? dispatch(saveEditedQuestion(newMCQQuestion))
			: dispatch(saveEditedQuestion(newBooleanQuestion));
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
		checked: getCheckedValue()
	};

	return (
		<Form
			initialValues={initialValues}
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit}>
					<Field name="question">
						{({ input, meta }) => (
							<div>
								<label>Question: </label>
								<input
									{...input}
									type="text"
									placeholder="Enter New Question"
									required
								/>
							</div>
						)}
					</Field>
					<Field name="difficulty">
						{({ input, meta }) => (
							<div>
								<label>Difficulty: </label>
								<select {...input}>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
						)}
					</Field>
					<div>
						<label>Option 1</label>
						<Field name="o1" component="input" type="text" />
						<Field name="checked" component="input" type="radio" value="o1" />
					</div>
					<div>
						<label>Option 2</label>
						<Field name="o2" component="input" type="text" />
						<Field name="checked" component="input" type="radio" value="o2" />
					</div>
					{question.type !== 'boolean' && (
						<>
							<div>
								<label>Option 3</label>
								<Field name="o3" component="input" type="text" />
								<Field
									name="checked"
									component="input"
									type="radio"
									value="o3"
								/>
							</div>
							<div>
								<label>Option 4</label>
								<Field name="o4" component="input" type="text" />
								<Field
									name="checked"
									component="input"
									type="radio"
									value="o4"
								/>
							</div>
						</>
					)}
					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
