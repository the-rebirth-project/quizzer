import React from 'react';
import { Root, Content } from './styles';

type setOpen = {
	(): void;
};

interface ModalProps {
	modalOpen: boolean;
	setOpen: setOpen;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	modalOpen,
	setOpen
}) => {
	const onClickAway = (): void => {
		setOpen();
	};

	return (
		<Root open={modalOpen} onClick={onClickAway}>
			<Content>{children}</Content>
		</Root>
	);
};
