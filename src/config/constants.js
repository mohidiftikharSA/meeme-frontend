//export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL = "https://v2.meeme.appscorridor.com/api/v1";


export const ENDPOINT = {
    login: `${API_URL}/auth/login`,
    signUp: `${API_URL}/users`,
    forgetPassword: `${API_URL}/users/forgot_password`,
    verificationOtp: `${API_URL}/users/verify_otp`,
};