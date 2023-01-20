import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { COLORS } from "../../../constants/colors";

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  border-radius: 10px;
  .MuiSelect-outlined {
    padding: 10px;
    background-color: ${COLORS.GREY_50};
  }
`;
export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const DivStyledLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;
