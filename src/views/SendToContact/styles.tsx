import styled from 'styled-components';
import { VARIABLES } from '../../styles/variables';


const SendSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    .label {
        margin: 10px;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        align-items: flex-start;
    }
    .reciever {
        display: flex;
        margin: 10px;
        align-items: center;
        span {
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;  
        }
    }
    .pill {
        width: 101px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #885FFF;
        border-radius: 10px;
        font-weight: 500;
        font-size: 14px;
        height: 31px;
        letter-spacing: -0.154px;
        color: #FCFCFC;
        margin-left: 20px;
    }
    .row {
        display: flex;
        align-items: center;
    }
    .circle {
        margin-right: 20px;
        width: 35px;
        height: 35px;
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
    }
    button {
        align-self: center;
        margin: 40px;
        &::after {
            content: "";
            position: absolute;
            right: 9px;
            font-size: 22px;
        }
        img {
            position: absolute;
            right: 14px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .near-ammount {
            position: relative;
            &::after {
                content: "NEAR";
                position: absolute;
                right: 10px;
                font-weight: 600;
                top: 0;
                display: flex;
                align-items: center;
                height: 42px;
                padding: 0 10px;
                border-left: 1px solid #DFDFE0;
            }
        }
    }
`;

const HeaderSend = styled.div`
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #DFDFE0;
    padding-bottom: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.154px;
    color: #587BE0;
    img {
        margin-right: 10px;
    }
`;

const Label = styled.label`
    margin: 14px 0 6px 0;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: ${VARIABLES.$text_200};
`;





export { Label,HeaderSend, SendSection };
