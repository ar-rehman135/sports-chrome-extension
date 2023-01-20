import React from "react";
import { StyledTradeHistoryItem } from "./styles";

interface Props {
  item: any;
}

const TradeHistoryItem = ({ item }: Props) => {
  return (
    <StyledTradeHistoryItem>
      {
        <>
          <img className="history-item-img" src={item.icon} alt="" />
          <div className="history-item-body">
            <span>
              <span className="history-item-owner">
                {item.recipient.wallet_id}{" "}
              </span>
              bought{" "}
              <span className="history-item-id">
                #{item.transaction_item_id}
              </span>{" "}
              from
              <span className="history-item-to"> {item.sender.wallet_id}</span>
            </span>
            <div className="history-item-time"> {item.formattedtime} </div>
          </div>
        </>
      }
    </StyledTradeHistoryItem>
  );
};

export default TradeHistoryItem;
