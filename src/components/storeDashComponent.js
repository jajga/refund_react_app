import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route , Switch , Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { getStoreDash } from  '../actions/userActions';
import { getOrdersByStatus } from '../actions/orderActions';
import { decodeBase64 } from '../service/global';


class StoreDashComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            profile:'Logged in as'
        };

    }

    componentDidMount(){
        if(localStorage.getItem("storeadmin")){ 
           this.setState({profile:'Store Admin ('+localStorage.getItem("storeadmin")+')'}); 
        }
        else{
            this.setState({profile:'Finance Admin'}); 
        }

        const post = {
            storeid : localStorage.getItem("storeadmin")
        }

        this.props.getStoreDash(post);

        try {
          setInterval(async () => {
            this.props.getStoreDash(post)
          }, 300000);
        } catch(e) {
          console.log(e);
        }

    }

    onStatusChange(status){
      let storeid = 'all';
      if(localStorage.getItem("storeadmin")){
          storeid = localStorage.getItem("storeadmin");
      }

      let email = decodeBase64(localStorage.getItem('token'));
      const post = {
          storeid: storeid,
          requestedby:"storeadmin",
          email:email,
          orderstatus : status
      };


      this.props.getOrdersByStatus(post);
    }

    getOrdersByStatus(){
      consolelog('Getorder by status init')
    }

 



    render() {
        console.log('Dash data ', this.props.dash);
        return (
            <div className="container store-dashboard">
                <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-12">
                        <table className="table">
                            <thead className="">
                                <tr>
                                  <th rowSpan="1" className="bottom-border-none">Store Id</th>
                                  
                                  <th className="col-header" colSpan="3">Request Status</th>
                                  <th className="col-header" colSpan="3">Approval Status</th>
                                  <th className="bottom-border-none">Total Orders</th>
                                  
                                </tr>
                                <tr>
                                  <th className="top-border-none" scope="col"></th>
                                  <th scope="col"> New Case </th> 
                                  <th scope="col"> Initiated </th>  
                                  <th scope="col"> Cancelled </th>                              
                                  <th scope="col"> Approved </th>
                                  <th scope="col"> Rejected </th>
                                  <th scope="col"> Refunded </th>
                                  <th className="top-border-none" scope="col"></th>
                                  
                                  
                                </tr>
                              </thead>
                              <tbody>
                              {
                                this.props.dash.msg?
                                <>
                                 <tr>
                                    <td>{this.props.dash.msg.storeid}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('confirmed') }>{this.props.dash.msg.newcase}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('refundinitited') }>{this.props.dash.msg.refundinitiated}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('refundcancelled') }>{this.props.dash.msg.refundcancelled}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('approved') }>{this.props.dash.msg.financeapproved}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('rejected') }>{this.props.dash.msg.financerejected}</td>
                                    <td className="filter-status" onClick={ (e) => this.onStatusChange('refunded') }>{this.props.dash.msg.refunded}</td>
                                    <td>{this.props.dash.msg.totalorders}</td>
                                    
                                    
                                    
                                </tr></> : ''
                              }
                                
                              </tbody>  
                        </table>
                    </div>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = (state,ownProps) => ({
    user: state.user.user,
    dash: state.user.dash,
    error : state.user.error
});

export default withRouter(connect(mapStateToProps , {getStoreDash,getOrdersByStatus})(StoreDashComponent));


