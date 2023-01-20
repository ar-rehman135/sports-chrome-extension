import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../const/routeNames";
import { ReducerTypes } from "../../../context/reducer";
import { ContextMain } from "../../../context/store";

import "./styles.scss";

const CloseCreateAccnt = () => {
	const [, dispatch] = React.useContext(ContextMain);

	const navigate = useNavigate();
	const onClick = () => {
		dispatch({
			type: "CLEAR_CREATE_ACCT",
			reducer: ReducerTypes.CreateAccount,
		});
		dispatch({
			type: "SET_UI",
			payload: ROUTES.SIGNUP.url,
			reducer: ReducerTypes.Main,
		});
		navigate(ROUTES.SIGNUP.url);
	};

	return (
		<>
			<a className='close-create-acct' onClick={onClick}>
				<img src='./assets/dismiss_24.png' />
			</a>
		</>
	);
};

export default CloseCreateAccnt;
