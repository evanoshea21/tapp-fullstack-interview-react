import { motion } from "framer-motion";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import React from 'react';
import TextField from '@mui/material/TextField';


/** CSS for styled divs */


const Content = styled.form`
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

const SubmitButton = styled(motion.button)`
  padding: 12px 24px;
  width: 100%;
  margin-top: 16px;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  background-color: #000;
  transition: background-color 100ms linear, color 150ms linear;
`;

const CancelButton = styled(motion.button)`
  padding: 4px 8px;
  margin-top: 4px;
  align-self: center;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: ${theme.colors.black[80]};
  transition: background-color 100ms linear, color 150ms linear;
`;

function InputContent({sendReq, handleClose, setName}) {

  return (
    <>
      <Content>
            <Title>Find a Domain<br/>for your Business</Title>
            <TextField
            sx={{
              margin: '10px 0',
              width: '100%'
            }}
            id="outlined-basic"
            label="Your Business Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            />
            <SubmitButton
              type="submit"
              onClick={sendReq}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </SubmitButton>
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

export default InputContent;
