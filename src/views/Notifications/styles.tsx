import styled from 'styled-components';
import { VARIABLES } from '../../styles/variables';


const Header = styled.h1`
    background-color: #F5F5F5;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    margin: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${VARIABLES.$grey_light_3};
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.154px;
`;

const ItemNotification = styled.div`
    padding: 20px;
    display: flex;
    border-bottom: 1px solid ${VARIABLES.$grey_light_3};
`;

const ImgNotification = styled.img`
    width: 35px;
    height: 35px;
   
`;

const BodyNotification = styled.div`
   display: flex;
   padding-left: 20px;
   flex-direction: column;
   align-items: flex-start;
   text-align: start;
`;

const BodyTextNotification = styled.div`
    width: 260px;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    span {
        color: ${VARIABLES.$accent_2};
    }
`;

const BodyTimeNotification = styled.div`
    padding-left: 145px;
    font-size: 8px;
    line-height: 18px;
`;

const HeaderNotification = styled.div`
    padding-bottom: 4px;
    display: flex;
`;

export { Header, ItemNotification, ImgNotification, BodyNotification, BodyTextNotification, BodyTimeNotification, HeaderNotification };
