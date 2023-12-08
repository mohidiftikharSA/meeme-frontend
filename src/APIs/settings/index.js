import API from 'APIs/base'
import {ENDPOINT} from 'config/constants'

const addUserBillingCard = async (data) => {
    return await API.postMethod(ENDPOINT.settings.create_user_billing_card, true, data, true);
}
const togglePushNotifications = async (data) => {
    return await API.postMethod(ENDPOINT.settings.toggle_user_notifications, true, data, true);
}

export default {
    addUserBillingCard,
    togglePushNotifications
}