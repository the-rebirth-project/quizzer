import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { quizReducer } from './quizReducers';
import { questionReducer } from './questionReducers';
import { modalReducer } from './modalReducers';
import { toolbarReducer } from './toolbarReducers';
import { scoreboardReducer } from './scoreboardReducers';
import { logReducer } from './logReducers';
import { snackbarReducer } from './snackbarReducers';

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    quiz: quizReducer,
    question: questionReducer,
    modal: modalReducer,
    toolbar: toolbarReducer,
    scoreboard: scoreboardReducer,
    log: logReducer,
    snackbar: snackbarReducer
  });
