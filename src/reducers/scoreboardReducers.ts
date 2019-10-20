import { createReducer } from 'typesafe-actions';
import { updateScore } from '../actions';
import { Team } from '../types';

interface IState {
	teams: Team[];
}

// teams should ideally be dynamically added when the user is presented with the config component to set up the initial settings of the quiz
const initialState: IState = {
	teams: [
		{ id: 0, tName: 'Team 1', score: 0 },
		{ id: 1, tName: 'Team 2', score: 0 },
		{ id: 2, tName: 'Team 3', score: 0 }
	]
};

export const scoreboardReducer = createReducer(initialState).handleAction(
	updateScore,
	(state, action) => ({
		...state,
		teams: state.teams.map(t =>
			t.id === action.payload.id
				? {
						id: t.id,
						tName: t.tName,
						score: t.score + action.payload.score
				  }
				: t
		)
	})
);
