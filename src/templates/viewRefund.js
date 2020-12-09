import React from "react";
import {Form, Input, FormGroup, Container, Label} from 'reactstrap';
import 'react-dates/initialize';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminHeaderComponent from '../components/adminHeaderComponent';
//import "react-datepicker/dist/react-datepicker.css";
//import { ReactDatePicker } from 'react-date-picker-cs';
//import DatePicker from 'react-bootstrap-date-picker';



import {SingleDatePicker} from 'react-dates';

const ViewRefundTemplate = function(props){
    let orderArrayObj = this.props.orders;
    const orderList = Object.keys(this.props.orders).map( (key, index) =>
        <tr key={key}>
          <td className="order-no">{orderArrayObj[key].orderNo}<span className="spnTooltip"> 
          <p className="hover-header"><strong>Order # : {orderArrayObj[key].orderNo}</strong> { orderArrayObj[key].refundreference ?  <span className="order-refrence-block">Refund Refrence # : {orderArrayObj[key].refundreference}</span> : ''}</p> 
          <table><thead><tr><th>Stages</th>{orderArrayObj[key].stages.stage.map((k,i) => <th key={Math.round(Math.random() * (1000 - 10) + 10)}>{k}</th> )}</tr></thead>
          <tbody><tr><td>Time</td>{orderArrayObj[key].stages.time.map((k,i) => <td key={Math.round(Math.random() * (10000 - 10) + 10)}>{k}</td> )}</tr>
          <tr><td>Action By</td>{orderArrayObj[key].stages.actionedby.map((k,i) => <td key={Math.round(Math.random() * (100000 - 10) + 10)}>{k}</td> )}</tr></tbody></table> 
          </span>
          </td>
          <td className="order-no">{orderArrayObj[key].storeid}</td>
          <td>{orderArrayObj[key].storename }</td>
          <td className="order-date">{orderArrayObj[key].orderDate}</td>
          <td className="order-amt">{orderArrayObj[key].amount}</td>
          <td className="cust-name">{orderArrayObj[key].customerName}</td>
          <td>{orderArrayObj[key].mobile}</td>
          <td>{orderArrayObj[key].paymentstatus}</td>
          <td>{orderArrayObj[key].paymentChannel}</td>
          <td>{orderArrayObj[key].orderpaymentreference}</td>
          <td>{orderArrayObj[key].lastupdated}</td>
          <td>
          {(() => {
          switch (orderArrayObj[key].status){
            case "refundinitited":   return <><button className="btn-success btn-sm" onClick={()=>this.onApproveOrder(orderArrayObj[key].order_id , key)}>Approve</button><button className="btn-danger btn-sm" onClick={()=>this.onRejectOrder(orderArrayObj[key].order_id , key)}>Reject</button></> ;
            case "approved": return  <button disabled className="btn btn-sm btn-success">Refund Approved</button>;
            case "rejected":  return <button disabled className="btn btn-sm btn-danger">Refund Rejected</button>;
            default:      return <button disabled className="btn btn-sm btn-danger">{orderArrayObj[key].action}</button>
          }

          })()}
          </td>
        </tr>
    );

    return (
        <>
            <AdminHeaderComponent/>
        
            <div className="container page finance ">
                    <div className="page-title">
                        <h3>Order(s) View</h3>
                    </div>
                    <form className="form-inline form-search-order " onSubmit={(event)=>{this.onSubmit(event)}}>
                        { !this.state.orderErr ? '' : <span class="error text-danger ">Order Error</span> }
                        <div className="form-group">
                            <div className="form-label-group">
                                <label>Select Date Range</label>
                            </div>    
                            <div className="form-label-group">

                            

                            <select className="form-control" onChange={ (days) => this.onDayChange(days) }>
                                <option value="0">Current Day</option>
                                <option value="1">Last 1 Day(s)</option>
                                <option value="7">Last 7 Day(s)</option>
                                <option value="14">Last 14 Day(s)</option>
                                <option value="30">Last 30 Day(s)</option>
                                <option value="60">Last 60 Day(s)</option>
                            </select>

                            
                                

                                
                            </div>
                        </div> 

                        <div className="form-group">
                            <div className="form-label-group">
                                <label>Select status </label>
                            </div>  

                            <select className="form-control" onChange={ (e) => this.onStatusChange(e) }>
                                <option value="confirmed">New Record</option>
                                <option value="all">All</option>
                                <option value="refundinitited">Refund Intiated</option>
                                <option value="approved">Refund Approved</option>
                                <option value="rejected">Refund Rejected</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        

                          
                        <button type="submit" className="btn fn-submit-order-btn btn-danger btn-sm text-uppercase">Search</button>

                        <button className="btn report-order-btn btn-success btn-sm text-uppercase" onClick={ (e) => this.onDwnldReport(e) }>Download Report</button>
                    </form>
                    { this.props.error.search ?  <>
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>{this.props.error.msg}</strong> 
                    </div>
                    </> : '' 

                    }
                    <div className="order-list">
                        <table className="table">
                            <thead className="kfc-red-bg">
                                <tr>
                                  <th scope="col">Order #</th>
                                  <th scope="col">Store id</th>
                                  <th scope="col">Store Name</th>
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Customer Name</th>
                                  <th scope="col">Mobile</th>
                                  <th scope="col">Payment Status</th>
                                  <th scope="col">Payment Channel</th>
                                  <th scope="col">Payment Reference</th>
                                  <th scope="col">Last Updated</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                               {orderList}
                              </tbody>  
                        </table>
                    </div>

                   
            </div>
        </>    


    )
}

export default ViewRefundTemplate;