import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../actions';
import { RootState } from '../../types';
import { Root, Content } from './styles';

export const Modal: React.FC = ({ children }) => {
	const dispatch = useDispatch();
	const open = useSelector((state: RootState) => state.modal.open);

	const onClickOutside = (): void => {
		dispatch(openModal());
	};

	return (
		<Root open={open} onClick={onClickOutside}>
			<Content>{children}</Content>
		</Root>
	);
};
