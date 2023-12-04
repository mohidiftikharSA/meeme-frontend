import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'
const addUserBillingCard = async (data) => {
    return await API.postMethod(ENDPOINT.settings.create_user_billing_card, true, data, true);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addUserBillingCard
}