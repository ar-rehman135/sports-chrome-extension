import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

import { useForm } from "../../hooks/useForm";
import HeaderBg from "../../components/layouts/HeaderBg";
import { ROUTES } from "../../const/routeNames";
import { ContextMain } from "../../context/store";
import ProgressBar from "../../components/common/ProgressBar";
import CloseCreateAccnt from "../../components/common/CloseCreateAccnt";
import { ReducerTypes } from "../../context/reducer";
import { useFormik, FormikProvider } from "formik";

import "./styles.scss";
import passcodeSchema from "./schema";
import InputVerification from "../../components/common/InputVerification";
import { useCreatePasscode, useGetAccountDetails } from "../../hooks/api/user";

const Secure = () => {
  const { createPasscode, isCreatingPasscode } = useCreatePasscode();
  const { accountDetails, isGettingDetails } = useGetAccountDetails();
  const [, dispatch] = React.useContext(ContextMain);
  const initialValues: any = {
    code: "",
    repeatCode: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: passcodeSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      await createPasscode(values.code, {
        onSuccess: () => {
          navigate(ROUTES.DASHBOARD.url);
        },
        onError: () => {
          formik.setFieldError("code", "Could not generate passcode");
        },
      });
    },
  });

  const navigate = useNavigate();
  const [state] = React.useContext(ContextMain);

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.SECURE.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  console.info({ values: formik.values, errors: formik.errors });

  return (
    <main>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <HeaderBg>
            <>
              <p className="header-title">{ROUTES.SECURE.title}</p>
              <CloseCreateAccnt />
            </>
          </HeaderBg>
          <ProgressBar percentage={70} />
          <section className="secure">
            <p className="secure__description">
              Keep your apps safe from other with access to your computer.
            </p>
            <label htmlFor="password" className="secure__label">
              Passcode
            </label>
            <InputVerification fieldName="code" />
            {formik.touched.code && formik.errors.code && (
              <p className="error-text"> {formik.errors.code}</p>
            )}
            <label htmlFor="repeatPassword" className="secure__label">
              Repeat Passcode
            </label>
            <InputVerification fieldName="repeatCode" />
            {formik.touched.repeatCode && formik.errors.repeatCode && (
              <p className="error-text"> {formik.errors.repeatCode}</p>
            )}
            <button
              disabled={isCreatingPasscode}
              className="button secure__button"
              onClick={() => formik.handleSubmit()}
            >
              Continue {isCreatingPasscode ? "..." : ""}
            </button>
            <div className="email-label"> {state.createAccountData.email}</div>

            <p>
              By creating a NEAR account, you agree to the NEAR
              <br />
              Wallet <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </p>
          </section>
        </form>
      </FormikProvider>
    </main>
  );
};

export default Secure;
