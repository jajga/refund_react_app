import React from 'react';
import Reactdom from 'react-dom';
import 'bootstrap';
import { Provider } from "react-redux";
import configureStore, { history } from  "./store";
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import LoginComponent from "./components/loginComponent";
import ViewOrderComponent from "./components/vieworderComponent";
import RefundOrderComponent from "./components/refundorderComponent";



const store = configureStore();
Reactdom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <> { /* your usual react-router v4/v5 routing */ }
            <Router>
                <Switch>
                    <Route  exact path="/" component={LoginComponent} />
                    <Route  path="/login" component={LoginComponent}  />
                    <Route  exact path="/vieworder" component={ViewOrderComponent}  />
                    <Route  exact path="/refund" component={RefundOrderComponent}  />
                    <Route  exact path="/vieworder/:orderid" component={ViewOrderComponent}  />
                    <Route  exact path="/refund/:orderid" component={RefundOrderComponent}  />
                    <Route  path="/about" render={() => (<div>About Refund</div>)} />
                    <Route render={() => (<div>Sorry Page Not Found</div>)} />
                   
                </Switch>
            </Router>
            </>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)


