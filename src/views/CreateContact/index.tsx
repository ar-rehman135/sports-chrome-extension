import React from "react";
import Modal from "react-modal";

import {
  Button,
  Form,
  Label,
  Title,
  Input,
  TitleWrapper,
  ImageUpload,
} from "./styles";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { useContact } from "../../hooks/api/contacts";
import { useFormik } from "formik";
import SnackBar, { SnackBarType } from "@/components/core/SnackBar/SnackBar";

import { useState } from "react";
import createContactSchema from "../../validation/createContactSchema";
import { useNavigate } from "react-router";
import { ROUTES } from "../../const/routeNames";
import { getUserIdFromToken } from "../../utils/utils";
import { NEAR_WALLET_TYPE } from "../../constants/api";

Modal.setAppElement("#popup");

const CreateContacts = () => {
  const navigate = useNavigate();

  const { userId } = getUserIdFromToken();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType>(
    SnackBarType.SUCCESS
  );
  const [toastContent, setToastContent] = useState<string>("");

  const onSuccess = () => {
    console.log("Success");
    setShowToast(true);
    setToastStatus(SnackBarType.SUCCESS);
    setToastContent("Contact created successfully");
  };

  const onError = (e: unknown) => {
    setShowToast(true);
    setToastStatus(SnackBarType.ERROR);
    setToastContent("Server Error: " + JSON.stringify(e));
    console.error(e);
  };

  const { createContact, isCreating } = useContact(userId, onSuccess, onError);
  const initialValues: any = {
    fullName: "",
    email: "",
    phone: "",
    nearAccount: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createContactSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await createContact(values);
      navigate(ROUTES.CONTACTS.url);
    },
  });
  return (
    <>
      {showToast && (
        <SnackBar
          type={toastStatus}
          visible={showToast}
          setVisible={setShowToast}
          content={toastContent}
        />
      )}
      <HeaderAccountSelect />
      <TitleWrapper>
        <img src="./assets/svg/add-contact.svg" alt="add contact" />
        <Title>New Contact</Title>
      </TitleWrapper>
      <Form>
        <ImageUpload>
          <img src="./assets/svg/camera-icon.svg" alt="add contact" />
        </ImageUpload>
        <Label htmlFor="full name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Ex. John"}
          className="home__selectors__input"
        />
        {!!formik.values.first_name &&
          !!formik.touched.first_name &&
          !!formik.errors.first_name && (
            <p className="error-text"> {formik.errors.first_name}</p>
          )}
        <Label htmlFor="full name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formik.values.last_name}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Ex. Doe"}
          className="home__selectors__input"
        />
        {!!formik.values.last_name &&
          !!formik.touched.last_name &&
          !!formik.errors.last_name && (
            <p className="error-text"> {formik.errors.last_name}</p>
          )}
        <Label htmlFor="full name">Address</Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={formik.values.address}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Street Address"}
          className="home__selectors__input"
        />
        {!!formik.values.address &&
          !!formik.touched.address &&
          !!formik.errors.address && (
            <p className="error-text"> {formik.errors.address}</p>
          )}
        <Label htmlFor="full name">Email</Label>
        <Input
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Ex. johndoe@gmail.com"}
          className="home__selectors__input"
        />
        {!!formik.values.email &&
          !!formik.touched.email &&
          !!formik.errors.email && (
            <p className="error-text"> {formik.errors.email}</p>
          )}

        <Label htmlFor="full name">Phone (optional)</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Ex +13673888893"}
          className="home__selectors__input"
        />
        {!!formik.values.phone &&
          !!formik.touched.phone &&
          !!formik.errors.phone && (
            <p className="error-text"> {formik.errors.phone}</p>
          )}

        <Label htmlFor="full name">Near Account ID (Optional)</Label>
        <Input
          type="text"
          id="nearAccount"
          name="nearAccount"
          value={formik.values.nearAccount}
          onPaste={formik.handleChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={"Ex. johndoe" + NEAR_WALLET_TYPE}
          className="home__selectors__input"
        />
        {!!formik.values.nearAccount &&
          !!formik.touched.nearAccount &&
          !!formik.errors.nearAccount && (
            <p className="error-text"> {formik.errors.nearAccount}</p>
          )}
        <Button
          disabled={(!!formik.touched && !formik.isValid) || isCreating}
          className="button"
          type="submit"
          onClick={(e: any) => formik.handleSubmit(e)}
        >
          Save {isCreating ? "..." : ""}
        </Button>
      </Form>
    </>
  );
};

export default CreateContacts;
