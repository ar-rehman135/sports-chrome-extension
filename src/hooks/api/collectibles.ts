import { useQuery } from "react-query";
import api from "../../services";

export const useGetAllCollectibles = (userId: string) => {
    const { data, isLoading } = useQuery('collectibles',
        () => api.getAllCollectibles(userId),
        {
            onError: (e) => {
                console.error(e);
            },
        }
    );
    return {
        collectibles: data,
        isLoading,
    };
};

export const useGetCollectibleById = (collectibleId: string) => {
    const { data, isLoading } = useQuery('collectible',
        () => api.getCollectibleById(collectibleId),
        {
            onError: (e) => {
                console.error(e);
            },
        }
    );
    return {
        collectible: data,
        isSearching: isLoading,
    };
};

export const useGetMyoffers = () => {
    const { data, isLoading } = useQuery('myOffers',
        () => api.getMyOffers(),
        {
            onError: (e) => {
                console.error(e);
            },
        }
    );
    return {
        collectibles: data,
        isSearching: isLoading,
    };
};
