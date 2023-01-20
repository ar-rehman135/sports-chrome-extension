import { MenuItem } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import { VARIABLES } from "../../styles/variables";

const SendSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  .label {
    width: 70px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    color: ${COLORS.TEXT_100};
  }
  .amount-input {
    .input {
      width: 90%;
    }
    width: 100%;
    position: relative;
    height: 50px;
    &::after {
      content: "NEAR";
      top: 0;
      height: 41px;
      width: 45px;
      right: 15px;
      padding: 0 0 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid ${COLORS.GREY_LIGHT_2};
      color: black;
      position: absolute;
      font-weight: 600;
      font-size: 16px;
    }
  }
  .reciever {
    display: flex;
    margin: 10px;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .pill {
    width: 101px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.ACCENT_2};
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    height: 31px;
    letter-spacing: -0.154px;
    color: ${COLORS.GREY_20};
    margin-left: 20px;
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .circle {
    margin-right: 20px;
    width: 35px;
    height: 35px;
    background: ${VARIABLES.$grey_light_3};
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.154px;
    color: ${VARIABLES.$text_200};
  }
  .action-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    border-radius: 10px;
    background-color: ${COLORS.TEXT_100};
    width: 100%;
    color: ${COLORS.WHITE};
    height: 40px;
    margin-top: 20px;
  }
  .input-notes {
    height: 70px;
    width: 100%;
    border: 1px solid ${COLORS.GREY_DARK};
  }
  .nft-img {
  }
`;

const HeaderType = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  height: 40px;
  background-color: ${COLORS.BLUE_500};
  color: ${COLORS.ACCENT_2};
`;

const Label = styled.label`
  margin: 14px 0 6px 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${VARIABLES.$text_200};
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  position: static;
  height: 30px;
  left: 122px;
  top: 10px;
  background: ${({ isActive }) => (isActive ? COLORS.TEXT_100 : COLORS.WHITE)};
  color: ${({ isActive }) => (isActive ? COLORS.WHITE : COLORS.TEXT_100)};
  border: 1px solid ${COLORS.GREY_DARK};
  border-radius: 6px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 5px !important;
`;

const DivStyledImage = styled.div`
  width: 35px;
  height: 35px;
  background: ${COLORS.GREY_LIGHT_2};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${COLORS.TEXT_200};
  margin-right: 10px;
`;

const DivStyledLeftIcon = styled.div`
  width: 30px;
  height: 30px;
  background: ${COLORS.GREY_LIGHT_2};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${COLORS.TEXT_200};
  margin-right: 10px;
`;

const DivStyledOption = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const StyledImageCollectible = styled.img`
  width: 30px;
  height: 30px;
  background: ${COLORS.GREY_40};
  border-radius: 10px;
  margin-right: 10px;
`;

export {
  Label,
  HeaderType,
  SendSection,
  DivStyledImage,
  DivStyledOption,
  DivStyledLeftIcon,
  StyledButton,
  StyledImageCollectible,
};
