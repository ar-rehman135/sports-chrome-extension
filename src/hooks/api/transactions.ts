import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { TRANSACTION_TYPE } from '../../components/Transactions/transaction.types';
import api from '../../services';

export const useGetTransactionsByUserId = (userId: string, transactiontype: TRANSACTION_TYPE) => {
  const { data, isLoading, refetch, isRefetching } = useQuery('transactions',
    () => api.getTransactions(userId, transactiontype),
    {
      onError: (e) => {
        return {
          data: [],
          isLoading: false,
        }
      },
    }
  );

  useEffect(() => {
    refetch()
  }, [transactiontype])

  return { data, isLoading, isRefetching };
};

export const useGetTransactionByTransactionId = (transactionId: string) => {
  return useQuery(`/transactions/${transactionId}`, () => api.getTransactionsById(transactionId))
}
