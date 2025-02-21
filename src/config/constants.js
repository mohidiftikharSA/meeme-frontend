//export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL = `${
  process.env.REACT_APP_BASE_URL ?? "http://stg.memeeapi.appscorridor.com"
}/api/v1`; //"https://v2.meeme.appscorridor.com/api/v1";
export const GOOGLE_CLIENT_ID =
  "260786829240-jir9b8uqo51meq2jbc81crjlgvof0830.apps.googleusercontent.com";

export const ENDPOINT = {
  login: `${API_URL}/auth/login`,
  users: {
    signUp: `${API_URL}/users`,
    forgetPassword: `${API_URL}/users/forgot_password`,
    resetPassword: `${API_URL}/users/reset_user_password`,
    currentUserProfile: `${API_URL}/users/open_current_user`,
    verificationOtp: `${API_URL}/users/verify_otp`,
    updateUser: `${API_URL}/users/update_user`,
    otherUserProfile: `${API_URL}/users/open_some_other_user`,
    current_user_locked_badges: `${API_URL}/badges/current_user_locked_badges`,
    active_status_change: `${API_URL}/users/active_status_change`,
  },

  messages: {
    allSupportChats: `${API_URL}/messages/all_support_chats`,
    createTicket: `${API_URL}/messages/support_ticket`,
    getTicketMessages: `${API_URL}/messages/individual_admin_messages`,
    replySupportChat: `${API_URL}/messages/support_chat`,
    getInboxList: `${API_URL}/messages`,
    getChatMessages: `${API_URL}/messages/individual_messages?receiver_id=`,
    createCoversation: `${API_URL}/conversations`,
  },

  followers: {
    sendFollowRequest: `${API_URL}/followers/send_a_follow_request_to_user`,
    unfollowUser: `${API_URL}/followers/un_follow_user`,
    followings: `${API_URL}/followers?page=1&key=followings`,
    followers: `${API_URL}/followers?page=1&key=followers`,
  },

  post: {
    getMyPosts: `${API_URL}/posts`,
    getTags: `${API_URL}/posts/tags`,
    createPost: `${API_URL}/posts`,
    user_search_tag: `${API_URL}/posts/user_search_tags`,
    delete_posts: `${API_URL}/posts/destroy_multiple`,
    serach_by_username_tag: `${API_URL}/posts/post_search_user_and_tag`,
    current_user_tournament_posts: `${API_URL}/posts/current_user_tournament_posts`,
    share_post: `${API_URL}/posts/share_post`,
    update_post: `${API_URL}/posts/update_posts`,
  },

  comment: {
    create_child_comment: `${API_URL}/comments/create_child_comment`,
  },
  settings: {
    create_user_billing_card: `${API_URL}/users/payments/add_a_card`,
    toggle_user_notifications: `${API_URL}/users/notification_settings`,
  },
  profile: {
    settings: {
      delete_user_account: `${API_URL}/users`,
      create_user_billing_card: `${API_URL}/users/payments/add_a_card`,
      toggle_user_notifications: `${API_URL}/users/notification_settings`,
      fetch_all_card: `${API_URL}/users/payments/fetch_all_card`,
    },
    profile: {
      settings: {
        delete_user_account: `${API_URL}/users`,
      },
      searchUser: `${API_URL}/users/search?username=`,
    },
  },

  tournaments: {
    tournamentBanner: `${API_URL}/tournament_banners`,
    enroll: `${API_URL}/tournament_banners/enroll_in_tournament`,
    getRules: `${API_URL}/tournament_banners/show_tournament_rules?id=`,
    tournamentJudge: `${API_URL}/tournament_banners/judge`,
    tournamentPosts: `${API_URL}/tournament_banners/tournament_posts`,
    likeTournamentPost: `${API_URL}/tournament_banners/like_unlike_a_tournament_post`,
    disLikeTournamentPost: `${API_URL}/tournament_banners/dislike_a_tournament_post`,
  },

  audits: {
    getByType: `${API_URL}/audits/type?type=`,
  },

  block: {
    create: `${API_URL}/block_users`,
  },
  notifications: {
    user_notifications: `${API_URL}/notifications/user_notifications`,
  },
  coins: {
    chargeCustomer: `${API_URL}/users/payments/charge_a_customer`,
    fetchAllCards: `${API_URL}/users/payments/fetch_all_card`,
    create_checkout_session: `${API_URL}/users/payments/create_checkout_session`

  },

  amazon_cards: {
    get_all_cards: `${API_URL}/amazon_cards`,
    purchase_card: `${API_URL}/amazon_cards/purchase_card`,
    themes: `${API_URL}/themes`
  },
  stores:{
    buy_item: `${API_URL}/stores`
  },
  transactionHistory: `${API_URL}/users/payments/show_transactions_history`,
  comments: `${API_URL}/comments`,
  getRecentPosts: `${API_URL}/posts/recent_posts`,
  getTrendingPost: `${API_URL}/posts/trending_posts`,
  stories: `${API_URL}/stories`,
  postStory: `${API_URL}/stories`,
  coinprices: `${API_URL}/coin_prices`,
  socialLogin: `${API_URL}/social/social_login`,
  followingPosts: `${API_URL}/posts/following_posts`,
  likePost: `${API_URL}/likes`,
};
