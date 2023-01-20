import React from "react";

import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { StyledSettings } from "./styles";
import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import { ROUTES } from "../../const/routeNames";
import { AutoLogin } from "../../public/assets/svg/auto-login";

export default function Settings() {
	const [state, dispatch] = React.useContext(ContextMain);

	const handleSwitchToggle = () => {
		if (state?.setting?.autoLogin) {
			dispatch({
				type: "OFF_AUTO_LOGIN",
				reducer: ReducerTypes.SETTING,
			});
		} else {
			dispatch({
				type: "ON_AUTO_LOGIN",
				reducer: ReducerTypes.SETTING,
			});
		}
	};

	return (
		<div>
			<HeaderAccountSelect />
			<StyledSettings>
				<div className='title'>{ROUTES.SECURITY.title}</div>
				<div className="tool-tip-wrapper">
					Allow auto login
					<div className="tooltip">
						<AutoLogin />
						<span className="tooltiptext">Allow near app to auto login</span>
					</div>
				</div>
				<div className="switch-wrapper">
					<label className="switch">
						<input type="checkbox" checked={state?.setting?.autoLogin} onChange={handleSwitchToggle} />
						<span className="slider round"></span>
					</label>
				</div>
			</StyledSettings>
		</div>
	);
}