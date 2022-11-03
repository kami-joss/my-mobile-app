import { LOGIN_ACTION } from "../reducers/userReducer";

export const loginAction = (user) => {
    return {
        type: LOGIN_ACTION,
        payload: user,
    };
};