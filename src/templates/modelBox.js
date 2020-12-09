import React , { useState } from "react";
import 'react-dates/initialize';
import DatePicker from 'react-datepicker';

import {SingleDatePicker} from 'react-dates';
import { Button , Modal } from 'react-bootstrap';



const ModelBoxTemplate = function(data){

    return (
        <>
          
            <Modal show={data.props.state.modalShow} onHide={()=>data.props.onModalClose()} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>{data.props.state.modelAttrs.modelHeader}</Modal.Title>
              </Modal.Header>
             
                {(() => {
                switch (data.props.state.modelAttrs.modelType){
                  case "reject_return":   return <>
                    <Modal.Body>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Please choose a reason </label>
                      </div>
                      <select className="custom-select" id="inputGroupSelect01" onChange={(ele)=>data.props.onReasonChange(ele)}>
                        <option selected>Choose...</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Rider unavailable">Rider unavailable</option>
                        <option value="Out of trade zone">Out of trade zone</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please enter details" onChange={(ele)=>data.props.onReasonDescChange(ele)}>{data.props.state.modelAttrs.description}</textarea>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={()=>data.props.onModalClose()}>
                        Close
                      </Button>
                      {data.props.state.modelAttrs.btndisabled ? <Button variant="danger" disabled="disabled" >Reject</Button> :  <Button variant="danger" onClick={()=>data.props.onModalSave()}>Reject</Button> }
                    </Modal.Footer>
                  </> ;

                  case "return_approve":   return <>
                    <Modal.Body>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Please choose a reason </label>
                      </div>
                      <select className="custom-select" id="inputGroupSelect01" onChange={(ele)=>data.props.onReasonChange(ele)}>
                        <option selected>Choose...</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Rider unavailable">Rider unavailable</option>
                        <option value="Out of trade zone">Out of trade zone</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please enter details" onChange={(ele)=>data.props.onReasonDescChange(ele)}>{data.props.state.modelAttrs.description}</textarea>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={()=>data.props.onModalClose()}>
                        Close
                      </Button>
                      {data.props.state.modelAttrs.btndisabled ? <Button variant="danger" disabled="disabled" >Intiate Return</Button> :  <Button variant="danger" onClick={()=>data.props.onModalCancelOrder()}>Intiate Return</Button> }
                    </Modal.Footer>
                  </> ;
                  
                  default: return <h3>Invalid Type </h3> ;
                }

                })()}
              
            </Modal>
        </>    


    )
}

export default ModelBoxTemplate;
