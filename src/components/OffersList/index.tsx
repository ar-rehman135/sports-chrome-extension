import React from "react";
import { useGetMyoffers } from "../../hooks/api/offers";
import OfferItem from "../common/OfferItem";

interface Props {
  fromNFT?: boolean;
}

const OffersList = ({ fromNFT }: Props) => {
  const { offers, isLoading } = useGetMyoffers();

  if (isLoading) return <>Searching...</>;
  else
    return (
      <>
        {offers &&
          offers.map((offer: any) => (
            <OfferItem
              key={offer.id}
              item={offer}
              onClick={() => {}}
              fromNFT={fromNFT}
            />
          ))}
      </>
    );
};

export default OffersList;
