import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import {
  Button,
  ChangePhoto,
  ChangePhotoBlock,
  FieldBlock,
  Label,
  Input,
  PhotoContact,
  Title,
} from "./styles";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { useEditContact, useGetContact } from "../../hooks/api/contacts";
import { useFormik } from "formik";
import updateContactSchema from "../../validation/updateContactSchema";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../../const/routeNames";
import { NEAR_WALLET_TYPE } from "../../constants/api";
import SnackBar, { SnackBarType } from "@/components/core/SnackBar/SnackBar";

Modal.setAppElement("#popup");

const CreateContacts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contact } = useGetContact(id);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);
  const [toastContent, setToastContent] = useState<string>("");

  const onSuccess = () => {
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

  const { editContact, isCreating } = useEditContact(id, onSuccess, onError);
  if (!id) {
    navigate(-1);
    setShowToast(true);
    setToastStatus(SnackBarType.ERROR);
    setToastContent("no id selected to edit contact page");
  }

  const initialValues: any = {
    fullName: "",
    email: "",
    phone: "",
    nearAccount: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateContactSchema,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await editContact(values);
      navigate(ROUTES.CONTACTS.url);
    },
  });

  useEffect(() => {
    if (contact) {
      const values = {
        fullName: `${contact?.firstName} ${contact?.lastName}`,
        email: contact?.email[0]?.address || "",
        nearAccount: contact.wallet_id,
        phone: contact?.phone[0]?.number,
        contactId: contact?.contactId,
      };
      formik.setValues(values);
    }
  }, [contact]);

  return (
    <>
      {showToast && toastStatus && toastContent && (
        <SnackBar
          type={toastStatus}
          visible={showToast}
          setVisible={setShowToast}
          content={toastContent}
        />
      )}
      <HeaderAccountSelect />
      <Title>Edit Contact</Title>
      <ChangePhotoBlock>
        <PhotoContact>
          {contact?.firstName.substring(0, 1).toUpperCase() +
            contact?.lastName.substring(0, 1).toUpperCase()}
        </PhotoContact>
        <ChangePhoto>Change photo</ChangePhoto>
      </ChangePhotoBlock>
      <form>
        <FieldBlock>
          <Label htmlFor="full name">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onPaste={formik.handleChange}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={"Ex. John doe"}
            className="home__selectors__input"
          />
          {!!formik.values.fullName &&
            !!formik.touched.fullName &&
            !!formik.errors.fullName && (
              <p className="error-text"> {formik.errors.fullName}</p>
            )}
        </FieldBlock>
        <FieldBlock>
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
          {!!formik.values.email && !!formik.errors.email && (
            <p className="error-text"> {formik.values.email}</p>
          )}
        </FieldBlock>
        <FieldBlock>
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
          {!!formik.values.phone && !!formik.errors.phone && (
            <p className="error-text"> {formik.errors.phone}</p>
          )}
        </FieldBlock>
        <FieldBlock>
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
          {!!formik.values.nearAccount && !!formik.errors.nearAccount && (
            <p className="error-text"> {formik.errors.nearAccount}</p>
          )}
        </FieldBlock>
        <FieldBlock>
          <Button
            disabled={!formik.isValid || isCreating}
            className="button"
            type="submit"
            onClick={(e: any) => formik.handleSubmit(e)}
          >
            Save{isCreating ? " ..." : ""}
          </Button>
        </FieldBlock>
      </form>
    </>
  );
};

export default CreateContacts;
