import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { Modal } from '../Modal';
import { showModal, deleteQuestion } from '../../actions';
import { EditForm } from './EditForm';
import { Question, RootState } from '../../types';
import {
  Root,
  QuestionContainer,
  QuestionNum,
  MetadataContainer,
  Metadata,
  QuestionTextContainer
} from './questionItemStyles';

interface QuestionItemProps {
  question: Question;
  type: string;
  qPos: number;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({
  type,
  question,
  qPos
}) => {
  const dispatch = useDispatch();
  const toolbarSt = useSelector((state: RootState) => state.toolbar);
  const players = useSelector((state: RootState) => state.scoreboard.players);
  const { editModeState, deleteModeState } = toolbarSt;
  // have to use component state so that all of the modals don't open at once
  const [modalOpen, setModalOpen] = useState(false);

  const onQuestionClick = (): void => {
    // only open modal if editMode is set to true
    switch (true) {
      case editModeState:
        dispatch(showModal());
        setModalOpen(true);
        break;
      case deleteModeState:
        dispatch(deleteQuestion(question.qId));
        break;
      default:
        setModalOpen(false);
    }
  };

  return (
    <Root>
      <QuestionContainer onClick={onQuestionClick}>
        <QuestionTextContainer>
          <QuestionNum>{qPos}. </QuestionNum>
          {question.question}
        </QuestionTextContainer>
        {players.length > 1 && question.player && (
          <MetadataContainer>
            <Metadata>Assigned Player: {question.player.pName}</Metadata>
            <Metadata>Difficulty: {question.difficulty}</Metadata>
          </MetadataContainer>
        )}
      </QuestionContainer>
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        key={uuid()}
        aria-labelledby="modal-label"
        aria-describedby="model-desc"
      >
        <EditForm question={question} setModalOpen={setModalOpen} />
      </Modal>
    </Root>
  );
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
