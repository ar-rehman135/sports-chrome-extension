import React from "react";
import { useGetTradeHistory } from "../../hooks/api/tradeHistory";
import TradeHistoryItem from "../TradeHistoryItem";
interface Props {
  id: string;
}

const TradeHistoryList = ({ id }: Props) => {
  const { history, isLoading } = useGetTradeHistory(id);
  if (isLoading) return <>Searching...</>;
  else
    return (
      <>
        {history &&
          history.map((item: any) => (
            <TradeHistoryItem key={item.id} item={item} />
          ))}
      </>
    );
};

export default TradeHistoryList;
