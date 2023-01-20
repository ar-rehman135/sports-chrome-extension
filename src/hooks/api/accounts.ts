import { useQuery } from "react-query";
import api from "../../services";

export const useGetAccounts = (user_id: string) => {
  const { data, isLoading } = useQuery('accounts',
    () => api.getAccounts(user_id),
    {
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    accounts: data,
    isSearching: isLoading,
  };
};

export const useGetWalletBalance = (walletId: string) => {
  const { data, isLoading } = useQuery('useGetWalletBalance',
    () => api.getWalletBalance(walletId),
    {
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    walletBalance: data,
    isLoadingBalance: isLoading,
  };
};