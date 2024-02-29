import API from "APIs/base";
import { ENDPOINT } from "config/constants";

const addUserBillingCard = async (data) => {
  return await API.postMethod(
    ENDPOINT.settings.create_user_billing_card,
    true,
    data,
    true
  );
};
const togglePushNotifications = async (data) => {
  return await API.postMethod(
    ENDPOINT.settings.toggle_user_notifications,
    true,
    data,
    true
  );
};

const getAudits = async (type) => {
  return await API.getMethod(`${ENDPOINT.audits.getByType}${type}`, true);
};

const getCard = async () => {
  return await API.getMethod(ENDPOINT.settings.fetch_all_card, true, false);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addUserBillingCard,
  togglePushNotifications,
  getAudits,
  getCard
};
