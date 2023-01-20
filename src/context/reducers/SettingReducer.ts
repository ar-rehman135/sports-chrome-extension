import { State } from "../store";

const SettingReducer = (state: State, action: any) => {
  switch (action.type) {
    case "ON_AUTO_LOGIN": {
      return {
        ...state,
        setting: {
          autoLogin: true,
        },
      };
    }
    case "OFF_AUTO_LOGIN": {
      return {
        ...state,
        setting: {
          autoLogin: false,
        },
      };
    }
    default:
      return state;
  }
};

export default SettingReducer;
