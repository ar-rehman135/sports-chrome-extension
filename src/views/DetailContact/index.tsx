import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";

import TabsHeader from "../../components/common/TabsHeader";
import TabsContainer from "../../components/common/TabsContainer";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import NFTList from "../../components/NFTList";
import ConnectedExpItem, {
  ConnectedExp,
} from "../../components/ConnectedExpItem";

import {
  ContactIcon,
  DetailSection,
  EditContact,
  HeaderContact,
  SeeTransContact,
  SubtitleEmail,
  NameH2,
  ConnectedCount,
  ButtonWrapper,
  GuestContactWrapper,
  DivLoader,
} from "./styles";
import { ROUTES } from "../../const/routeNames";
import arrowUp from "../../public/assets/arrow-up.png";
import arrowDown from "../../public/assets/arrow-down.png";
import SendModal from "../../components/SendModal";
import { useGetContact } from "../../hooks/api/contacts";
import Loader from "../../components/core/Loader";
import { COLORS } from "../../constants/colors";

Modal.setAppElement("#popup");

const DetailContacts = () => {
  const { id } = useParams();
  const { contact, isSearching } = useGetContact(id);

  const [exps] = useState<ConnectedExp[]>();
  const [sendIsOpen, setSendIsOpen] = React.useState(false);
  const [receiveIsOpen, setReceiveIsOpen] = React.useState(false);
  const [activeTab, setActive] = useState(0);
  const collectibles = useRef<any>();
  const actions = useRef<any>();
  const expereinces = useRef<any>();

  const nav = useNavigate();

  const editContact = () => {
    if (id) {
      nav(ROUTES.EDIT_CONTACT.url.replace(":id", id));
    }
  };

  const sendOrReceive = (actionType: string) => {
    if (id) {
      nav(ROUTES.CONTACT_ACTIONS.url.replace(":id", id), {
        state: {
          actionType,
        },
      });
    }
  };

  return (
    <>
      <HeaderAccountSelect />
      {isSearching ? (
        <DivLoader>
          <Loader style={{ color: COLORS.BLUE_900, width: 20, height: 20 }} />
        </DivLoader>
      ) : (
        <>
          <DetailSection>
            <HeaderContact>
              <ContactIcon>
                {contact?.firstName?.substring(0, 1)?.toUpperCase() +
                  contact?.lastName?.substring(0, 1)?.toUpperCase()}
              </ContactIcon>
              <div>
                <SeeTransContact />
                <EditContact onClick={editContact} />
              </div>
            </HeaderContact>
            <NameH2>{`${contact?.firstName} ${contact?.lastName}`}</NameH2>
            <SubtitleEmail>{contact?.email[0]?.address || ""}</SubtitleEmail>
          </DetailSection>

          {contact?.userId.length ? (
            <div>
              <TabsHeader
                tabsHeader={["Collectibles", "Actions", "Expereinces"]}
                setActive={setActive}
                activeTab={activeTab}
              />
              <TabsContainer
                tabs={[collectibles, actions, expereinces]}
                activeTabId={activeTab}
              >
                <>
                  <div data-tab="0" ref={collectibles} className="tab-text">
                    <NFTList />
                  </div>
                  <div data-tab="1" ref={actions} className="tab-text">
                    <ButtonWrapper onClick={() => sendOrReceive("SEND")}>
                      <div className="body">
                        <span className="body__title">Send</span>
                      </div>
                      <img className="icon" src={arrowUp} alt="" />
                    </ButtonWrapper>
                    <ButtonWrapper onClick={() => sendOrReceive("REQUEST")}>
                      <div className="body">
                        <span className="body__title">Receive</span>
                      </div>
                      <img className="icon" src={arrowDown} alt="" />
                    </ButtonWrapper>
                  </div>
                  <div data-tab="2" ref={expereinces} className="tab-text">
                    {exps && exps?.length > 0 && (
                      <ConnectedCount>
                        {exps?.length} connected experiences with devon
                      </ConnectedCount>
                    )}
                    {exps
                      ? exps.map((exp) => <ConnectedExpItem item={exp} />)
                      : null}
                  </div>
                </>
              </TabsContainer>
            </div>
          ) : (
            <GuestContactWrapper>
              <ButtonWrapper
                onClick={() => {
                  setSendIsOpen(true);
                }}
              >
                <div className="body">
                  <span className="body__title">Share NFT</span>
                </div>
                <img className="icon" src={arrowUp} alt="" />
              </ButtonWrapper>
              <ButtonWrapper
                onClick={() => {
                  setReceiveIsOpen(true);
                }}
              >
                <div className="body">
                  <span className="body__title">Invite contact</span>
                </div>
                <img className="icon" src={arrowDown} alt="" />
              </ButtonWrapper>
            </GuestContactWrapper>
          )}
        </>
      )}
    </>
  );
};

export default DetailContacts;
