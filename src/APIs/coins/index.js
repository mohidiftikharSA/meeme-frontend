import API from "APIs/base";
import { ENDPOINT } from "config/constants";

const fetchAllCard = async (id) => {
  return await API.getMethod(ENDPOINT.coins.fetchAllCards);
};

const customerCharge = async (data) => {
  return await API.postMethod(ENDPOINT.coins.chargeCustomer, true, data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchAllCard,
  customerCharge,
};
