import styled from "styled-components";
import React from 'react';
import { theme } from "../../styles/theme";



/** CSS for styled divs */

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
`;

const Subtitle = styled.h4`
  font-size: 24px;
  max-width: 300px;
  font-weight: 400;
  color: ${theme.colors.black[80]};
  margin-bottom: 16px;
`;


function LoadingComponent() {

  return (
    <>
      <Content>
        <Subtitle>Loading responses...</Subtitle>
      </Content>
    </>
  );
}

export default LoadingComponent;
