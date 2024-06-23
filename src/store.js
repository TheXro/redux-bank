import {configureStore} from "./store";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

configureStore({})

    export default store;