import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders , cancelOrder , rejectReturn , getOrder } from '../actions/orderActions';
import ViewOrderTemplate from '../templates/viewOrder';
import { withRouter } from 'react-router-dom';
import { decodeBase64 } from '../service/global';
import { API_HOST} from '../actions/types';



class ViewOrderComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end:'',
            status:'confirmed',
            orderErr: 0,
            searchErr:{},
            startDate: new Date(),
            activeCancelKey : "",
            modalShow:false,
            modelAttrs : {
                modelHeader : '',
                modelType : '',
                orderNo:'',
                textregion:false,
                reason:'',
                description:'',
                btndisabled:true,
                orderid:'',
                orderObj:{}
            }
        };

    }

    componentDidMount(){
        // if(!localStorage.getItem("token")){
        //     this.props.history.push('login')
        // }

        if(!this.getCookieValue('usertoken')){
            if((this.props.match.url !== '/') || (this.props.match.url !== '/login')){
               localStorage.setItem("referrer", this.props.match.url); 
            }
            this.props.history.push('/login')
        }

        let email = decodeBase64(localStorage.getItem('token'));

        const post = {
            orderid : this.props.match.params.orderid,
            requestedby:"storeadmin",
            email:email
        };

        if(this.props.match.url.split('/').length < 3){
            let date = new Date();
            let sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 00:00:00';
            let edate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 23:59:59';

            this.setState({ start : sdate});
            this.setState({ end : edate });

            let storeid = 'all';
            if(localStorage.getItem("storeadmin")){
                storeid = localStorage.getItem("storeadmin");
            }



            const post = {
                startdate : sdate,
                enddate : edate,
                storeid: storeid,
                requestedby:"storeadmin",
                email:email,
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
        // if(nextProps.orders){
        //     return nextProps.orders != this.props.orders;
        // }
        
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

    onReasonChange(e){
        let reasonVal = e.target.value 
        this.setState(state => {
          state.modelAttrs.reason = reasonVal           
          return state
        })

        if(e.target.value === 'other'){
            this.setState(state => {
              state.modelAttrs.textregion = true 
              state.modelAttrs.btndisabled = true           
              return state
            })
        }
        else{
            this.setState(state => {
              state.modelAttrs.textregion = false
              state.modelAttrs.description = '',
              state.modelAttrs.btndisabled = false            
              return state
            })
        }
    }

    onReasonDescChange(e){
        let descriptionText = e.target.value;
        this.setState(state => {
          state.modelAttrs.description =  descriptionText
          state.modelAttrs.btndisabled = false
          if(descriptionText === ""){
            state.modelAttrs.btndisabled = true 
          }            
          return state
        })
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

    rejectOrder(orderid,mobile,orderno,custname,orderdate,paycahnnel,activeCancelKey){

    }

    onModalShow(orderid,orderno,key){
        //this.setState({ modelAttrs.modelHeader : 'Reject Order Return'});
        this.setState(state => {
          state.modelAttrs.modelHeader = 'Decline Return for order no. '+orderno
          state.modelAttrs.modelType = 'reject_return'
          state.modelAttrs.orderNo = orderno,
          state.modelAttrs.orderid = orderid
          return state
        })
        this.setState({ activeCancelKey : key });
        this.setState({ modalShow : true});

    }

    onAcceptModalShow(orderid,orderno,key,orderObj){
        //this.setState({ modelAttrs.modelHeader : 'Reject Order Return'});
        this.setState(state => {
          state.modelAttrs.modelHeader = 'Return for order no. '+orderno
          state.modelAttrs.modelType = 'return_approve'
          state.modelAttrs.orderNo = orderno
          state.modelAttrs.orderid = orderid 
          state.modelAttrs.orderObj = {...orderObj}
          return state
        })
        this.setState({ activeCancelKey : key });
        this.setState({ modalShow : true});

    }

    onModalClose(){
        this.setState({ modalShow : false});
    }

    onModalSave(){
        console.log('on modal save and close');
        let updatedby = decodeBase64(localStorage.getItem('token'));
        const post = {
            orderid:this.state.modelAttrs.orderid,
            orderstatus : "cancelled",
            statusupdatedby:"storeadmin",
            updatedby:updatedby,
            cancelledreason: this.state.modelAttrs.reason,
            cancelledDetail:this.state.modelAttrs.description
        }

        this.props.rejectReturn(post);
        this.setState({ modalShow : false});
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
            let date = new Date();
            let sdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 00:00:00';
            let edate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' 23:59:59';

            this.setState({ start : sdate});
            this.setState({ end : edate });

            return false;
        }

        console.log('curr time',this.getTimeFormat(currDate.getTime()))

        this.setState({ start : this.getTimeFormat(endDate.getTime())});
        this.setState({ end : this.getTimeFormat(currDate.getTime()) });

    }

    onSubmit(e) {
        e.preventDefault();
        let storeid = 'all';
        if(localStorage.getItem("storeadmin")){
            storeid = localStorage.getItem("storeadmin");
        }

        let email = decodeBase64(localStorage.getItem('token'));
        const post = {
            startdate : this.state.start,
            enddate : this.state.end,
            storeid: storeid,
            requestedby:"storeadmin",
            email:email,
            orderstatus : this.state.status
        };


        this.props.getOrders(post);
    }

    closeModal(){
      this.setState({ open: false })  
    }


    onModalCancelOrder(){
        let updatedby = decodeBase64(localStorage.getItem('token'));
        const post = {
            orderid : this.state.modelAttrs.orderid,
            orderstatus : "refundinitited",
            statusupdatedby: "storeadmin",
            orderNo:this.state.modelAttrs.orderNo,
            mobile:this.state.modelAttrs.orderObj.mobile,
            custname:this.state.modelAttrs.orderObj.customerName,
            orderdate:this.state.modelAttrs.orderObj.orderDate,
            paycahnnel:this.state.modelAttrs.orderObj.paymentChannel,
            cancelledreason: this.state.modelAttrs.reason,
            cancelledDetail:this.state.modelAttrs.description,
            updatedby:updatedby

        };

        //this.setState({ activeCancelKey : activeCancelKey });
        console.log('Post values',post)
        this.props.cancelOrder(post);
        this.setState({ modalShow : false});
    }

    cancelOrder(orderid,mobile,orderno,custname,orderdate,paycahnnel,activeCancelKey){
        let updatedby = decodeBase64(localStorage.getItem('token'));
        const post = {
            orderid : orderid,
            orderstatus : "refundinitited",
            statusupdatedby: "storeadmin",
            orderNo:orderno,
            mobile:mobile,
            custname:custname,
            orderdate:orderdate,
            paycahnnel:paycahnnel,
            updatedby:updatedby

        };

        this.setState({ activeCancelKey : activeCancelKey });
        //this.props.cancelOrder(post);
    }

    render() {

        return ViewOrderTemplate.call(this);
    }

}


const mapStateToProps = (state,ownProps) => ({
    orders: state.order.orders,
    order: state.order.order,
    error : state.order.error
});

export default withRouter(connect(mapStateToProps, { getOrders , cancelOrder , rejectReturn , getOrder })(ViewOrderComponent));