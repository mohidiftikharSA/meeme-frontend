import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const getRecentPosts = async () => {
    return await API.getMethod(ENDPOINT.getRecentPosts, true)  
}
const getTrendingPosts = async () => {
    return await API.getMethod(ENDPOINT.getTrendingPost, true)  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRecentPosts,
    getTrendingPosts,
}