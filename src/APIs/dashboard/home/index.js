import API from 'APIs/base'
import {ENDPOINT} from 'config/constants'


const getRecentPosts = async () => {
    return await API.getMethod(ENDPOINT.getRecentPosts, true)
}
const getTrendingPosts = async () => {
    return await API.getMethod(ENDPOINT.getTrendingPost, true)
}

const getStories = async () => {
    return await API.getMethod(ENDPOINT.stories, true)
}

const getFollowingPosts = async () => {
    return await API.getMethod(ENDPOINT.followingPosts, true)
}

const getCommentsByPost = async (id) => {
    const url = ENDPOINT.comments + '?post_id=' + id;
    return await API.getMethod(url, true)
}

const PostComment = async (data) => {
    return await API.postMethod(ENDPOINT.comments, true, data)
}

const createChildComment = async (data) => {
    return await API.postMethod(ENDPOINT.comment.create_child_comment, true, data, true);
}

const likePost = async (data) => {
    return await API.postMethod(ENDPOINT.likePost, true, data)
}

const getTags = async () => {
    return await API.getMethod(ENDPOINT.post.getTags, true);
}

const postStory = async (data) => {
    return await API.postMethod(ENDPOINT.postStory, true, data)
}
const searchUser = async (search_param) => {
    return await API.getMethod(`${ENDPOINT.profile.searchUser}${search_param}`, true);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRecentPosts,
    getTrendingPosts,
    getStories,
    getFollowingPosts,
    getCommentsByPost,
    PostComment,
    likePost,
    getTags,
    createChildComment,
    postStory,
    searchUser
}