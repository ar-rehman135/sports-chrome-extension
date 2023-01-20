import styled from "styled-components";
import { VARIABLES } from "../../styles/variables";

const Form = styled.form`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  width: fit-content;
  height: 60px;
  margin: 0;
  margin-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.154px;
  color: ${VARIABLES.$accent_2};
`;

const Label = styled.label`
  margin: 14px 0 6px 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${VARIABLES.$text_200};
`;

const Button = styled.button`
  margin: 20px 0;
  width: 100%;
  margin: 24px 0;
  text-align: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid ${VARIABLES.$line_100};
  outline: none;
  background-color: ${VARIABLES.$white};
  border-radius: 8px;
  padding: 13px;
  width: -webkit-fill-available;
  &:focus,
  &:focus-visible {
    border: $black 2px solid;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${VARIABLES.$light_blue_1};
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70px;
  height: 70px;
  cursor: pointer;
  background-color: ${VARIABLES.$accent_2};
  margin: 0 auto;
  border-radius: 50px;
  margin-top: 26px;
  margin-bottom: 2px;
  & img {
    width: 21px;
  }
`;

export { Title, Label, Form, Button, Input, TitleWrapper, ImageUpload };
