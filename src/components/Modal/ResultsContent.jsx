import { motion } from "framer-motion";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import React from 'react';
import {Context} from '../ContextAPI.jsx'



/** CSS for styled divs */

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: #000;
`;

const CancelButton = styled(motion.button)`
  padding: 4px 8px;
  margin-top: 4px;
  align-self: center;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: ${theme.colors.black[80]};
  transition: background-color 100ms linear, color 150ms linear;
`;

const ListItem = styled.p`
  font-size: ${props => props.$fontSize};
  padding: 8px;
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;

function ResultsComponent({results, handleClose}) {
  const {setDomain} = React.useContext(Context);

  const chooseDomain = (domain) => {
    setDomain(domain);
    handleClose();
  };

  return (
    <>
      <Content>
      <Title>These domains are available!</Title>

      <div style={{
         margin: '15px 0',
         maxHeight: '310px',
         overflowY: 'scroll',
         padding: '5px 20px',
         width: '90%',
         border: '2px dotted lightgrey',
         borderRadius: '5px'
      }}>
        {results.map((domain, i) => {
          return (
            <ListItem $fontSize={domain.length < 18 ? '24px' : '20px'} key={i + domain.slice(0,4)}
            onClick={() => chooseDomain(domain)}
            >{domain}</ListItem>
            )
        })}
      </div>

        <CancelButton
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
        >
          Cancel
        </CancelButton>
      </Content>
    </>
  );
}

export default ResultsComponent;
