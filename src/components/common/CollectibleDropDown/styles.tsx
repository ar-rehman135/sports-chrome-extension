import styled from "styled-components";
import { COLORS } from "@/constants/colors";
import { MenuItem } from "@mui/material";

const StyledImageCollectible = styled.img`
  width: 30px;
  height: 30px;
  background: ${COLORS.GREY_40};
  border-radius: 10px;
  margin-right: 10px;
`;

const DivStyledLabel = styled.div`
  width: 70px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  color: ${COLORS.TEXT_100};
}`;

const DivStyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;



export { StyledImageCollectible, DivStyledLabel, DivStyledMenuItem };
