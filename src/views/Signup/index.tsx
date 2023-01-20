import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import HeaderBg from "../../components/layouts/HeaderBg";

import { ROUTES } from "../../const/routeNames";
import { CreateAccountData } from "../../context/models";
import { ReducerTypes } from "../../context/reducer";
import { ContextMain } from "../../context/store";
import { EmailSchema, PhoneSchema } from "../../validation/signUpSchema";

import "./styles.scss";

const Signup = () => {
  const initialValues: CreateAccountData = {
    mode: "email",
    email: "",
    phone: "",
    countryCode: "",
  };

  const [, dispatch] = React.useContext(ContextMain);
  const navigate = useNavigate();
  const [type, setType] = useState<string>('email');


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: type === "email" ? EmailSchema : PhoneSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      dispatch({
        type: "SET_CREATE_ACCT",
        payload: values,
        reducer: ReducerTypes.CreateAccount,
      });
      navigate(ROUTES.CREATE_ACCT.url);
    },
  });

  const changeMode = (mode: string) => {
    formik.resetForm();
    formik.setFieldValue("mode", mode);
    setType(mode);
  };

  const navigateToLogin = () => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.LOGIN.url,
      reducer: ReducerTypes.Main,
    });
    navigate(ROUTES.LOGIN.url);
  }

  const setPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    formik.handleChange(event)
  }
  const setCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    const finalValue = num ? `+${num}` : '';
    event.target.value = finalValue
    formik.handleChange(event)
  };

  return (
    <main>
      <HeaderBg>
        <img className="header-bg__logo" src="./assets/logo.png" />
      </HeaderBg>
      <section className="home">
        <div className="home__selectors">
          <a
            className={
              (formik.values.mode === "email" ? " --btn-active" : "") +
              " home__selectors__button"
            }
            onClick={() => changeMode("email")}
          >
            Email
          </a>
          <a
            className={
              (formik.values.mode === "phone" ? " --btn-active" : "") +
              " home__selectors__button"
            }
            onClick={() => changeMode("phone")}
          >
            Phone
          </a>
        </div>
        {formik.values.mode === "email" && (
          <>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onPaste={formik.handleChange}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={"johndoe@gmail.com"}
              className="home__input"
            />
            {!!formik.values.email &&
              !!formik.touched.email &&
              !!formik.errors.email && (
                <p className="error-text"> {formik.errors.email}</p>
              )}
          </>
        )}
        {formik.values.mode === "phone" && (
          <div className="home_phone_input">
            <input
              type="text"
              id="countrycode"
              name="countryCode"
              value={formik.values.countryCode}
              onBlur={formik.handleBlur}
              onChange={setCountry}
              placeholder={"+1"}
              className="home__input"
            />
            <input
              type="text"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={setPhoneNumber}
              placeholder={"Ex. (373) 378 8383"}
              className="home__input"
            />
          </div>
        )}
        {!!formik.values.countryCode &&
          !!formik.errors.countryCode &&
          !!formik.touched.countryCode && (
            <p className="error-text"> {formik.errors.countryCode}</p>
          )}
        {!!formik.values.phone &&
          !!formik.errors.phone &&
          !!formik.touched.phone && (
            <p className="error-text"> {formik.errors.phone}</p>
          )}
        <button
          disabled={!!formik.touched && !formik.isValid}
          className="button with-icon home__button"
          type="submit"
          onClick={(e: any) => formik.handleSubmit(e)}
        >
          Continue
          <img src="/assets/svg/chevron-right-icon.svg" alt="right" />
        </button>
        <p className="home__terms-disclaimer">
          by clicking continue you must agree to near labs
          <a> Terms & Conditions</a> ans <a> Privacy Policy</a>
        </p>
        <hr />
        <div className="home__redirection">
          <p className="home__redirection__text">Already have NEAR account?</p>
          <a onClick={navigateToLogin} className="home__redirection__link">
            Log in with NEAR
          </a>
        </div>
      </section>
    </main>
  );
};

export default Signup;
