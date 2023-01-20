import React, { useEffect, useState } from "react";
import clsx from "classnames";

import "./Transactions.styles.scss";
import { getUserId } from "../../utils/utils";
import { useGetTransactionsByUserId } from "../../hooks/api/transactions";
import { RenderTransaction } from "../common/TransactionCard";
import { TRANSACTION_TYPE } from "./transaction.types";
import Loader from "../core/Loader";
import { COLORS } from "../../constants/colors";
import { RenderTransactionItem } from "./RenderTransactionItem";

const TABS = [
  { name: "all", active: true },
  { name: "sent", active: false },
  { name: "received", active: false },
];

type Props = {
  data: any[];
  isLoading: boolean;
  isRefetching: boolean;
}

const Transactions: React.FC<Props> = ({data, isLoading, isRefetching}) => {

  const [tabs, setTabs] = useState(TABS);
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.WALLET_ID
  );

  useEffect(() => {
    if (data) {
      const activeTab = tabs.find((item) => item.active)?.name;
      if (activeTab === "sent") {
        setTransactionType(TRANSACTION_TYPE.SENDER_WALLET_ID);
      } else if (activeTab === "received") {
        setTransactionType(TRANSACTION_TYPE.RECEIVER_WALLET_ID);
      } else {
        setTransactionType(TRANSACTION_TYPE.WALLET_ID);
      }
    }
  }, [data, tabs]);

  const handleTabClick = (id: number) =>
    setTabs((prevState) => {
      return prevState.map((el, idx) => {
        el.active = idx === id;
        return el;
      });
    });

  

  return (
    <div className="transactions">
      <div className="transactions__filter">
        {tabs.map((tab, idx) => (
          <button
            className={clsx("transactions__filter__btn", {
              "transactions__filter__btn--active": tab.active,
            })}
            onClick={() => handleTabClick(idx)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="transactions__list">
        {isLoading || isRefetching ? (
          <Loader style={{ color: COLORS.BLUE_900, height: 20, width: 20 }} />
        ) : data?.length === 0 ? (
          <>Your transactions will appear here</>
        ) : (
          data?.map((item, index) => <>{<RenderTransactionItem item={item} key={index} />}</>)
        )}
      </div>
    </div>
  );
};

export default Transactions;
