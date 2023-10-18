//export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL = "https://v2.meeme.appscorridor.com/api/v1";
export const GOOGLE_CLIENT_ID = "233269390911-a70r33iv5l4jqjl1ccbar8f5k2q0pniq.apps.googleusercontent.com";


export const ENDPOINT = {
    login: `${API_URL}/auth/login`,
    signUp: `${API_URL}/users`,
    forgetPassword: `${API_URL}/users/forgot_password`,
    verificationOtp: `${API_URL}/users/verify_otp`,
    getRecentPosts: `${API_URL}/posts/recent_posts`,
    getTrendingPost: `${API_URL}/posts/trending_posts`,
    stories: `${API_URL}/stories`,
    socialLogin: `${API_URL}/social/social_login`,
    followingPosts: `${API_URL}/posts/following_posts`,
    comments: `${API_URL}/comments`,
};