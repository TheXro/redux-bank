const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

//action-creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    //async code

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}from=USD&to=` +
        currency
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    return { type: "account/deposit", payload: converted };
    // return action;
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(purpose, amount) {
  return { type: "account/requestLoan", payload: { purpose, amount } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
