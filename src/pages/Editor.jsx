import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Site from "../components/Site";
import { theme } from "../styles/theme";
import {Context} from '../components/ContextAPI.jsx';
import React from 'react'

// Component Styles

const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1700px;
  margin: 0 auto;
  height: 100vh;
  padding: 32px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const SiteWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid ${theme.colors.black[40]};
  border-radius: 8px;
  background-color: ${theme.colors.black[10]}; // Change to Primary color
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Root Editor View */
function Editor() {
  const {domain} = React.useContext(Context);

  React.useEffect(() => {
    console.log('your new domain: ', domain);
  }, [domain])

  return (
      <Root>
        <SiteWrapper layout>
          {domain ? (
            <>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              transform: 'translateY(-20px)'
            }}>
              <h1 style={{fontSize: '4rem'}}>Your new Domain!</h1>
              <p style={{fontSize: '3rem'}}>{domain}</p>
            </div>
            </>
          ) : (
            <Site/>
          )}
        </SiteWrapper>
      </Root>
  );
}

export default Editor;
