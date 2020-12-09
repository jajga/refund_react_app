import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateUser , sendOTP } from '../actions/userActions';
import AdminHeaderComponent from '../components/adminHeaderComponent';
import cookie from "react-cookie";


class LoginComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            otp:'',
            otpsent : false,
            errmsg:'',
            loginErr: 0
        };

    }

    componentDidMount(){
        // if(localStorage.getItem("token")){
        //     if(localStorage.getItem("storeadmin")){
        //         this.props.history.push('/vieworder')
        //         return false;
        //     }
        //     this.props.history.push('/refund')

            
        // }

        if(this.getCookieValue('usertoken')){
            if(localStorage.getItem("storeadmin")){
                this.props.history.push('/vieworder')
                return false;
            }
            this.props.history.push('/refund')
        }



    }



    setUserCookie(name, value, days) {
        let date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toUTCString();
        } else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }




    componentWillReceiveProps(nextProps,nextState) {

        if(typeof nextProps.error != 'object'){
            this.setState({loginErr:1}); 
            return false;   
        }

        if (!nextProps.user.success){
            this.setState({ loginErr: 1 })  
            this.setState({ errmsg: nextProps.user.msg })  
            return false; 
        }

        if ((nextProps.user.success) && (nextProps.user.msg) && (!nextProps.user.token)) {
            this.setState({ otpsent: true })   
        }

        if ((nextProps.user.success) && (nextProps.user.msg) && (nextProps.user.token)) {
            this.setUserCookie('usertoken',nextProps.user.token,2)
            localStorage.setItem("token", nextProps.user.token)
            if(nextProps.user.msg.role === 'storeadmin'){
               localStorage.setItem("storeadmin", nextProps.user.msg.storeid);
               this.props.history.push('vieworder');
               return false;
            }
            if(nextProps.user.msg.role === 'financeadmin'){
               if(localStorage.getItem("referrer")){
                 this.props.history.push(localStorage.getItem("referrer"));
                 return false;
               } 
               this.props.history.push('/refund');
               return false;
            }
            
        }


    }

    // componentDidUpdate(nextProps){
    //     if(nextProps.user.error){
    //         this.setState({loginErr:1});    
    //     }
    //     if (nextProps.user.user !== 'undefined') {
    //         console.log('componentDidUpdate Admin dashboard');
    //     }
    // }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            emailid : this.state.username,
        };

        if(this.state.username !== '' && this.state.otp === ''){
            this.props.sendOTP(post);
            return false;
        }

        post.emailid = this.state.username;
        post.otp = this.state.otp;
        


        this.props.validateUser(post);
    }

    render() {

        return (
            <>
            <div className="header">
                <div className="top-header-login">
                    <div className="logo_conatiner">
                        <img src="https://online.kfc.co.in/Content/OnlineOrderingImages/Shared/md/logo_kfc.svg" />
                    </div>
                    <div className="title-container">
                        <h3>KFC REFUND SYSTEM</h3>
                    </div>
                </div>
            </div>
            <div className="container">
                    <form className="form-signin " onSubmit={(event)=>{this.onSubmit(event)}}>
                        { !this.state.loginErr ? '' : <span class="error text-danger ">{this.state.errmsg}</span> }

                        
                        <div className="form-label-group">
                            <label>Enter Email</label>
                        </div>    
                        <div className="form-label-group">
                            <input disabled={this.state.otpsent?'disabled':''} type="text"
                        name="username"
                        onChange={(event)=>{this.onChange(event)}}
                        value={this.state.todo} id="todoTitile" className="form-control"
                        required autoFocus />

                            
                        </div>
                        { this.state.otpsent?
                        <div className="otp-container ">
                            <div className="form-label-group">
                                <label>Please enter OTP sent on email </label>
                            </div>    
                            <div className="form-label-group">
                                <input  type="text"
                            name="otp"
                            onChange={(event)=>{this.onChange(event)}}
                            value={this.state.otp} id="todoTitile" className="form-control"
                              />

                                
                            </div>
                        </div> : ''
                        }
                        
                        <div className="input-group-append button-container" >
                            <button type="submit" className="btn btn-lg btn-danger btn-block text-uppercase">Login</button>
                        </div>    
                    </form>
            </div>
            </>
        );
    }

}


const mapStateToProps = (state,ownProps) => ({
    user: state.user.user,
    error : state.user.error
});

export default connect(mapStateToProps, { validateUser , sendOTP })(LoginComponent);