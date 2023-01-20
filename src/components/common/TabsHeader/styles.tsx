import styled from 'styled-components';
import { VARIABLES } from '../../../styles/variables';

interface Props {
    widthMax: string;
    active?: boolean;
  }

const Tab = styled.div<Props>`
  position: relative;
  max-height: 74px;
  max-width: ${(props: any) => props.widthMax} ;
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 17px 0;
  background: white;
  overflow: hidden;
  text-align: center;
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
  font-style: normal;
  //font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${(props: Props) => props.active ? '#000000' : '#607D8B'};
`;

const TabIndicator = styled.div<Props>`
  width: ${(props: any) => props.widthMax} ;
  height: 3px;
  background: #33373B;
  position: absolute;
  bottom: 0;
  margin-left:0;
  transition: margin 0.5s ease;
`;

const TabBar = styled.div`
  position: relative;
  margin: 30px auto;
  display: flex;
  list-style-type: none;  
  // box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-bottom: 1px solid ${VARIABLES.$grey_light_3};
`;


export { Tab, TabIndicator, TabBar};