import React, { MouseEventHandler } from "react";
import { OfferItemContainer } from "./styles";
import tagImg from "../../../public/assets/tag.png";
import moment from 'moment';

interface Props {
  item: any;
  onClick?: MouseEventHandler;
  fromNFT?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OfferItem = ({ item, onClick, fromNFT }: Props) => {

  return (
    <OfferItemContainer onClick={onClick}>
      {fromNFT ? (
        <>
          <img className="offer-item-img" src={tagImg} alt="" />
          <div className="offer-item-body">
            <span>
              <span className="offer-item-id">{item.owner_id}</span> made an offer of <span className="offer-item-amount-nft">{item.amount}</span>
            </span>
            <div className="offer-item-time"> {moment(item.expire_in).isAfter() ? moment(item.expire_in).fromNow(true) + ' left' : 'Overdue!'}  </div>
            <div className="">
              <button className="button btn-dark offer-item-button">Accept</button>
              <button className="button btn-dark offer-item-button">Counter offer</button>
              <button className="button btn-dark offer-item-button --white">Reject</button>
            </div>
          </div>
        </>) : (
        <>
          <img className="offer-item-img" src={tagImg} alt="" />
          <div className="offer-item-body">
            <div className="offer-item-id"> #{item.id}</div>
            <div className="">
              <button className="button btn-dark offer-item-button">Edit Offer</button>
              <button className="button btn-dark offer-item-button --white">Revoke</button>
            </div>
            <div className="offer-item-time"> {moment(item.date).fromNow(true) + ' left'}  </div>
          </div>
          <div className="offer-item-ammount">
            {item.ammount} NEAR
          </div>
        </>
      )}

    </OfferItemContainer>
  );
};

export default OfferItem;
