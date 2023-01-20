import React, { useEffect, useState } from 'react';
import { useGetTransactionByTransactionId } from '../../hooks/api/transactions';
import { RenderTransaction } from "../common/TransactionCard";

type Props = {
    item: any;
}


export const RenderTransactionItem: React.FC<Props> = ({item}) => {
    const {data, isLoading} = useGetTransactionByTransactionId(item?.transactionId);
    const [transaction, setTransaction] = useState<any | null>(null);
    useEffect(()=> {
        if(!isLoading && data ){
            setTransaction(data)
        }
    }, [!isLoading, data])
    const renderTransactions = (item: any) => {
        switch (item.type) {
          case "create_account":
            return (
              <RenderTransaction
                message="Your wallet was created"
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          case "Create_nft_series":
          case "nft_series_create":
            return (
              <RenderTransaction

                message="Created NFT Series"
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          case "transfer_nft":
            return (
              <RenderTransaction

                message="Received NFT from"
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          case "gift":
          case "unclaimed":
            return (
              <RenderTransaction

                message="Gift"
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          case "nft_series_mint":
            return (
              <RenderTransaction

                message="created and minted an NFT "
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          case "send_token":
            return (
              <RenderTransaction

                message="Sent To "
                senderWalletId={item.senderWalletId}
                created={item.created}
                type={item.type}
              />
            );
          default:
            return (
              <RenderTransaction

                message="Received NFT from"
                senderWalletId={item.senderWalletId}
                transactionHash={item?.transactionHash}
              />
            );
        }
      };
      return (
          transaction ?  renderTransactions(transaction) : null
      )
}