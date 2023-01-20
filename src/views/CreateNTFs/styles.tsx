import styled from 'styled-components';

const CreateNFTSection = styled.section`
    
`;

const Button = styled.button`
    margin: 24px;
    width: calc(100% - 48px);
    position: relative;
    justify-content: center;
    display: flex;
    &::after {  
        content: "+";
        position: absolute;
        left: -263px;
        font-size: 29px;
    }
`;




export { CreateNFTSection, Button };
