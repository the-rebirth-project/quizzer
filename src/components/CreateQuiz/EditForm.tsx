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
	}
	const { question, setEditModalOpen } = props;
	const dispatch = useDispatch();

	const onFormSubmit = (values: Values) => {
		const newQuestion = {
			...question,
			question: values.question,
			difficulty: values.difficulty,
			options: [values.o1, values.o2, values.o3, values.o4]
		};
		dispatch(saveEditedQuestion(newQuestion));
		setEditModalOpen(false);
	};

	const initialValues = {
		question: question.question,
		difficulty: question.difficulty,
		o1: question.options[0],
		o2: question.options[1],
		o3: question.options[2],
		o4: question.options[3]
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
					</div>
					<div>
						<label>Option 2</label>
						<Field name="o2" component="input" type="text" />
					</div>
					<div>
						<label>Option 3</label>
						<Field name="o3" component="input" type="text" />
					</div>
					<div>
						<label>Option 4</label>
						<Field name="o4" component="input" type="text" />
					</div>
					<button type="submit">Save!</button>
				</form>
			)}
		/>
	);
};
