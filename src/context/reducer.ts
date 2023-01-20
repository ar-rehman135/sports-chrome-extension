import AccountReducer from "./reducers/AccountReducer";
import LoginReducer from "./reducers/LoginReducer";
import AuthReducer from "./reducers/AuthReducer";
import MainReducer from "./reducers/MainReducer";
import { State } from "./store";
import SettingReducer from "./reducers/SettingReducer";

export const ReducerTypes = {
  Main: "MAIN",
  CreateAccount: "CREATE-ACCOUNT",
  Login: "LOGIN",
  Auth: "AUTH",
  SETTING: "SETTING",
};

const Reducer = (state: State, action: any) => {
  switch (action.reducer) {
    case ReducerTypes.CreateAccount:
      return AccountReducer(state, action);
    case ReducerTypes.Login:
      return LoginReducer(state, action);
    case ReducerTypes.Auth:
      return AuthReducer(state, action);
    case ReducerTypes.SETTING:
      return SettingReducer(state, action);
    default:
      return MainReducer(state, action);
  }
};

export default Reducer;
