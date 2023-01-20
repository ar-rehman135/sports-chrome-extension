import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import axios from "axios";

import CloseCreateAccnt from "../../components/common/CloseCreateAccnt";
import InputVerification from "../../components/common/InputVerification";
import HeaderBg from "../../components/layouts/HeaderBg";
import { ROUTES } from "../../const/routeNames";
import { ReducerTypes } from "../../context/reducer";
import { ContextMain } from "../../context/store";

import "./styles.scss";
import { useLoginWithWallet, useVerifyUser } from "../../hooks/api/user";
import { verificationSchema } from "./schema";
import { getErrorMessage } from "../../utils/utils";

interface VerificationValues {
  walletName: string;
  code: string;
}

const Verification = () => {
  const TITLE_NAME = ROUTES.VERIFICATION.title;

  const [isOTPResending, setOTPResending] = useState<boolean>(false);
  const { verifyUser, isVerifying } = useVerifyUser();
  const { loginWithWallet, isLoggingIn } = useLoginWithWallet();
  const [state, dispatch] = React.useContext(ContextMain);
  console.info({ state });

  const initialValues: VerificationValues = {
    walletName: state.user?.walletName,
    code: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: verificationSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: VerificationValues) => {
      await verifyUser(values, {
        onSuccess: (session: any) => {

          //response from verification endpoint

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${session.jwtAccessToken}`;

          dispatch({
            type: "CREATE_SESSION",
            payload: session,
            reducer: ReducerTypes.Auth,
          });
          navigate(ROUTES.DASHBOARD.url);
        },
        onError: (error: any) => {
          formik.errors.code = getErrorMessage(error);
        },
      });
    },
  });

  const handleResendOTP = async () => {
    setOTPResending(true)
    await loginWithWallet(`${initialValues.walletName}`, {
      onSuccess: () => {
        setOTPResending(false)
      },
      onError: (error: any) => {
        formik.errors.walletName = getErrorMessage(error);
        setOTPResending(false)
      },
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.VERIFICATION.url,
      reducer: ReducerTypes.Main,
    });
  }, []);


  const handleSendToDifferentEmail = () => {
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
    <main>
      <HeaderBg>
        <>
          <p className="header-title">{TITLE_NAME}</p>
          <CloseCreateAccnt />
        </>
      </HeaderBg>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <section className="verification">
            <div className="verification__text">
              We've sent a 6-digit verification code to{" "}
              {state?.user?.channelType === "email" ? "you email address" : "your phone"}{" "}
              <br />
              <p className="phone_email">
                {state?.user?.phone || state?.user?.email}
              </p>
            </div>
            <InputVerification fieldName="code" />
            {formik.errors.code && (
              <p className="error-text"> {formik.errors.code}</p>
            )}
            <button
              disabled={isVerifying}
              className="button home__button"
              type="submit"
            >
              Continue {isVerifying ? "..." : ""}
            </button>
            <div className="verification__question">
              Didn't receive your code?
            </div>
            <a  onClick ={handleSendToDifferentEmail} className="verification__link">
              Send to a different email address
            </a>
            <a onClick={handleResendOTP} className="verification__link">{isOTPResending ? 'Resending..' : 'Resend Your Code'} </a>
          </section>
        </FormikProvider>
      </form>
    </main>
  );
};

export default Verification;