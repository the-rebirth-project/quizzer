import React from 'react';
import { useDispatch } from 'react-redux';
import { Root, Background, Content } from './styles';

interface ModalProps {
	open: boolean;
	onModalClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	open,
	onModalClose
}) => {
	const dispatch = useDispatch();

	const onClickOutside = (): void => {
		dispatch(onModalClose());
	};

	return (
		<Root open={open}>
			<Background onClick={onClickOutside} />
			<Content>{children}</Content>
		</Root>
	);
};
