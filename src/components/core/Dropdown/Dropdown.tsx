import * as React from "react";
import Select from "@mui/material/Select";

import { StyledFormControl, DivStyled, DivStyledLabel } from "./Dropdown.styles";
import { DropdownProps } from "./Dropdown.types";

export default function SelectLabels({
  leftIcon,
  subLabel,
  value,
  children,
  handleChange,
}: DropdownProps) {
  return (
    <StyledFormControl>
      <Select
        id="demo-simple-select-helper"
        value={value}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={handleChange}
        renderValue={(value) => (
          <DivStyled>
            {leftIcon}
            <DivStyledLabel>
              <span>{value}</span>
              {subLabel && <span>{subLabel}</span>}
            </DivStyledLabel>
          </DivStyled>
        )}
      >
        {children}
      </Select>
    </StyledFormControl>
  );
}
