import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const sendFollowRequest = async (data) => {
    return await API.postMethod(ENDPOINT.followers.sendFollowRequest, true, data);
}

const unfollowUser = async (data) => {
    return await API.postMethod(ENDPOINT.followers.unfollowUser, true, data);
}

const followingList = async(page)=>{
    return await API.getMethod(`${ENDPOINT.followers.followings}&page=${page}`,true);
}

const followersList = async(page)=>{
    return await API.getMethod(`${ENDPOINT.followers.followers}&page=${page}`, true);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    sendFollowRequest,
    unfollowUser,
    followingList,
    followersList
}