import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders , cancelOrder , getOrder , approveOrder , rejectOrder , dwnldReports} from '../actions/orderActions';
import ViewRefundTemplate from '../templates/viewRefund';
import { withRouter } from 'react-router-dom';
import { decodeBase64 } from '../service/global';
import { API_HOST} from '../actions/types';



class RefundOrderComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end:'',
            status:'confirmed',
            orderErr: 0,
            startDate: new Date(),
            activeCancelKey : ""
        };

    }

    componentDidMount(){
        // if(!localStorage.getItem("token")){
        //     if((this.props.match.url !== '/') || (this.props.match.url !== '/login')){
        //        localStorage.setItem("referrer", this.props.match.url); 
        //     }
        //     this.props.history.push('/login')

        // }


        if(!this.getCookieValue('usertoken')){
            if((this.props.match.url !== '/') || (this.props.match.url !== '/login')){
               localStorage.setItem("referrer", this.props.match.url); 
            }
            this.props.history.push('/login')
        }

        const post = {
            orderid : this.props.match.params.orderid
        };

        if(this.props.match.url.split('/').length < 3){
            let date = new Date();
            let sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 00:00:00';
            let edate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 23:59:59';

            this.setState({ start : sdate});
            this.setState({ end : edate });

            let storeid = 'all';
           
            const post = {
                startdate : sdate,
                enddate : edate,
                storeid: storeid,
                requestedby:"financeadmin",
                orderstatus : this.state.status,
                default:1
            };


            this.props.getOrders(post);
            return false;
        }

        this.props.getOrder(post);
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(typeof nextProps.error != 'object'){
            this.setState({orderErr:1}); 
            return true;   
        }

        if(nextProps.order != this.props.order){
            this.props.orders[this.state.activeCancelKey].status = nextProps.order.status
            this.props.orders[this.state.activeCancelKey].stages = nextProps.order.stages
            this.props.orders[this.state.activeCancelKey].action = nextProps.order.action
            return true;
        }
        
        return true;
        
    }

     getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }


    onStartChange(date) {
        console.log(date);
        this.setState({ start : date });
        //this.setState({ [e.target.name]: e.target.value });
    }

    onEndChange(date) {
        console.log(date);
        this.setState({ end : date });
        //this.setState({ [e.target.name]: e.target.value });
    }

    onDwnldReport(e){
        e.preventDefault();
        e.stopPropagation();

        const post = {
            startdate : this.state.start,
            enddate : this.state.end,
            storeid:"all",
            requestedby:"financeadmin",
            orderstatus : this.state.status,
            default:1
        };

        let dwnldLink = API_HOST+"/reports.php?storeid=all&startdate="+this.state.start+"&enddate="+this.state.start+"&orderstatus="+this.state.status+"&requestedby=financeadmin&default=1";
        window.open(dwnldLink, '_blank');

        //this.props.dwnldReports(post);
    }

    getTimeFormat(timestamp){
        var d = new Date(timestamp);

        
        return  d.getFullYear() + "-" +
          ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
          ("00" + d.getDate()).slice(-2) + " " +
          ("00" + d.getHours()).slice(-2) + ":" +
          ("00" + d.getMinutes()).slice(-2) + ":" +
          ("00" + d.getSeconds()).slice(-2)
        
    }

    onStatusChange(e){
        this.setState({ status : e.target.value });
    }


    onDayChange(e){
        //console.log('Days',e.target.value);
        let currDate = new Date();
        let endDate = new Date(
            currDate.getFullYear(),
            currDate.getMonth(),
            currDate.getDate() - parseInt(e.target.value),
            currDate.getHours(),
            currDate.getMinutes(),
            currDate.getSeconds(),
            currDate.getMilliseconds()
        );

        if(e.target.value === "0"){
            endDate = new Date(
                currDate.getFullYear(),
                currDate.getMonth(),
                currDate.getDate(),
                23,
                59,
                59,
                0
            ); 
        }

        console.log('curr time',this.getTimeFormat(currDate.getTime()))

        this.setState({ start : this.getTimeFormat(endDate.getTime())});
        this.setState({ end : this.getTimeFormat(currDate.getTime()) });

    }

    onSubmit(e) {
        e.preventDefault();
        const post = {
            startdate : this.state.start,
            enddate : this.state.end,
            storeid:"all",
            requestedby:"",
            orderstatus : this.state.status
        };


        this.props.getOrders(post);
    }

    onApproveOrder(orderid , key){
        let activeCancelKey = key;
        let statusupdatedby = "financeadmin";
        let updatedby = decodeBase64(localStorage.getItem('token'));
        const post = {
            orderid : orderid,
            orderstatus : "approved",
            statusupdatedby: statusupdatedby ,
            updatedby:updatedby

        };
        this.setState({ activeCancelKey : activeCancelKey });
        this.props.approveOrder(post);
    }

    onRejectOrder(orderid , key){
        let activeCancelKey = key;
        let statusupdatedby = "financeadmin";
        let updatedby = decodeBase64(localStorage.getItem('token'));
        const post = {
            orderid : orderid,
            orderstatus : "rejected",
            statusupdatedby: statusupdatedby ,
            updatedby:updatedby

        };
        this.setState({ activeCancelKey : activeCancelKey });
        this.props.rejectOrder(post);

    }

    cancelOrder(e){
        console.log('cancel',e);
        const post = {
            orderId : e,
            email : 'narendra.kumar@ayursinfotech.com'
        };
        this.props.cancelOrder(post);
    }

    render() {

        return ViewRefundTemplate.call(this);
    }

}


const mapStateToProps = (state,ownProps) => ({
    orders: state.order.orders,
    order: state.order.order,
    error : state.order.error
});

export default withRouter(connect(mapStateToProps, { getOrders , cancelOrder ,getOrder , approveOrder , rejectOrder , dwnldReports })(RefundOrderComponent));