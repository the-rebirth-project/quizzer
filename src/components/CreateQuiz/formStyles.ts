import styled from 'styled-components';
import { Field } from 'react-final-form';

interface SInputProps {
	checked: string;
}

interface OptionLabelProps extends SInputProps {
	name: string;
}

export const StyledSelect = styled.select`
	background-color: ${props => props.theme.colors.grey};
	border-radius: 1rem;
	color: ${props => props.theme.colors.secondary};
	padding: 0.5rem 0.8rem;
	outline: none;
	border: none;
	font-size: 1.8rem;
	box-shadow: 3px 3px 6px rgba(46, 46, 46, 0.2);
	flex: 0 0 70%;
	margin-left: 1rem;
	font-family: inherit;
`;

export const StyledLabel = styled.label`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	text-align: right;
	line-height: 2.6rem;
	margin-bottom: 1rem;
	width: 100%;
`;

export const LabelText = styled.span`
	text-transform: uppercase;
`;

export const OptionLabel = styled(LabelText)<OptionLabelProps>`
	cursor: pointer;
	color: ${props =>
		props.name === props.checked
			? props.theme.colors.primary
			: props.theme.colors.grey};
`;

export const StyledInput = styled.input`
	background-color: ${props => props.theme.colors.grey};
	border-radius: 1rem;
	color: ${props => props.theme.colors.secondary};
	padding: 0.5rem 0.8rem;
	outline: none;
	border: none;
	font-size: 1.8rem;
	box-shadow: 3px 3px 6px rgba(46, 46, 46, 0.2);
	flex: 0 0 70%;
	margin-left: 1rem;
	font-family: inherit;
`;

// WORKAROUND TO FIX INITIAL VALUES NOT APPEARING. IMPLEMENT A BETTER SOLUTION
export const StyledInputField = styled(Field)<SInputProps>`
	background-color: ${props =>
		props.name === props.checked
			? props.theme.colors.primary
			: props.theme.colors.grey};
	border-radius: 1rem;
	color: ${props => props.theme.colors.secondary};
	padding: 0.5rem 0.8rem;
	outline: none;
	border: none;
	font-size: 1.8rem;
	flex: 0 0 70%;
	margin-left: 1rem;
	font-family: inherit;
`;

export const FieldContainer = styled.div`
	display: flex;
	align-items: center;
`;
