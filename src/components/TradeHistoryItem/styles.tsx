import styled from 'styled-components';

export const StyledTradeHistoryItem = styled.div` 
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    .history-item-img {
        width: 20px;
        height: 20px;
        padding: 8px;
        border-radius: 50px;
        background: #DFDFE0;
    }
    .history-item-body {
        padding-left: 10px;
        text-align: start;
        .history-item-owner {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            color: #885FFF;
            margin-bottom: 7px;
        }
        .history-item-time {
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
        .history-item-id {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            color: black;
        }    
        .history-item-to {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            color: #885FFF;
        }
    }
`