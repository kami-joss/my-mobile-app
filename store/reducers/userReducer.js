const initialState = {
    user: null,
};

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const UPDATE_AUTH_MOVIES_ACTION = 'UPDATE_AUTH_MOVIES_ACTION';

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_ACTION":
      return {
        ...state,
        user: null,
      };
    case "UPDATE_AUTH_MOVIES_ACTION":
      return {
        ...state,
        user: {...state.user, movies: action.payload},
      };
    default:
      return state;
  }
}