import { createReducer } from 'typesafe-actions';
import {
	updateScore,
	updatePlayerName,
	addPlayer,
	removePlayer,
	resetScore
} from '../actions';
import { Player } from '../types';

interface IState {
	players: Player[];
}

// players should ideally be dynamically added when the user is presented with the config component to set up the initial settings of the quiz
const initialState: IState = {
	players: [{ id: 1, pName: 'Player 1', score: 0 }]
};

export const scoreboardReducer = createReducer(initialState)
	.handleAction(updateScore, (state, action) => ({
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
	}))
	.handleAction(updatePlayerName, (state, action) => ({
		...state,
		players: state.players.map(p =>
			p.id === action.payload.id
				? {
						id: p.id,
						pName: action.payload.newName,
						score: p.score
				  }
				: p
		)
	}))
	.handleAction(addPlayer, (state, action) => ({
		...state,
		players: [...state.players, action.payload]
	}))
	.handleAction(removePlayer, (state, action) => ({
		...state,
		players: state.players.filter(p => p.id !== action.payload)
	}))
	.handleAction(resetScore, (state, _) => ({
		...state,
		players: state.players.map(p => {
			p.score = 0;
			return p;
		})
	}));
