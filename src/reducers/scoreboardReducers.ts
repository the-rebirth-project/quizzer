import { createReducer } from 'typesafe-actions';
import { updateScore } from '../actions';
import { Player } from '../types';

interface IState {
	players: Player[];
}

// players should ideally be dynamically added when the user is presented with the config component to set up the initial settings of the quiz
const initialState: IState = {
	players: [
		{ id: 0, pName: 'Player 1', score: 0 },
		{ id: 1, pName: 'Player 2', score: 0 },
		{ id: 2, pName: 'Player 3', score: 0 }
	]
};

export const scoreboardReducer = createReducer(initialState).handleAction(
	updateScore,
	(state, action) => ({
		...state,
		players: state.players.map(p =>
			p.id === action.payload.id
				? {
						id: p.id,
						pName: p.pName,
						score: p.score + action.payload.score
				  }
				: p
		)
	})
);
