import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { StyledSettings } from "./styles";
import chevron from "../../public/assets/chevron-r-black.svg";
import packageJson from "../../../../extension-wallet/package.json";
import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import { ROUTES } from "../../const/routeNames";

export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [, dispatch] = React.useContext(ContextMain);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "REMOVE_SESSION",
      reducer: ReducerTypes.Auth,
    });
    dispatch({
      type: "SET_UI",
      payload: ROUTES.LOGIN.url,
      reducer: ReducerTypes.Main,
    });
    navigate(ROUTES.LOGIN.url);
  };

  const navigateSecurityPage = () => {
	//   For Now We are commenting that but later may be it can used fot autoLogged Feature.
    // navigate(ROUTES.SECURITY.url)}
  };

  const navigatePrimelabHome = () => {
    window && window.open("https://primelab.io", "_blank");
  };

  return (
    <div>
      <HeaderAccountSelect />
      <StyledSettings>
        <div className="title">Settings</div>
        <div className="section icons"></div>
        <div className="section">
          Seed Phrase
          <img className="chevron" src={chevron} alt="" />
        </div>
        <div className="section">
          Connected Sites
          <img className="chevron" src={chevron} alt="" />
        </div>
        <div className="section" onClick={navigateSecurityPage} >
          Security
          <img className="chevron" src={chevron} alt="" />
        </div>
        <div className="section" onClick={navigatePrimelabHome}>
          About
          <img className="chevron" src={chevron} alt="" />
        </div>
        <div className="section">
          <span className="label">Version</span>
          <span className="value">{packageJson.version}</span>
        </div>
        <div className="section" onClick={handleLogout}>
          Logout
          <img className="chevron" src={chevron} />
        </div>
      </StyledSettings>
    </div>
  );
}
