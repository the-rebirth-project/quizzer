import React, { useMemo, useState } from 'react';
import { Modal } from '../Modal';
import { SortableElement } from 'react-sortable-hoc';
import { Root } from './questionItemStyles';

const WrappedComponent: React.FC<{ type: string }> = ({ type }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const memoizedOpen = useMemo(() => modalOpen, [modalOpen]);

	const setOpen = (): void => {
		setModalOpen(!modalOpen);
	};

	return (
		<Root>
			{type === 'random' && <h3>Random</h3>}
			{type === 'custom' && <h3>Custom</h3>}
			<button onClick={setOpen}>Click me to Open Modal!</button>
			<Modal
				aria-labelledby="modal-label"
				aria-describedby="model-desc"
				modalOpen={memoizedOpen}
				setOpen={setOpen}
			>
				<h1 id="modal-label">I'm a Modal!</h1>
				<p id="modal-desc">I'm a non-animated Modal!</p>
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
