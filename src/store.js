import {configureStore} from "./store";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

configureStore({
    reducer:{
        account: accountReducer,
        customer: customerReducer,
    }
})

    export default store;