import { StateType, ActionType } from 'typesafe-actions';
import { store } from '../store';
import { rootReducer } from '../reducers';

export type Store = StateType<typeof store>;
export type RootAction = ActionType<typeof import('../actions')>;
export type RootState = StateType<ReturnType<typeof rootReducer>>;
