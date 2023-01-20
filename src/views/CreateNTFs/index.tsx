import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routeNames";
import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import TabsContainer from "../../components/common/TabsContainer";
import TabsHeader from "../../components/common/TabsHeader";

import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { Button, CreateNFTSection } from "./styles";
import NFTList from "../../components/NFTList";
import OffersList from "../../components/OffersList";

const CreateNTFs = () => {
  const navigate = useNavigate();
  const [state, dispatch] = React.useContext(ContextMain);
  const [activeTab, setActive] = useState(0);
  const tab1 = useRef<any>();
  const tab2 = useRef<any>();
  const tab3 = useRef<any>();
  const tabHeader = ["My NFT", "Offers", "Activity"];

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.CREATE_NFT.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  return (
    <>
      <HeaderAccountSelect />
      <CreateNFTSection>
        <Button className="button btn-dark">Create NFT</Button>
        <TabsHeader
          tabsHeader={tabHeader}
          setActive={setActive}
          activeTab={activeTab}
        />
        <TabsContainer tabs={[tab1, tab2, tab3]} activeTabId={activeTab}>
          <>
            <div data-tab="0" ref={tab1} className="tab-text">
              <NFTList />
            </div>
            <div data-tab="1" ref={tab2} className="tab-text">
              <OffersList />
            </div>
            <div data-tab="2" ref={tab3} className="tab-text"></div>
          </>
        </TabsContainer>
      </CreateNFTSection>
    </>
  );
};

export default CreateNTFs;
