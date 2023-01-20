import React from "react";
import DropDown from "@/components/core/Dropdown";

import { DivStyledLabel, StyledImageCollectible, DivStyledMenuItem } from "./styles";

interface Props {
  items: any;
  handleChange?: any;
  selectedNFT: any;
}

const CollectibleDropDown = ({ selectedNFT, items, handleChange }: Props) => {
  return (
    <>
      {" "}
      <DivStyledLabel className="label">Select Nft</DivStyledLabel>
      <DropDown
        leftIcon={<StyledImageCollectible src={selectedNFT?.filePath} />}
        value={selectedNFT && selectedNFT.title}
        handleChange={handleChange}
      >
        {items?.map((collectible: any) => (
          <DivStyledMenuItem key={collectible?.title} value={collectible}>
            <StyledImageCollectible src={collectible.filePath} />
            <span>{collectible?.title}</span>
          </DivStyledMenuItem>
        ))}
      </DropDown>
    </>
  );
};

export default CollectibleDropDown;
