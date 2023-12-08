//export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL = `${process.env.REACT_APP_BASE_URL ?? 'http://stg.memeeapi.appscorridor.com'}/api/v1`//"https://v2.meeme.appscorridor.com/api/v1";
export const GOOGLE_CLIENT_ID = "233269390911-a70r33iv5l4jqjl1ccbar8f5k2q0pniq.apps.googleusercontent.com";
//export const GOOGLE_CLIENT_ID = "457976303469-09mmvdm5qbqv6hvpvct4ovj22eog663l.apps.googleusercontent.com";

export const ENDPOINT = {
    login: `${API_URL}/auth/login`,
    users: {
        signUp: `${API_URL}/users`,
        forgetPassword: `${API_URL}/users/forgot_password`,
        resetPassword: `${API_URL}/users/reset_user_password`,
        currentUserProfile: `${API_URL}/users/open_current_user`,
        verificationOtp: `${API_URL}/users/verify_otp`,
        updateUser: `${API_URL}/users/update_user`,
        otherUserProfile: `${API_URL}/users/open_some_other_user`
    },

    messages: {
        allSupportChats: `${API_URL}/messages/all_support_chats`,
        createTicket: `${API_URL}/messages/support_ticket`,
        getTicketMessages: `${API_URL}/messages/individual_admin_messages`,
        replySupportChat: `${API_URL}/messages/support_chat`,
        getInboxList: `${API_URL}/messages`,
        getChatMessages: `${API_URL}/messages/individual_messages?receiver_id=`,
        createCoversation: `${API_URL}/conversations`
    },

    followers: {
        sendFollowRequest: `${API_URL}/followers/send_a_follow_request_to_user`,
        unfollowUser: `${API_URL}/followers/un_follow_user`,
        followings: `${API_URL}/followers?page=1&key=followings`,
        followers: `${API_URL}/followers?page=1&key=followers`
    },

    post: {
        getTags: `${API_URL}/posts/tags`
    },

    comment: {
        create_child_comment: `${API_URL}/comments/create_child_comment`
    },
    settings: {
        create_user_billing_card: `${API_URL}/users/payments/add_a_card`
    },
    comments: `${API_URL}/comments`,
    getRecentPosts: `${API_URL}/posts/recent_posts`,
    getTrendingPost: `${API_URL}/posts/trending_posts`,
    stories: `${API_URL}/stories`,
    coinprices:`${API_URL}/coin_prices`,
    socialLogin: `${API_URL}/social/social_login`,
    followingPosts: `${API_URL}/posts/following_posts`,
    likePost: `${API_URL}/likes`,

};