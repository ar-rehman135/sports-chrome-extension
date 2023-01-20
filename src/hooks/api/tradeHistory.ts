import { useQuery } from "react-query";
import api from "../../services";

export const useGetTradeHistory = (id: any) => {
    const { data, isLoading } = useQuery('tradeHistory',
        () => api.getNftTransactions(id),
        {
            onError: (e) => {
                console.error(e);
            },
        }
    );
    return {
        history: data,
        isLoading,
    };
};
