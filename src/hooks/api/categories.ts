import { useQuery } from "react-query";
import api from "../../services";

export const useGetAllCategories = () => {
    const { data, isLoading } = useQuery('categories',
        () => api.getAllCategories(),
        {
            onError: (e) => {
                console.error(e);
            },
        }
    );
    return {
        categories: data,
        isSearching: isLoading,
    };
};