import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  //not allowed to modified state and side effect hello
  //place as much as logic u can
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "account/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(purpose, amount) {
  return { type: "account/requestLoan", payload: { purpose, amount } };
}
function payLoan() {
  return { type: "account/payLoan" };
}


function createCustomer(fullName, nationalID) {
  return { type: "customer/create", payload: { fullName, nationalID, createdAt: new Date().toISOString() } };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer('Alice', '1234567890'));
console.log(store.getState());