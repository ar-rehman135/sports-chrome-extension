import { ReactNode } from "react";
import { SelectProps } from "@mui/material";

export interface DropdownProps extends SelectProps {
  leftIcon: ReactNode;
  subLabel?: string;
  handleChange?: any;
  value: any;
  options?: any;
}
