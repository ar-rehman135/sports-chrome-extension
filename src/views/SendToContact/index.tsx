import React, { useEffect } from "react";
import Modal from "react-modal";

import { SendSection , HeaderSend } from "./styles";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import {  useEditContact, useGetContact } from "../../hooks/api/contacts";
import { useFormik } from "formik";
import createContactSchema from "../../validation/createContactSchema";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../../const/routeNames";
import { getUserIdFromToken } from "../../utils/utils";
import arrowUpBlue from "../../public/assets/arrow-up-blue.png";
import arrowUpwhite from "../../public/assets/arrow-up.png";


Modal.setAppElement("#popup");

const SendToContact = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromToken()
  const { id } = useParams();
  const {contact} = useGetContact(id);

  const { editContact, isCreating } = useEditContact(id);
  
  if (!id){
    navigate(-1);
    console.info("no id selected to edit contact page");
  }

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
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      const newContact = await editContact(values);
      console.info({ newContact });
      navigate(ROUTES.CONTACTS.url);
    },
  });

  useEffect(() => {
    if(contact) {
      const values = {
        email: contact.email,
        first_name: contact.first_name,
        last_name: contact.last_name,
        address: contact.address && contact.address[0],
        nearAccount: contact.wallet_id,
        phone: contact.phone[0] && contact.phone[0].number,
      }
      formik.setValues(values);
    }
  }, [contact]);

  return (
    <>
      <HeaderAccountSelect/>
      <SendSection>
        <HeaderSend>
          <img src={arrowUpBlue} alt="" />
            Send Near
        </HeaderSend>

        <div className="label">To</div>

        <div className="reciever">
          <div className="circle">DL</div> <span>devon.near</span>
        </div>

        <div className="row">
          <div className="label">Send</div>
          <div className="pill"> NEAR Token</div>
        </div>
        <div className="label">Amount</div>
        <form>
          <div className="near-ammount">
            <input
              type="text"
              id="amount"
              name="amount"
              value={formik.values.amount}
              onPaste={formik.handleChange}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={"0.000"}
              className="home__selectors__input"
            />
          </div>
          
          {!!formik.values.amount &&
            !!formik.touched.amount &&
            !!formik.errors.amount && (
              <p className="error-text"> {formik.errors.amount}</p>
            )}

          <button
            className="button"
            type="submit"
            onClick={(e: any) => formik.handleSubmit(e)}>
                  <div className="body">
                      <span className="body__title">
                        Send {isCreating ? "..." : ""}
                      </span>
                  </div>
                  <img
                      className="icon"
                      src={arrowUpwhite}
                      alt=""
                  />
          </button>
        </form>
      </SendSection>
    </>
  );
};

export default SendToContact;
