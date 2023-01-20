import React from "react";
import { useNavigate } from "react-router";
import { useGetAllCollectibles } from "../../hooks/api/collectibles";
import CollectibleItem from "../common/CollectibleItem";
import { ROUTES } from "../../const/routeNames";
import { getUserId } from "../../utils/utils";
import Loader from "../core/Loader";
import { COLORS } from "../../constants/colors";

const NFTList = () => {
  const userId = getUserId();

  const navigate = useNavigate();
  const { collectibles, isLoading } = useGetAllCollectibles(userId);

  if (isLoading)
    return <Loader style={{ color: COLORS.BLUE_900, height: 20, width: 20 }} />;
  else
    return (
      <>
        {collectibles?.length === 0 ? (
          <>Your Collectibles will appear here</>
        ) : (
          collectibles?.map((collectible: any) => (
            <CollectibleItem
              key={collectible.title}
              item={collectible}
              onClick={() =>
                navigate(
                  ROUTES.DETAIL_COLLECTIBLE.url.replace(
                    ":id",
                    collectible.nftId
                  )
                )
              }
            />
          ))
        )}
      </>
    );
};

export default NFTList;
