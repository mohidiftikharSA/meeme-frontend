import API from 'APIs/base'
import {ENDPOINT} from 'config/constants'

const deleteUserAccount = async (id) => {
    console.log("Deleting User ID: ", id)
    return await API.deleteMethod(`${ENDPOINT.profile.settings.delete_user_account}/${id}`, true);
}

const current_user_tournament_posts = async()=>{
    return await API.getMethod(ENDPOINT.post.current_user_tournament_posts,true);
}

export default {
    deleteUserAccount,
    current_user_tournament_posts
}