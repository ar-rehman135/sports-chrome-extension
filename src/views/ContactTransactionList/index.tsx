import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBg from "../../components/layouts/HeaderBg";
import Transactions from "../../components/Transactions";
import { TRANSACTION_TYPE } from "../../components/Transactions/transaction.types";
import { useGetTransactionsByUserId } from "../../hooks/api/transactions";
import { getUserId } from "../../utils/utils";
import { SeeTransContact } from "../DetailContact/styles";



import "./styles.scss";


const ContactTransactionList = () => {

  const [transactionType,] = useState<TRANSACTION_TYPE>(
    TRANSACTION_TYPE.WALLET_ID
  );
  const navigate = useNavigate();
  const userId = getUserId();

  const { data, isLoading: isTransactionsLoading, isRefetching } = useGetTransactionsByUserId(
    userId,
    transactionType
  );

  return (
    <React.Fragment>
      <HeaderBg>
        <div className="transaction-list-contact-title">
          <SeeTransContact /> Transaction
        </div>
      </HeaderBg>
      <div className="transaction-list-wrapper">
        <Transactions data={data || []} isLoading={isTransactionsLoading} isRefetching={isRefetching} />
      </div>
    </React.Fragment>
  );
};

export default ContactTransactionList;
