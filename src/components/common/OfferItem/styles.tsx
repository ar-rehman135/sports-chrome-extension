import styled from 'styled-components';

export const OfferItemContainer = styled.div` 
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .offer-item-img {
        width: 20px;
        height: 20px;
        padding: 8px;
        border-radius: 50px;
        background: #DFDFE0;
    }
    .offer-item-body {
        text-align: start;
        .offer-item-id {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            color: #885FFF;
            margin-bottom: 7px;
        }
        .offer-item-button {
            display: inline-block;
            min-height: 24px;
            min-width: 50px;
            padding: 0 12px;
            font-size: 13px;
            margin-right: 5px;
            border-radius: 6px;
            &::after {
                content: '';
            }
            &.--white {
                background-color: white;
                border: 1px solid #000000;
                color: #000000;
            }
        }
        .offer-item-time {
            font-weight: 500;
            font-size: 12px;
            line-height: 22px;
            text-align: start;
            color: #5E6872;
            margin-top: 5px;
            &::before {
                content: '!';
                background-color: black;
                width: 17px;
                height: 16px;
                font-size: 0.8rem;
                margin: 0 5px 0 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: white;
                border-radius: 69px;
            }
        }    
        .offer-item-amount-nft {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            color: black;
        }    
    }

    .offer-item-ammount {
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        color: #1D2C3C;
    }
  
    
`