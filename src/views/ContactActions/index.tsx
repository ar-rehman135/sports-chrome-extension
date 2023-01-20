import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import Modal from "react-modal";

import {
  SendSection,
  HeaderType,
  DivStyledImage,
  DivStyledOption,
  DivStyledLeftIcon,
  StyledButton,
} from "./styles";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { useGetContact, useGetContacts } from "../../hooks/api/contacts";
import collectibleApi from "../../services/collectibles";
import { getUserId } from "../../utils/utils";
import Loader from "../../components/core/Loader";
import { DivLoader } from "../DetailContact/styles";
import { SendIcon } from "../../public/assets/send-icon";
import DropDown from "../../components/core/Dropdown";
import { useGetAllCollectibles } from "../../hooks/api/collectibles";
import { RequestIcon } from "../../public/assets/request-icon";
import { COLORS } from "../../constants/colors";
import CollectibleDropDown from "@/components/common/CollectibleDropDown";
import SnackBar, { SnackBarType } from "@/components/core/SnackBar/SnackBar";

Modal.setAppElement("#popup");

enum ACTION_TYPE {
  SEND = "SEND",
  REQUEST = "REQUEST",
}

const ContactActions = () => {
  const [isNearToken, setIsNearToken] = useState<boolean>(true);
  const [isNft, setIsNft] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    state: { actionType },
  } = useLocation();
  const { id } = useParams();
  const { contact, isSearching } = useGetContact(id);
  const userId = getUserId();
  const { contacts } = useGetContacts(userId);
  const { collectibles, isLoading: isCollectibesLoading } =
    useGetAllCollectibles(userId);

  const [selectedContact, setSelectedContact] = useState<any>({});
  const [selectedNFT, setSelectedNFT] = useState<any>({});
  const [notes, setNotes] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isSendingNft, setIsSendingNft] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType>(
    SnackBarType.ERROR
  );
  const [toastContent, setToastContent] = useState<string>("");

  if (!id) {
    navigate(-1);
    console.info("no id selected to edit contact page");
  }

  const handleClick = (name: string) => {
    if (name === "NFT") {
      setIsNft(true);
      setIsNearToken(false);
    } else if (name === "NEAR") {
      setIsNearToken(true);
      setIsNft(false);
    }
  };

  useEffect(() => {
    if (contact && contact.contactId) {
      setSelectedContact(contact);
    }
  }, [contact]);

  useEffect(() => {
    if (!isCollectibesLoading && collectibles?.length) {
      setSelectedNFT(collectibles[0]);
    }
  }, [collectibles]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "notes") {
      setNotes(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };

  const onSubmit = async () => {
    switch (actionType) {
      case ACTION_TYPE.SEND:
        if (isNearToken) {
          // Need to implement api
        } else if (isNft) {
          setIsSendingNft(true);
          const contactIds = [selectedContact.contactId];
          const resp = await collectibleApi.giftCollectible(
            selectedNFT.nftId,
            contactIds
          );
          if (resp.message) {
            setToastStatus(SnackBarType.SUCCESS);
            setShowToast(true);
            setIsSendingNft(false);
            setToastContent(resp.message);
          } else if (resp.error) {
            setToastStatus(SnackBarType.ERROR);
            setShowToast(true);
            setIsSendingNft(false);
            setToastContent(resp.error);
          }
        }
        break;

      case ACTION_TYPE.REQUEST:
        if (isNearToken) {
          // Need to implement api
        } else if (isNft) {
          // Need to implement api
        }
        break;
    }
  };

  return (
    <>
      <HeaderAccountSelect />
      <HeaderType>
        {actionType === ACTION_TYPE.SEND ? (
          <>
            <SendIcon color={COLORS.ACCENT_2} />
            Send
          </>
        ) : (
          <>
            <RequestIcon color={COLORS.ACCENT_2} />
            Request
          </>
        )}
      </HeaderType>
      {isSearching ? (
        <DivLoader>
          <Loader style={{ width: 20, height: 20, color: COLORS.BLUE_900 }} />
        </DivLoader>
      ) : (
        <>
          <SendSection>
            <div className="label">
              {actionType === ACTION_TYPE.SEND ? "To" : "From"}{" "}
            </div>
            <DropDown
              leftIcon={
                <DivStyledLeftIcon>
                  {selectedContact?.firstName?.substring(0, 1)?.toUpperCase() +
                    selectedContact?.lastName?.substring(0, 1)?.toUpperCase()}
                </DivStyledLeftIcon>
              }
              value={selectedContact?.firstName + selectedContact?.lastName}
              handleChange={(e: any) => setSelectedContact(e.target.value)}
            >
              {contacts?.map((cont) => (
                <DivStyledOption key={cont.contactId} value={cont}>
                  <DivStyledImage>
                    {selectedContact?.firstName
                      ?.substring(0, 1)
                      ?.toUpperCase() +
                      selectedContact?.lastName?.substring(0, 1)?.toUpperCase()}
                  </DivStyledImage>
                  <span>{cont.firstName + " " + cont.lastName}</span>
                </DivStyledOption>
              ))}
            </DropDown>
            <div className="row">
              <div className="label">Send</div>
              <StyledButton
                isActive={isNearToken}
                onClick={() => {
                  handleClick("NEAR");
                }}
              >
                NEAR Token{" "}
              </StyledButton>
              <StyledButton
                name="NFT"
                isActive={isNft}
                onClick={() => {
                  handleClick("NFT");
                }}
              >
                NFT{" "}
              </StyledButton>
            </div>

            {isNearToken && (
              <>
                {" "}
                <div className="label">Amount</div>
                <div className="amount-input">
                  <input
                    className="input"
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    placeholder={"0.000"}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {isNft && (
              <CollectibleDropDown
                items={collectibles}
                selectedNFT={selectedNFT}
                handleChange={(e: any) => setSelectedNFT(e.target.value)}
              />
            )}

            <div className="label">Notes</div>
            <textarea
              id="Notes"
              name="notes"
              className="input-notes"
              onChange={handleChange}
              value={notes}
            />
            <button className="action-button" onClick={onSubmit}>
              {isSendingNft ? (
                <>
                  <span></span>
                  <Loader
                    style={{ color: COLORS.WHITE, width: 20, height: 20 }}
                  />
                  <span></span>
                </>
              ) : (
                <>
                  <span></span>
                  <span>
                    {actionType === ACTION_TYPE.SEND ? "SEND" : "REQUEST"}
                  </span>
                  {actionType === ACTION_TYPE.SEND ? (
                    <SendIcon color={COLORS.WHITE} />
                  ) : (
                    <RequestIcon color={COLORS.WHITE} />
                  )}
                </>
              )}
            </button>
          </SendSection>
          {toastStatus && (
            <SnackBar
              type={toastStatus}
              visible={showToast}
              setVisible={setShowToast}
              content={toastContent}
            />
          )}
        </>
      )}
    </>
  );
};

export default ContactActions;
