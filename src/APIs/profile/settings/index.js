import API from 'APIs/base'
import {ENDPOINT} from 'config/constants'

const deleteUserAccount = async (id) => {
    console.log("Deleting User ID: ", id)
    return await API.deleteMethod(`${ENDPOINT.profile.settings.delete_user_account}/${id}`, true);
}

export default {
    deleteUserAccount
}