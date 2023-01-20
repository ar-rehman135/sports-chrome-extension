import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderBg from "../../components/layouts/HeaderBg";
import { ROUTES } from "../../const/routeNames";
import { ContextMain } from "../../context/store";
import SeedPhraseContainer from "../../components/common/SeedPhraseContainer";
import CloseCreateAccnt from "../../components/common/CloseCreateAccnt";
import { ReducerTypes } from "../../context/reducer";

import "./styles.scss";

const SeedPhrasePage = () => {
  const [, dispatch] = React.useContext(ContextMain);

  const [seed] = useState<any>([
    "house",
    "engage",
    "fethear",
    "plant",
    "incego",
    "dental",
    "sick",
    "fungus",
    "river",
    "morning",
    "love",
    "cow",
  ]);

  const onClick = () => {
    navigator.clipboard.writeText(seed.join(" "));
  };

  const navigate = useNavigate();

  const clickContinue = () => {
    navigate(ROUTES.UNLOCK.url);
  };
  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.SEED_PHRASE.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  return (
    <main>
      <HeaderBg>
        <>
          <p className="header-title">{ROUTES.SEED_PHRASE.title}</p>
          <CloseCreateAccnt />
        </>
      </HeaderBg>
      <section className="seed-phrase">
        <p className="seed-phrase__description">
          Keep your apps safe from other with access to your computer..
        </p>
        <SeedPhraseContainer seedPhrases={seed} />
        <a className="seed-phrase__link" onClick={onClick}>
          <img src="./assets/clipboard.png" alt="" /> Copy seed
        </a>
        <button className="button" onClick={clickContinue}>
          Continue to Login
        </button>
      </section>
    </main>
  );
};

export default SeedPhrasePage;
