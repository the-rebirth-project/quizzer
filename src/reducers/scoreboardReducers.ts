import { createReducer } from 'typesafe-actions';
import {
  updateScore,
  updatePlayerName,
  addPlayer,
  removePlayer,
  resetScore,
  changePlayerName,
  setPlayerRanking
} from '../actions';
import { Player } from '../types';

/**
 * playerRankingPositions is an array with Players arranged in such a way that the player at 0th index would be at first position and the player at last index would be at last position
 * shitty solution. I know
 */

interface IState {
  players: Player[];
  playerRankingPositions: Player[];
}

// players should ideally be dynamically added when the user is presented with the config component to set up the initial settings of the quiz
const initialState: IState = {
  players: [{ id: 1, pName: 'Player 1', score: 0 }],
  playerRankingPositions: []
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
  }))
  .handleAction(changePlayerName, (state, action) => ({
    ...state,
    players: state.players.map(p => {
      if (action.payload.id === p.id) {
        return {
          ...p,
          pName: action.payload.newName
        };
      } else {
        return p;
      }
    })
  }))
  .handleAction(setPlayerRanking, (state, action) => ({
    ...state,
    playerRankingPositions: action.payload
  }));
