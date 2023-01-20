import React, { MouseEventHandler, useEffect } from "react";

import "./styles.scss";

interface Props {
  item: any;
  onClick?: MouseEventHandler;
}

const CollectibleItem = ({ item, onClick }: Props) => {
  return (
    <>
      <div className="collectible" onClick={onClick}>
        <img className="collectible__img" src={item.filePath} />
        <div className="collectible__body">
          <span className="collectible__body__title">{item.title}</span>
          <span>
            by <a className="collectible__body__link">{item.ownerWalletId}</a>
          </span>
        </div>
        <img
          className="collectible__chevron"
          src="./assets/chevron-r-black.svg"
          alt=""
        />
      </div>
    </>
  );
};

export default CollectibleItem;
