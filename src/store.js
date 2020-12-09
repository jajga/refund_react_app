import { createStore , applyMiddleware , compose } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

// Intial state of the App
const intialState = {};
const middleware = [thunk];

// Global Store for the App
export default function configureStore() {
    const store = createStore(
        createRootReducer(history),
        intialState,
        compose(
            applyMiddleware(...middleware,routerMiddleware(history)),
            //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )

    return store
}





