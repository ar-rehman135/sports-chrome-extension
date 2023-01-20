import { State } from "../store";

const LoginReducer = (state: State, action: any) => {
  switch (action.type) {
    case "CREATE_SESSION": {
      return {
        ...state,
        token: action?.payload?.jwtAccessToken,
        user: {
          ...action.payload?.user,
        },
      };
    }

    case "REMOVE_SESSION":
      return {
        ...state,
        token: "",
        user: {},
      };
    default:
      return state;
  }
};

export default LoginReducer;
