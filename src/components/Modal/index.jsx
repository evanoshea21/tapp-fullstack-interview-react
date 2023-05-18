import { motion } from "framer-motion";
import styled from "styled-components";
import { Modal } from "@mui/material";
// import { theme } from "../../styles/theme";
import React from 'react';
import { API_ROUTE } from '../../constants.js';
import axios from 'axios';
import InputContent from './InputContent.jsx';
import LoadingContent from './LoadingContent.jsx';
import ErrorContent from './ErrorContent.jsx';
import ResultsContent from './ResultsContent.jsx';


/** CSS for styled divs */

const ModalView = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  margin: 0;
  box-sizing: border-box;
  display: flex;
  padding: 48px;
  padding-bottom: 32px;
  min-width: 350px;
  background-color: #ffffff;
`;



function ModalComponent(props) {
  const { isOpen, setIsOpen } = props;
  const [modalContent, setModalContent] = React.useState('input');
  const [results, setResults] = React.useState([]);
  //Req body
  const [businessName, setBusinessName] = React.useState('');
  const [urlContext, setUrlContext] = React.useState('');

  const handleClose = () => {
    setIsOpen(false);
    setModalContent('input');
    setBusinessName('');
    setUrlContext('');
  };

  async function sendReqWithBody() {
    setModalContent('loading');
    try {
      const {data} = await axios.post(API_ROUTE + "/api/v1/get-domains", {
        name: `${businessName}`, context: urlContext
      });

      let GPTresponse = data.data.split('\n');
      console.log(GPTresponse);

      let hasApology =  GPTresponse[0].toLowerCase().indexOf('sorry') !== -1 ||
                        GPTresponse[0].toLowerCase().indexOf('unfortunately') !== -1 ||
                        GPTresponse[0].toLowerCase().indexOf('apologize') !== -1;

      if(hasApology) {
        setResults(GPTresponse);
        setModalContent('error');
        return;
      }

      let listOfDomains = [];

      data.data.split('\n').forEach(listItem => {
        let split = listItem.split(' ');
        if(split[0].charAt(split[0].length-1) === '.' && split[1].indexOf(' ') === -1) {
          listOfDomains.push(split[1]);
        }
      });

      console.log('formatted list:\n', listOfDomains);

      if(listOfDomains.length === 0) { //error from gpt
        setResults(GPTresponse);
        setModalContent('error');
      } else {
        setResults(listOfDomains);
        setModalContent('results');
      }
      //potential responses
      /*
      IDEAL: Ordered list, every item starts with #.
        - split it, verify split[0] last char is a '.', then push split[1] into list

      Error: if list is empty^^ then...
        - Display GPT responsne in UI and allow User to try again (button)
      */

      // alert("Success. Got a response, check if valid JSON/array");
    } catch (error) {
      alert("Failed to get response from domain input");
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalView
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {modalContent === 'input' && (
            <InputContent handleClose={handleClose} setName={setBusinessName} sendReq={sendReqWithBody}/>
          )}
          {modalContent === 'loading' && (
            <LoadingContent />
          )}
          {modalContent === 'error' && (
            <ErrorContent errorMsg={results} sendReq={sendReqWithBody} setContext={setUrlContext} setModalContent={setModalContent} handleClose={handleClose}/>
          )}
          {modalContent === 'results' && (
            <ResultsContent results={results} handleClose={handleClose}/>
          )}

        </ModalView>
      </Modal>
    </>
  );
}

export default ModalComponent;
