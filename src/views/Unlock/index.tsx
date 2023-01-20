import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../const/routeNames";
import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import InputVerification from "../../components/common/InputVerification";

import "./styles.scss";

export default function Unlock() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [state, dispatch] = React.useContext(ContextMain);
  const [code, setCode] = useState<string>("");
  const passcode = useState(
    state.createAccountData.passcode
  );

  useEffect(() => {
    setIsValid(code.length === 6 && code === String(passcode[0]));
  }, [code]);


  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.UNLOCK.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  const clickContinue = () => {
    dispatch({
      type: "SET_UNLOCK",
      payload: ROUTES.DASHBOARD.url,
      reducer: ReducerTypes.Main,
    });
    navigate(ROUTES.DASHBOARD.url);
  };

  return (
    <main className="unlock">
      <img className="unlock__top" src="./assets/top-Illustration.png" />
      <img className="unlock__logo" src="./assets/logo2.png" />
      <span className="unlock__header">
        {" "}
        a web3 gateway to hidden experiences
      </span>

      <h1>Welcome back!</h1>
      <span className="unlock__text">
        Please enter the passcode to <br /> unlock this wallet
      </span>
      <InputVerification fieldName="code" />
      <button
        disabled={!isValid}
        className="button"
        onClick={clickContinue}
      >
        Unlock
      </button>
    </main>
  );
}
