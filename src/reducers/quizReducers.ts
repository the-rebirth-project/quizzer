import { createReducer } from 'typesafe-actions';
import uuid from 'uuid/v4';
import {
  fetchQuestions,
  startQuiz,
  setPresetId,
  sortQuestion,
  createCustomQuestion,
  saveEditedQuestion,
  deleteQuestion,
  assignPlayerToQuestion,
  addPreset,
  removePreset,
  savePreset,
  changePresetName
} from '../actions';
import { Question, QuizPreset } from '../types';

interface IState {
  readonly questions: Question[];
  readonly started: boolean;
  readonly presets: QuizPreset[];
  readonly curPresetId: string;
}

const initialPresets = [
  {
    id: uuid(),
    presetName: 'New Preset',
    questions: []
  },
  {
    id: uuid(),
    presetName: 'New Preset',
    questions: []
  }
];

const initialState: IState = {
  questions: [],
  started: false,
  presets: JSON.parse(
    window.localStorage.getItem('quizPresets') || JSON.stringify(initialPresets)
  ),
  curPresetId: ''
};

export const quizReducer = createReducer(initialState)
  .handleAction(fetchQuestions, (state, action) => {
    const newPayload = action.payload.map(q => ({
      qId: uuid(),
      ...q
    }));

    return {
      ...state,
      questions: [...state.questions, ...newPayload]
    };
  })
  .handleAction(startQuiz, (state, _) => ({
    ...state,
    started: true
  }))
  .handleAction(setPresetId, (state, action) => ({
    ...state,
    curPresetId: action.payload,
    questions: [
      ...state.presets.filter(p => p.id === action.payload)[0].questions
    ]
  }))
  .handleAction(sortQuestion, (state, action) => ({
    ...state,
    questions: action.payload
  }))
  .handleAction(createCustomQuestion, (state, action) => ({
    ...state,
    questions: [...state.questions, action.payload]
  }))
  .handleAction(saveEditedQuestion, (state, action) => {
    const editedQuestion = state.questions.filter(
      q => q.qId === action.payload.qId
    )[0];

    // overwrite the selected question with the new properties
    const newQuestion = {
      ...editedQuestion,
      ...action.payload
    };

    return {
      ...state,
      questions: state.questions.map(q =>
        q.qId === action.payload.qId ? newQuestion : q
      )
    };
  })
  .handleAction(deleteQuestion, (state, action) => ({
    ...state,
    questions: state.questions.filter(q => q.qId !== action.payload)
  }))
  .handleAction(addPreset, (state, action) => {
    /**
     * Info about Quiz Presets:
     * - A quiz preset describes the id by which the preset will be identified and an array of questions 		 		 which the user specified in the create section
     * - In the config form, the user is asked to select a preset either from the locally saved presets or 			 from a preset uploaded by another user
     */
    const newPresets = [...state.presets, action.payload];
    window.localStorage.setItem('quizPresets', JSON.stringify(newPresets));
    return {
      ...state,
      presets: newPresets
    };
  })
  .handleAction(removePreset, (state, action) => ({
    ...state,
    presets: state.presets.filter(p => p.id !== action.payload)
  }))
  .handleAction(savePreset, (state, action) => ({
    ...state,
    presets: [
      ...state.presets.map(p =>
        p.id === action.payload.id ? action.payload.newPresetData : p
      )
    ]
  }))
  .handleAction(changePresetName, (state, action) => ({
    ...state,
    presets: state.presets.map(p => {
      if (action.payload.id === p.id) {
        return {
          ...p,
          presetName: action.payload.newName
        };
      } else {
        return p;
      }
    })
  }))
  .handleAction(assignPlayerToQuestion, (state, action) => ({
    ...state,
    questions: state.questions.map((q, i) => {
      // NOTE: THIS CODE BREAKS IF NUMBER OF PLAYERS EXCEEDS 4.
      const newQuestion = q;
      const players = action.payload;
      if (players.length > 1) {
        const prevQuestion = state.questions[i - 1];
        let playerI: number = 0;
        if (prevQuestion)
          playerI = players.indexOf(state.questions[i - 1].player);
        const numOfIndices = players.length - 1;
        // we're brute handling all edge cases here. maybe try implementing a better solution?
        if (!prevQuestion) {
          newQuestion.player = players[0];
        } else if (numOfIndices - playerI === 1) {
          newQuestion.player = players[numOfIndices];
        } else if (playerI === 0) {
          newQuestion.player = players[playerI + 1];
        } else {
          newQuestion.player = players[numOfIndices - playerI];
        }
      } else {
        newQuestion.player = players[0];
      }

      return newQuestion;
    })
  }));
