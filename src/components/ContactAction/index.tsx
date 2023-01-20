import React from 'react';
import styled from '@emotion/styled'
import trashbin from '../../public/assets/svg/trash-bin.svg';

interface Props {
    checkboxComponent?: React.ReactNode;
}
  
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    gap:.5rem;

`

const ContactAction = ({ checkboxComponent }:Props) => {
    return (
        <Wrapper>
            {checkboxComponent}
            <img src={trashbin} />
        </Wrapper>
    )
}

export default ContactAction;