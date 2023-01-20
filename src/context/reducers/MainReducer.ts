import { State } from "../store";

const MainReducer = (state: State, action: any) => {
  switch (action.type) {
    case "SET_UI":
      return {
        ...state,
        activePage: action.payload,
      };

    case "SET_UNLOCK":
      return {
        ...state,
        activePage: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
