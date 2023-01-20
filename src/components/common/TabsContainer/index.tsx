import React, { useEffect } from "react";

import "./styles.scss";

interface Props {
  children: JSX.Element;
  activeTabId: any;
  tabs: Array<any>;
}

const TabsContainer = ({ children, activeTabId, tabs }: Props) => {
  useEffect(() => {
    tabs.map((tabRef, indx) => {
      tabRef.current.style.display =
        indx === parseInt(activeTabId) ? "block" : "none";
    });
  }, [activeTabId]);

  return <>{children}</>;
};

export default TabsContainer;
