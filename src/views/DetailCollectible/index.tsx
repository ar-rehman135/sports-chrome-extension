import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router";

import offerImg from "../../public/assets/offers.png";
import chevron from "../../public/assets/chevron-r-black.svg";

import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import TabsContainer from "../../components/common/TabsContainer";
import TabsHeader from "../../components/common/TabsHeader";
import MakeOfferModal from "../../components/MakeOfferModal";
import OffersList from "../../components/OffersList";
import TradeHistoryList from "../../components/TradeHistoryList";
import { useGetCollectibleById } from "../../hooks/api/collectibles";
import { getUserId } from "../../utils/utils";
import { StyledButton, StyledDetailCollectible } from "./styled";
import Loader from "../../components/core/Loader";
import { COLORS } from "../../constants/colors";

export interface Collectibles {
  id: string;
  name: string;
  imgUrl: string;
  owner: string;
  description: string;
}
export default function DetailCollectible() {
  const { id } = useParams();
  const userId = getUserId();
  const { collectible, isSearching } = useGetCollectibleById(id ? id : "");
  const [activeTab, setActive] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [overView, setOverView] = useState(true);

  const isOwner = () => {
    return userId == collectible.owner_id;
  };

  const tab1 = useRef<any>();
  const tab2 = useRef<any>();
  const tab3 = useRef<any>();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(51, 55, 59, 0.4)",
    },
    content: {
      top: "30%",
    },
  };

  return (
    <>
      <HeaderAccountSelect />
      <StyledDetailCollectible>
        {isSearching ? (
          <Loader style={{ color: COLORS.BLUE_900, height: 20, width: 20 }} />
        ) : (
          <>
            <div className="icon-section">
              <img
                src={collectible.filePath}
                className="background"
                use-credentials
              />
              <img
                src={collectible.filePath}
                className="icon"
                use-credentials
              />
            </div>
            <div className="detail-section">
              <div className="name">{collectible.title}</div>
              <div className="number"># {collectible.nftId}</div>
              <div className="owner-wrapper">
                <img src="/assets/account-1.png" className="owner-icon" />
                <div className="name-wrapper">
                  <span className="owner-label">owned by</span>
                  <span className="owner-name">
                    {collectible.owner.ownerWalletId}
                  </span>
                </div>
              </div>
            </div>
            {!isOwner() && (
              <StyledButton onClick={() => setModalIsOpen(true)}>
                <img className="icon" src={offerImg} />

                <span className="body__title">Make an Offer</span>
              </StyledButton>
            )}
            <Modal
              id="customModal"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              className="open-modal"
            >
              <MakeOfferModal onClose={closeModal} collectible={collectible} />
            </Modal>
            {!isOwner() ? (
              <div className="tabs-wrapper">
                <TabsHeader
                  tabsHeader={["Info", "Trade History"]}
                  setActive={setActive}
                  activeTab={activeTab}
                />
                <TabsContainer tabs={[tab1, tab2]} activeTabId={activeTab}>
                  <>
                    <div data-tab="0" ref={tab1} className="tab-text">
                      <div
                        className="overview-section"
                        onClick={() => setOverView(!overView)}
                      >
                        <span> Overview</span>
                        <img
                          className={`chevron-${!overView ? "close" : "open"}`}
                          src={chevron}
                          alt=""
                        />
                      </div>
                      {overView && (
                        <div className="description">
                          {collectible.description}
                        </div>
                      )}
                    </div>
                    <div data-tab="1" ref={tab2} className="tab-text">
                      <TradeHistoryList id={collectible.nftId} />
                    </div>
                  </>
                </TabsContainer>
              </div>
            ) : (
              <div className="tabs-wrapper-owner">
                <TabsHeader
                  tabsHeader={["Info", "Pending Offers", "Trade History"]}
                  setActive={setActive}
                  activeTab={activeTab}
                />
                <TabsContainer
                  tabs={[tab1, tab2, tab3]}
                  activeTabId={activeTab}
                >
                  <>
                    <div data-tab="0" ref={tab1} className="tab-text">
                      <div
                        className="overview-section"
                        onClick={() => setOverView(!overView)}
                      >
                        <span> Overview</span>
                        <img
                          className={`chevron-${!overView ? "close" : "open"}`}
                          src={chevron}
                          alt=""
                        />
                      </div>
                      {overView ? (
                        <div className="description">
                          {collectible.description}
                        </div>
                      ) : null}
                    </div>
                    <div data-tab="1" ref={tab2} className="tab-text">
                      <OffersList fromNFT />
                    </div>
                    <div data-tab="2" ref={tab3} className="tab-text">
                      <TradeHistoryList id={collectible.nftId} />
                    </div>
                  </>
                </TabsContainer>
              </div>
            )}
          </>
        )}
      </StyledDetailCollectible>
    </>
  );
}
