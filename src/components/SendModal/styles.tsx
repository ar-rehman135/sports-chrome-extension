import styled from 'styled-components';

export const StyledSendModal = styled.div`
    cursor: pointer;
    font-family: Manrope;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    height: 40px;
    color: #587BE0; 
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid #DFDFE0;
    padding: 12px 90px;
      .icon {
        margin-right: 10px;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
`