import API from "APIs/base";
import { ENDPOINT } from "config/constants";

const getAlAmazonCard = async () => {
  return await API.getMethod(ENDPOINT.amazon_cards.get_all_cards, true, false);
};

const purchaseAmazonCard = async (data) => {
  return await API.postMethod(ENDPOINT.amazon_cards.purchase_card, true, data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAlAmazonCard,
  purchaseAmazonCard
};
