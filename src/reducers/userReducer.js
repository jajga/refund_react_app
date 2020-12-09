import { FETCH_USER , LOGIN_ERR , FETCH_DASH} from "../actions/types";

const initialState = {
    user:{},
    dash:{},
    error:{}
}

export default function (state = initialState ,action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
                error:{}
            }
        case FETCH_DASH:
            return {
                ...state,
                dash: action.payload,
                error:{}
            }    
        case LOGIN_ERR:
            return {
                ...state,
                error: action.payload.response.data.errMsg,
                user:{}
            }    
        default:
            return state;
    }
}