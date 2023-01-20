import { State } from "../store";

const LoginReducer = (state: State, action: any) => {
  switch (action.type) {
    case "SET_LOGIN_ACCOUNT":
      return {
        ...state,
        user: {
          walletName: action.payload.walletName,
          type: action.payload.type,
          ...action.payload,
        },
      };
    case "CLEAR_LOGIN_ACCOUNT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default LoginReducer;
