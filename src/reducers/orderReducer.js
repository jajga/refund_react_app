import { FETCH_ORDER , FETCH_ORDERS } from "../actions/types";

const initialState = {
    orders:[],
    order:{},
    error:{}
}

function sortObjectsAsArray(data) {
    if(Object.keys(data).length > 1 ){
       const objectsArr = []
       const obj = {};
        for (const property in data) { 
          data[property]["order_id"] = property;
          objectsArr[property] = data[property]
          //objectsArr[property]["order_id"] = data[property][property]
          //objectsArr.push(obj)
        }

        
        const sortedArray = objectsArr.sort((a,b) => {
            var c = new Date(a.lastupdated);
            var d = new Date(b.lastupdated);
            return d-c;
        })

        

        return sortedArray;


    }
    else{
       const objectsArr = []; 
       const obj = {};
        for (const property in data) { 
          data[property]["order_id"] = property;
          objectsArr[property] = data[property]
          //objectsArr[property]["order_id"] = data[property][property]
          //objectsArr.push(obj)
        } 

       return objectsArr
    }

    
    
}

function splitObject(o) {
    return Object.keys(o).map(function(e) {
        return Object.defineProperty({}, e, { 
            value: o[e], 
            enumerable: true 
        });
    });
}

export default function (state = initialState ,action) {
    //console.log(action.type);
    switch (action.type) {
        case FETCH_ORDERS:
            //console.log("Reducers" ,action.payload.order);
            if(action.payload.orders){
                return {
                    ...state,
                    orders: sortObjectsAsArray(action.payload.orders),
                    error:{}
                }  
            }
            return {
                ...state,
                orders:[],
                error:{
                    search:1,
                    msg:action.payload.msg
                }
            }
        case FETCH_ORDER:
            //console.log("Reducers" ,action.payload.order);
            return {
                ...state,
                order: action.payload.order,
                error:{}
            }    
            default:
                return state;
    }
}