import styled from 'styled-components';

export const StyledButton = styled.div`
position: absolute;
left: 6.08%;
right: 5.8%;
top: 62.74%;
bottom: 30.64%;
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
padding: 12px 90px;
  .icon {
    position: absolute;
    left: 5%;
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

export const StyledDetailCollectible = styled.div`
position: relative;
.icon-section {
    .background {
        filter: blur(1px) brightness(0.4);
        position: absolute;
        width: 362px;
        height: 180px;
        left: 0px;
        background: rgba(10, 10, 11, 0.6);
    }
    .icon{
        position: absolute;
        width: 170px;
        height: 145.7px;
        left: 96px;
        top: 17px;
    }
}
.detail-section {
    .name{
        position: absolute;
        height: 22px;
        left: 15px;
        top: 196px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #000000;
    }
    .number {
        position: absolute;
        height: 20px;
        left: 20px;
        top: 224px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        color: #885FFF;
    }
    .owner-wrapper {
        position: absolute;
        height: 38px;
        left: 34px;
        top: 255px;
        display: flex;
        .name-wrapper {
            display: flex;
            flex-direction: column;
            font-family: Manrope;
            font-style: normal;
            font-size: 14px;
            line-height: 19px;
            margin-left: 5px;
            .owner-label {
                font-weight: 500;
                margin-left: 10px;
            }
            .owner-name {
                font-weight: 600;
                text-align: center;
                letter-spacing: -0.154px;
                color: #33373B;
            }
        }
    }
}
.tabs-wrapper {
    padding-top: 313px;
   }
.overview-section{
    cursor: pointer;
    justify-content: space-between;
    display:flex;
    flex-direction: row;
    margin: 0px 10px;
    .chevron-close {
        transform: rotate(90deg);
    }
    .chevron-open {
        transform: rotate(270deg);
    }
}
.description {
    text-align: left;
    margin: 0px 10px;
}
.tabs-wrapper-owner {
    padding-top: 265px;
}
`