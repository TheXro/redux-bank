import { useSelector } from "react-redux";
import { createCustomer } from "./customerSlice";


function Customer() {
  const customer = useSelector((state) => state.customer.fullName);
  console.log(customer); 
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
