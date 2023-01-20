import styled from "styled-components";
import { VARIABLES } from "../../styles/variables";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const AddButton = styled.a`
  position: relative;
  margin: 20px;
  color: ${VARIABLES.$blue_100};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

export const ImportButton = styled(AddButton)`
  color: #32404e;
  &::before {
    content: "";
    position: absolute;
    width: 25px;
    height: 20px;
    left: -30px;
    top: 1px;
    display: inline-block;
    background-repeat: no-repeat;
    background-image: url("./assets/Import.svg");
  }
`;

export const CreateButton = styled(AddButton)`
  color: #32404e;
  &::before {
    content: "";
    position: absolute;
    width: 19px;
    height: 19px;
    left: -25px;
    top: 1px;
    display: inline-block;
    background-repeat: no-repeat;
    color: #32404e;
    background-image: url("./assets/Add.svg");
  }
`;
