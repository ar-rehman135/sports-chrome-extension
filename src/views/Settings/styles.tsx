import styled from 'styled-components';

const StyledSettings = styled.div`
    .title {
        text-align: left;
        padding: 10px;
        background-color: #F5F5F5;
        font-family: Manrope;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #0F2035;
    }
    .section {
        cursor:pointer;
        &.icons {
            align-items: start;
            flex-direction: column;
            .label {
                padding-bottom: 10px;
            }
            .icons-list {
                flex-direction: row;
                .item {
                    margin: 0 5px;
                    &:hover {
                        cursor: pointer;
                    }
                    &.selected {
                        border: 2px solid black;
                        border-radius: 50%;
                    }
                }
            }
        }
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 17px 10px;
        border-bottom: 1px solid #DFDFE0;
        .chevron {
            margin-left: auto;
        }
        .value {
            margin-left: auto;
        }
    }
    
`
export { StyledSettings }