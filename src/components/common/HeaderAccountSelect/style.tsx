import styled from "styled-components";

const NotificationBadge = styled.a`
  position: relative;
`;

const Badge = styled.div`
  background-color: #d2625b;
  border-radius: 20px;
  width: 21px;
  height: 15px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 10px;
  color: #FFFFFF;
`;

export { NotificationBadge, Badge };
