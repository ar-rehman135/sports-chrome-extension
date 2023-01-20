import React from "react";
import clsx from "classnames";
import "./styles.scss";
import moment from "moment";
const ICONS = {
  sender: `/assets/svg/direction-sent.svg`,
  receiver: "/assets/svg/direction-receive.svg",
};

export const RenderTransaction = ({
  type,
  message,
  senderWalletId,
  created,
}: any) => (
  <div
    className={clsx("transaction", {
      "transaction--sender": type !== "transfer_nft",
      "transaction--receiver": type === "transfer_nft",
    })}
  >
    <div className="transaction__icon-direction">
      <img
        src={type === "transfer_nft" ? ICONS.receiver : ICONS.sender}
        alt="direction"
      />
    </div>
    <div className="transaction__main-info">
      <div className="transaction__type">{message} </div>
      <div className="wallet__id">{senderWalletId}</div>
      <div className="transaction__date">
        {moment.utc(created).local().startOf("seconds").fromNow()}
      </div>
    </div>
    <div className="transaction__amount">0.456 NEAR</div>
  </div>
);
