import { useMutation, useQuery } from "react-query";
import api from "../../services";

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
        offers: data,
        isLoading,
    };
};

export const useOffers = () => {
    const { mutateAsync, isLoading } = useMutation(
      (offerData: any) => api.createOffer(offerData),
      {
        onSuccess: () => {},
        onError: (e) => {
          console.error(e);
        },
      }
    );
    return {
      createOffer: mutateAsync,
      isCreating: isLoading,
    };
  };
