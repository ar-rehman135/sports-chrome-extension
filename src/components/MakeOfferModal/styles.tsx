import styled from 'styled-components';

export const StyledMakeOfferModal = styled.div`
padding: 20px;
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.expires_label {
    margin-left: 1px;
    margin-bottom: 10px;
}
input {
    width: 242px; 
}
.remain {
    margin-top: 10px;
}
.balance {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}
.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .cross {
        margin-left: auto;
        cursor: pointer;
    }
}
.number {
    font-family: Manrope;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #885FFF;
}
.amount {
    position: relative;
    .amount_label{
        font-size: 14px;
        position: relative;
        margin-right: auto;
        display: flex;
        margin-bottom: 10px;
    }
    &::after {
        content: "NEAR";
        top: 30px;
        height: 43px;
        right: 15px;
        padding: 0 0 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #BEBEC2;
        z-index: 9999;
        color: black;
        position: absolute;
        font-weight: 600;
        font-size: 16px;
    }
    
}
`;

export const StyledButton = styled.button`
margin-top: 10px;
background: #885FFF;
border-radius: 10px;
cursor: pointer;
font-family: Manrope;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 22px;
color: #587BE0; 
display: flex;
align-items: center;
flex-direction: row;
border-bottom: 1px solid #DFDFE0;
padding: 12px 80px;
.icon {
    position: absolute;
    left: 10%;
}
.body__title {
    margin-left: 22px;
    font-family: Manrope;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.408px;
    color: #FFFFFF;
}
`
