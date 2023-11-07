import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const sendFollowRequest = async (data) => {
    return await API.postMethod(ENDPOINT.followers.sendFollowRequest, true, data);
}

const unfollowUser = async (data) => {
    return await API.postMethod(ENDPOINT.followers.unfollowUser, true, data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    sendFollowRequest,
    unfollowUser
}