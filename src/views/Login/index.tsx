import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLoginWithWallet } from "../../hooks/api/user";

import { ReducerTypes } from "../../context/reducer";
import { ContextMain } from "../../context/store";
import loginSchema from "../../validation/loginSchema";

import "./styles.scss";
import { ROUTES } from "../../const/routeNames";
import { getErrorMessage } from "../../utils/utils";
import HeaderTitle from "../../components/layouts/HeaderTitle";
import { NEAR_WALLET_TYPE } from "../../constants/api";

interface LoginValues {
	walletName: string;
}

const Login = () => {
	const [, dispatch] = React.useContext(ContextMain);
	const navigate = useNavigate();

	const { loginWithWallet, isLoggingIn } = useLoginWithWallet();

	const initialValues: LoginValues = {
		walletName: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: loginSchema,
		validateOnMount: true,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: async (values: LoginValues) => {
			console.info({ values });
			await loginWithWallet(`${values.walletName + NEAR_WALLET_TYPE}`, {
				onSuccess: (response: any) => {
					dispatch({
						type: "SET_LOGIN_ACCOUNT",
						payload: {
							walletName: `${values.walletName + NEAR_WALLET_TYPE}`,
							type: response.type,
							...response,
						},
						reducer: ReducerTypes.Login,
					});
					navigate(ROUTES.VERIFICATION.url);
				},
				onError: (error: any) => {
					formik.errors.walletName = getErrorMessage(error);
				},
			});
		},
	});

	const navigateToSignUp = () => {
		dispatch({
			type: "SET_UI",
			payload: ROUTES.SIGNUP.url,
			reducer: ReducerTypes.Main,
		});
		navigate(ROUTES.SIGNUP.url);
	};

	return (
		<main>
			<HeaderTitle
				title='Login with NEAR account'
				onCrossIconClick={navigateToSignUp}
			/>
			<section className='home'>
				<form onSubmit={formik.handleSubmit}>
					<div className='home__near-login'>
						<span className='home__question'> Already have NEAR account?</span>
						<div className='accountId_after' data-walletType={NEAR_WALLET_TYPE}>
							<input
								placeholder='john'
								id='walletName'
								name='walletName'
								className={`accountId_input ${
									formik.errors.walletName ? "wrong" : ""
								}`}
								value={formik.values.walletName}
								onPaste={formik.handleChange}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{!!formik.values.walletName &&
								!!formik.touched.walletName &&
								!!formik.errors.walletName && (
									<p className='error-text'> {formik.errors.walletName}</p>
								)}
						</div>

						<button
							disabled={!!formik.touched && !formik.isValid}
							className='button with-icon home__button'
							type='submit'
							onClick={(e: any) => formik.handleSubmit(e)}>
							Continue {isLoggingIn ? "..." : ""}
							<img src='/assets/svg/chevron-right-icon.svg' alt='right' />
						</button>

						<p className='home__terms-disclaimer'>
							by clicking continue you must agree to near labs
							<a> Terms & Conditions</a> ans <a> Privacy Policy</a>
						</p>
						<hr />
						<div className='home__redirection'>
							<p className='home__redirection__text'>
								Don't have NEAR account?
							</p>
							<a onClick={navigateToSignUp} className='home__redirection__link'>
								Sign Up
							</a>
						</div>
					</div>
				</form>
			</section>
		</main>
	);
};

export default Login;
