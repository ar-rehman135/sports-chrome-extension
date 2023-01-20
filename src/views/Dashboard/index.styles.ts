import styled from "@emotion/styled";
import { COLORS } from "../../constants/colors";
export const AvatarsContainerStyled = styled.div`
  min-height: unset;
  box-shadow: none;
  margin: 10px 0 0 0;
  padding: 0;
  display: flex;

  flex-direction: row;

  & > * {
    border: 2px solid ${COLORS.BLUE_900};
    border-radius: 50%;
  }

  & > *:not(:first-of-type) {
    margin-left: -10px;
  }
`;
