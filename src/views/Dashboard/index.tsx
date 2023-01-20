import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import TabsContainer from "../../components/common/TabsContainer";
import TabsHeader from "../../components/common/TabsHeader";
import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import { ROUTES } from "../../const/routeNames";

import "./styles.scss";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import Transactions from "../../components/Transactions";
import NFTList from "../../components/NFTList";
import { getUserId, getToken, getAutoLoggedIn } from "../../utils/utils";
import Avatar from "../../components/core/Avatar";
import { AvatarsContainerStyled } from "./index.styles";
import { useGetContacts } from "../../hooks/api/contacts";
import { NFT_APP_URL } from "../../constants/api";
import Loader from "../../components/core/Loader";
import { COLORS } from "../../constants/colors";
import { useGetConnectedApps } from "../../hooks/api/apps";
import { useGetTransactionsByUserId } from "../../hooks/api/transactions";
import { TRANSACTION_TYPE } from "../../components/Transactions/transaction.types";

const Dashboard = () => {
  const [transactionType,] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.WALLET_ID
  );
  const navigate = useNavigate();
  const userId = getUserId();
  const token = getToken();
  const { contacts, isLoading } = useGetContacts(userId);
  const { totalConnectedApps } = useGetConnectedApps();
  const isAutoLoginEnabled = getAutoLoggedIn();

  const goToContacts = () => {
    navigate(ROUTES.CONTACTS.url);
  };

  const goToCreateNFT = () => {
    if (isAutoLoginEnabled) {
      window.open(`${NFT_APP_URL}?access_token=${token}`);
    } else {
      window.open(NFT_APP_URL);
    }
  };

  const goToExperiencesDashboard = () => {
    navigate(ROUTES.EXPERIENCES_DASHBOARD.url);
  };

  const [activeTab, setActive] = useState(0);
  const tab1 = useRef<any>();
  const tab2 = useRef<any>();
  const [, dispatch] = React.useContext(ContextMain);
  const { data, isLoading: isTransactionsLoading, isRefetching } = useGetTransactionsByUserId(
    userId,
    transactionType
  );

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.DASHBOARD.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  return (
    <>
      <HeaderAccountSelect noBack />
      <section className="dashboard">
        <div className="dashboard__btn-container">
          <a onClick={goToContacts} className="contact-btn dash-btn">
            <span>Contacts</span>
            <AvatarsContainerStyled>
              {isLoading ? (
                <Loader
                  style={{ color: COLORS.WHITE, height: 20, width: 20 }}
                />
              ) : (
                contacts &&
                contacts.slice(0, 5).map((contact: any) => (
                  <Avatar
                    alt={`${contact.firstName.substring(0, 1).toUpperCase()}
                    ${contact.lastName.substring(0, 1).toUpperCase()}`}
                    src={contact.picture}
                    key={contact.contactId}
                  >
                    {`${contact.firstName
                      .substring(0, 1)
                      .toUpperCase()}${contact.lastName
                      .substring(0, 1)
                      .toUpperCase()}`}
                  </Avatar>
                ))
              )}
            </AvatarsContainerStyled>
            <img
              className="chevron"
              src="./assets/chevron-r-white.svg"
              alt="chevron go to page"
            />
          </a>
          <a className="web3-btn dash-btn" onClick={goToExperiencesDashboard}>
            <span>web3 Apps</span>
            <img
              className="chevron"
              src="./assets/chevron-r-white.svg"
              alt="chevron go to page"
            />

            <span className="web3-btn__notification">
              {totalConnectedApps} Connected
            </span>
          </a>
          <a className="createNFT-btn">
            <span>Start Creating your NFT Today</span>
            <button onClick={goToCreateNFT} className="button">
              Create NFT
            </button>
          </a>
        </div>
        <TabsHeader
          tabsHeader={["Collectibles", "Transactions"]}
          setActive={setActive}
          activeTab={activeTab}
        />
        <TabsContainer tabs={[tab1, tab2]} activeTabId={activeTab}>
          <>
            <div data-tab="0" ref={tab1} className="tab-text">
              <NFTList />
            </div>
            <div data-tab="1" ref={tab2} className="tab-text">
              <Transactions data={data || []} isLoading={isTransactionsLoading} isRefetching={isRefetching} />
            </div>
          </>
        </TabsContainer>
      </section>
    </>
  );
};

export default Dashboard;
