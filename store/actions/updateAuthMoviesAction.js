import { UPDATE_AUTH_MOVIES_ACTION } from "../reducers/userReducer";

export const updateAuthMoviesAction = (movies) => {
    return {
        type: UPDATE_AUTH_MOVIES_ACTION,
        payload: movies,
    };
}