import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route , Switch , Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { decodeBase64 } from '../service/global';


class AdminHeaderComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            profile:'Logged in as'
        };

    }

    componentDidMount(){
        if(localStorage.getItem("storeadmin")){ 
           let email = decodeBase64(localStorage.getItem('token')); 
           this.setState({profile:email}); 
           //this.setState({profile:'Store Admin ('+localStorage.getItem("storeadmin")+')'}); 
        }
        else{
            this.setState({profile:'Finance Admin'}); 
        }

    }

    logOut(){
        document.cookie = 'usertoken' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        localStorage.removeItem('token');
        localStorage.removeItem('storeadmin');
        this.props.history.push('/login')
    }

    render() {

        return (
            <div className="header">
                <div className="top-header">
                    <div className="logo_conatiner">
                        <img src="https://online.kfc.co.in/Content/OnlineOrderingImages/Shared/md/logo_kfc.svg" />
                    </div>
                    <div className="title-container">
                        <h3>KFC REFUND SYSTEM</h3>
                    </div>
                </div>
                <div className="nav-container">      
                    <Router>
                      <div>
                        <nav className="navbar navbar-expand-sm navbar-dark ">
                         
                          <ul className="navbar-nav">
                            <li>
                                <Link to="/vieworder" onClick={()=>this.props.history.push('vieworder')}>Orders</Link>
                            </li>
                            
                          </ul>

                          <ul className="nav navbar-nav ml-auto navbar-dark">
                            <li className="profile-header-list">
                                <span className="profile-header">Logged in as {this.state.profile}</span>
                            </li>
                          </ul>

                          <ul className="nav">
                            <li className="logout-conatiner">
                                <button className="btn btn-danger btn-sm" onClick={()=>this.logOut()}>Logout</button>
                            </li>
                          </ul>

                        </nav>

                        </div>
                    </Router>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = (state,ownProps) => ({
    user: state.user.user,
    error : state.user.error
});

export default withRouter(connect(mapStateToProps)(AdminHeaderComponent));


