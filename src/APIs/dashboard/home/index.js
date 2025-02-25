import API from "APIs/base";
import { ENDPOINT } from "config/constants";

const getRecentPosts = async (page=1,per_page =25) => {
    return await API.getMethod(`${ENDPOINT.getRecentPosts}?page=${page}&per_page=${per_page}`, true,false)
}
const getTrendingPosts = async (page=1,per_page =10) => {
  return await API.getMethod(`${ENDPOINT.getTrendingPost}?page=${page}&per_page=${per_page}`, true,false);
};

const getStories = async () => {
  return await API.getMethod(ENDPOINT.stories, true,false);
};

const getFollowingPosts = async (page=1,per_page =10) => {
  return await API.getMethod(`${ENDPOINT.followingPosts}?page=${page}&per_page=${per_page}`, true);
};

const getCommentsByPost = async (id) => {
  const url = ENDPOINT.comments + "?post_id=" + id;
  return await API.getMethod(url, true);
};

const PostComment = async (data) => {
  return await API.postMethod(ENDPOINT.comments, true, data);
};

const createChildComment = async (data) => {
  return await API.postMethod(
    ENDPOINT.comment.create_child_comment,
    true,
    data,
    true
  );
};

const likePost = async (data) => {
  return await API.postMethod(ENDPOINT.likePost, true, data);
};

const sharePost = async (data) => {
  return await API.postMethod(ENDPOINT.post.share_post, true, data);
};

const getTags = async () => {
  return await API.getMethod(ENDPOINT.post.getTags, true);
};

const postStory = async (data) => {
  return await API.postMethod(ENDPOINT.postStory, true, data);
};

const searchUser = async (search_param) => {
  return await API.getMethod(
    `${ENDPOINT.profile.profile.searchUser}${search_param}`,
    true
  );
};
const flagOrReportPost = async (data) => {
  return await API.postMethod(ENDPOINT.block.create, true, data);
};
const getUserNotificationsList = async () => {
  return await API.getMethod(ENDPOINT.notifications.user_notifications, true);
};

const user_search_tag = async (data) => {
  return await API.postMethod(ENDPOINT.post.user_search_tag, true, data);
};

const deletePosts = async (data) => {
  return API.deleteMethod(ENDPOINT.post.delete_posts, true, data);
};

const searchPostByUsernameAndTag = async(data)=>{
   return await API.postMethod(ENDPOINT.post.serach_by_username_tag,true,data, false , false);
}
const otherPosts = async(data)=>{
  return await API.postMethod(ENDPOINT.post.other_posts,true,data,false,false);
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
  searchUser,
  flagOrReportPost,
  getUserNotificationsList,
  user_search_tag,
  deletePosts,
  searchPostByUsernameAndTag,
  sharePost,
  otherPosts
};
