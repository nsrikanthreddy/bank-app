import React from "react";
import {Button,Modal} from 'react-bootstrap';

function AlertModal (props){
   return( <Modal show={props.modalShow}>
    <Modal.Header closeButton>
      <Modal.Title>Invalid Input</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{props.message}</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.setModalShow()}>Close</Button>
    </Modal.Footer>
  </Modal>)
}
export default AlertModal;