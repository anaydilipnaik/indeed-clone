import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_RESUME,
} from "../constants/ActionTypes";

const initialState = {
  user: {},
  error: false,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.payload[0][0],
        token: action.payload[1],
        error: false,
      };
    case LOGIN_USER_ERROR:
      return {
        user: {},
        token: null,
        error: true,
      };
    case LOGOUT_USER:
      return {
        user: {},
        token: null,
        error: false,
      };
    case UPDATE_RESUME:
      return {
        user: action.payload.user,
        token: action.payload.token,
        error: false,
      };
    default:
      return state;
  }
}
