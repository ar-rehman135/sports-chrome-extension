import styled from "styled-components";
import { VARIABLES } from "../../styles/variables";

const DetailSection = styled.section`
  padding: 14px 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IconButton = styled.a`
  height: 24px;
  width: 24px;
  margin: 9px;
  display: inline-block;
`;

const SeeTransContact = styled(IconButton)`
  background-image: url("/assets/svg/transaction-contact.svg");
`;

const EditContact = styled(IconButton)`
  background-image: url("/assets/svg/edit-contact.svg");
`;

const ContactIcon = styled.div`
  width: 45px;
  height: 45px;
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
`;

const NameH2 = styled.h2`
  align-self: flex-start;
  margin: 10px 0 2px 0;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: ${VARIABLES.$text_100};
`;

const SubtitleEmail = styled.span`
  align-self: flex-start;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.154px;
  color: ${VARIABLES.$text_200};
`;

const ConnectedCount = styled.div`
  text-align: left;
  margin-left: 20px;
  color: ${VARIABLES.$text_200};
`;

const ButtonWrapper = styled.a`
  font-family: Manrope;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  height: 40px;
  color: ${VARIABLES.white};
  display: flex;
  align-items: center;
  margin: 17px 23px;
  flex-direction: row;
  background: #414047;
  border-radius: 10px;

  .body {
    margin-left: auto;
  }

  .icon {
    margin-left: auto;
    margin-right: 10px;
  }
`;

const GuestContactWrapper = styled.div`
  margin-top: 100px;
`;

const DivLoader = styled.div`
  margin-top: 20px;
`;

export {
  ContactIcon,
  DetailSection,
  HeaderContact,
  EditContact,
  SeeTransContact,
  NameH2,
  SubtitleEmail,
  ConnectedCount,
  ButtonWrapper,
  GuestContactWrapper,
  DivLoader,
};
