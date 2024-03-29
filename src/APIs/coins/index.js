import API from "APIs/base";
import { ENDPOINT } from "config/constants";

const fetchAllCard = async (id) => {
  return await API.getMethod(ENDPOINT.coins.fetchAllCards, true, false);
};

const customerCharge = async (data) => {
  return await API.postMethod(ENDPOINT.coins.chargeCustomer, true, data);
};

const transactions = async () => {
  return await API.getMethod(ENDPOINT.transactionHistory);
};

const createCheckoutSession = async(data)=>{
  return await API.postMethod(ENDPOINT.coins.create_checkout_session,true,data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchAllCard,
  customerCharge,
  transactions,
  createCheckoutSession
};
