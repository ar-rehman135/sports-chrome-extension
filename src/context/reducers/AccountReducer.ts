import { State } from "../store";

const AccountReducer = (state: State, action: any) => {
  switch (action.type) {
    case "SET_CREATE_ACCT":
      return {
        ...state,
        createAccountData: action.payload,
      };
    case "CLEAR_CREATE_ACCT":
      return {
        ...state,
        createAccountData: {
          email: "",
          countryCode: "",
          phone: "",
          type: 0,
          firstName: "",
          walletName: "",
          phrase: "",
          status: 0,
        },
      };
    default:
      return state;
  }
};

export default AccountReducer;
