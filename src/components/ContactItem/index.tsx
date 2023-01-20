import React from "react";

import chevron from "../../public/assets/chevron-r-black.svg";
import CheckboxInput from "../common/InputCheckbox";

import "./styles.scss";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  imgUrl: string;
  account?: string;
  email?: string;
  selected?: any;
  contactId: string;
}

interface Props {
  contact: any;
  clickHandler: any;
  selectHandler?: () => void;
}

const ContactItem = ({ contact, clickHandler, selectHandler }: Props) => {
  return (
    <>
      <div className="contact">
        <CheckboxInput id={contact.contactId} onChangeHandler={selectHandler} value={contact.selected} />

        <div
          onClick={() => clickHandler(contact.contactId)}
          className="contact__img"
        >
          {contact.firstName.substring(0, 1).toUpperCase() +
            contact.lastName.substring(0, 1).toUpperCase()}
        </div>
        <div
          onClick={() => clickHandler(contact.contactId)}
          className="contact__body"
        >
          <span className="contact__body__title">
            {contact.firstName} {contact.lastName}
          </span>
          <span className="contact__body__acct">
            {contact.walletName ? contact.walletName : ""}
          </span>
        </div>
        <img
          onClick={() => clickHandler(contact.contactId)}
          className="contact__chevron"
          src={chevron}
          alt=""
        />
      </div>
    </>
  );
};

export default ContactItem;
