import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import _ from "lodash";
import parsePhoneNumber from "libphonenumber-js";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { ContextMain } from "@/context/store";
import { ReducerTypes } from "@/context/reducer";
import ContactItem from "@/components/ContactItem";
import ContactAction from "@/components/ContactAction";
import CheckboxInput from "@/components/common/InputCheckbox";
import { InputSearch } from "@/components/common/InputSearch";
import HeaderAccountSelect from "@/components/common/HeaderAccountSelect";
import SnackBar, { SnackBarType } from "@/components/core/SnackBar/SnackBar";
import Loader from "@/components/core/Loader";
import { useGetContacts, useContactBulk } from "@/hooks/api/contacts";
import { getUserId, removeNumbersFromString } from "@/utils/utils";

import { CreateButton, ImportButton, ModalContent } from "./styles";
import { ImportContactsProps } from "./contacts.type";
import { ROUTES } from "../../const/routeNames";
import { COLORS } from "../../constants/colors";
import "./styles.scss";

Modal.setAppElement("#popup");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(51, 55, 59, 0.4)",
  },
};

const Contacts = () => {
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(ContextMain);

  const userId = getUserId();
  const { createContacts, isCreating, isSuccess } = useContactBulk();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const { contacts, isLoading, isRefetching } = useGetContacts(userId, refetch);

  const [searchInput, setsearchInput] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isImportingContacts, setImportingContacts] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType>(
    SnackBarType.ERROR
  );
  const [toastContent, setToastContent] = useState<string>("");

  const [toggleContactAction, setToggleContactAction] =
    useState<boolean>(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const viewContactDetails = (id: string) => {
    navigate(ROUTES.DETAIL_CONTACT.url.replace(":id", id));
  };

  const importContact = (e: any, source: string) => {
    localStorage.setItem("contact-import-source", source);

    //Iframe for Oauth With cloudsponge
    const iframe = document.createElement("iframe");
    iframe.id = "import-contacts-iframe";
    iframe.style.background = "transparent";
    iframe.style.height = "80%";
    iframe.style.width = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "20%";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.frameBorder = "none";
    iframe.src = chrome.extension.getURL("import-contacts.html");
    document.body.appendChild(iframe);

    // listen to event from iframe
    window.onmessage = async function (event) {
      const { message, success, contacts } = JSON.parse(event.data);

      const mockedAppId = nanoid();
      const mappedContacts = await Promise.all(
        contacts.map(async (contact: any) => {
          const addresses = contact.address.map((addr: any) => {
            const {
              street,
              city,
              region,
              postalCode: postal_code,
              country,
            } = addr;
            return { street, city, region, postalCode: postal_code, country };
          });

          const setPhoneNumber = (number: string) => {
            const phoneNumber = parsePhoneNumber(number);
            return (
              phoneNumber?.number ||
              number.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
            );
          };

          const phone = contact.phone.map((p: any) => ({
            number: setPhoneNumber(p.number),
            type: p.number,
          }));
          const emails = contact.email.map((e: any) => ({
            address: e.adresss,
            type: e.type,
          }));

          const finalContacts: ImportContactsProps = {
            address: addresses,
            appId: mockedAppId,
            companies: contact.companies,
            email: emails,
            firstName: removeNumbersFromString(contact.first_name),
            groups: contact.groups,
            importSource: "Google",
            jobTitle: contact.job_title,
            lastName: removeNumbersFromString(contact.last_name),
            phone,
          };

          return finalContacts;
        })
      );

      if (message === "contact-import") {
        setImportingContacts(true);

        if (success) {
          const filteredContacts = mappedContacts.filter(
            (contact) => contact.firstName && contact.lastName
          );
          const response = await createContacts(filteredContacts);
          if (response.status == 200) {
            const {
              data: { contactsNotImported, errorMessage },
            } = response.data;

            setImportingContacts(false);

            // handle un-imported contacts
            if (contactsNotImported > 0) {
              const errMsg = _.uniq(errorMessage);
              setShowToast(true);
              setToastStatus(SnackBarType.ERROR);
              setToastContent(_.join(errMsg, "\n"));
            } else if (contactsNotImported === 0) {
              setShowToast(true);
              setToastStatus(SnackBarType.SUCCESS);
              setToastContent("Successfully import Contacts");
              setRefetch(true);
            }
          } else {
            //Import failed
          }
        } else {
          //Import failed
        }
      }
    };

    closeModal();
  };

  const createContact = () => {
    navigate(ROUTES.CREATE_CONTACT.url);
  };

  const searchValueInput = (e: any) => {
    setsearchInput(e.target.value);
  };

  const addContactHandler = () => {
    openModal();
  };

  const openModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const selectContactsCheckbox = () => {
    setSelectAll(!selectAll);
    if (contacts) {
      contacts.forEach((contact: any) => {
        contact.selected = !selectAll;
      });
      if (selectAll === false) {
        const ids = contacts.map((contact: any) => contact.contactId);
        setSelectedContacts(ids);
      } else {
        setSelectedContacts([]);
      }
    }
  };

  // const onDeleteContact = async () => {
  //   if (selectedContacts.length === 0) {
  //     return;
  //   }
  //   if (selectedContacts.length === 1) {
  //     setIsDeleting(true);
  //     const resp = await contactApi.deleteContact(selectedContacts[0]);
  //     if (resp.message) {
  //       setRefetch(true);
  //     }
  //     setIsDeleting(false);
  //     setSelectedContacts([]);
  //   }
  //   //   // Need to modify when multiple delete contacts isready
  //   // if (selectedContacts.length > 1) {
  //   //   setIsDeleting(true);
  //   //   const resp = await contactApi.deleteMultipleContacts(selectedContacts);
  //   //   if (resp.message) {
  //   //     setRefetch(true);
  //   //   }
  //   //   setIsDeleting(false);
  //   //   setSelectedContacts([]);
  //   // }
  // };

  useEffect(() => {
    if (isRefetching === true) {
      setRefetch(false);
    }
  }, [isRefetching]);

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.CONTACTS.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  const handleSnackbar = () => {
    setImportingContacts(false);
    setShowToast(false);
    setToastContent("");
  };

  useEffect(() => {
    const clearMessageTimer = setTimeout(() => handleSnackbar(), 5 * 1000);
    return () => {
      clearTimeout(clearMessageTimer);
    };
  }, [isCreating, isSuccess]);

  const onSelectedContact = (id: string) => {
    setToggleContactAction(true);
    let newContacts = [...selectedContacts, id];
    if (selectedContacts.includes(id)) {
      newContacts = newContacts.filter((contact) => contact !== id);
    }
    setSelectedContacts(newContacts);
  };

  // placeholder for select all contacts
  const onSelectAllContacts = () => {
    // setSelectedContacts(contacts);
  };

  useEffect(() => {
    if (selectedContacts.length === 0) {
      setToggleContactAction(false);
    }
  }, [selectedContacts]);

  return (
    <>
      <HeaderAccountSelect />
      <section className="contacts">
        {!toggleContactAction ? (
          <InputSearch
            placeholder="Search contacts"
            addHandler={addContactHandler}
            searchHandler={searchValueInput}
          />
        ) : (
          <ContactAction
            checkboxComponent={
              <CheckboxInput
                id={""}
                onChangeHandler={onSelectAllContacts}
                value={""}
              />
            }
          />
        )}
        <div className="contacts__list">
          {isLoading || isDeleting || isRefetching ? (
            <Loader style={{ color: COLORS.BLUE_900, height: 20, width: 20 }} />
          ) : (
            ""
          )}

          {isLoading ? "Searching..." : ""}
          {!isLoading && contacts && contacts.length === 0
            ? "No contacts found"
            : ""}

          {contacts &&
            contacts.map((contact: any) => (
              <ContactItem
                key={contact.contactId}
                contact={contact}
                clickHandler={viewContactDetails}
                selectHandler={() => onSelectedContact(contact.contactId)}
              />
            ))}
        </div>
      </section>

      <Modal
        id="selectContact"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal-create-account"
        contentLabel="Example Modal"
      >
        <ModalContent>
          <CreateButton onClick={createContact}> New Contact</CreateButton>

          <hr />
          <ImportButton
            onClick={(e) => {
              importContact(e, "gmail");
            }}
          >
            {" "}
            Import Google Contacts
          </ImportButton>
          {/* You can also add import contact button for apple, outlook and others here */}
        </ModalContent>
      </Modal>
      {isImportingContacts && (
        <div className="info-div">
          <img src="./assets/spinner.svg" loading="lazy" />
          <h3>Importing Contacts</h3>
        </div>
      )}

      {isSuccess && toastStatus && (
        <SnackBar
          type={toastStatus}
          visible={showToast}
          setVisible={setShowToast}
          content={toastContent}
        />
      )}
    </>
  );
};

export default Contacts;
