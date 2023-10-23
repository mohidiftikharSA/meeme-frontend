import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const login = async (email, password) => {
    return await API.postMethod(ENDPOINT.login, false, {
        email,
        password,
    })
}
const socialLogin = async (provider, token) => {
    return await API.postMethod(ENDPOINT.socialLogin, false, {
        provider,
        token,
    })
}
const signup = async (data) => {
    return await API.postMethod(ENDPOINT.signUp, false,data)
}
const forgetPassword = async (email) => {
    return await API.postMethod(ENDPOINT.forgetPassword, false, {
        email
    })
}

const verificationOtp = async (email,otp) => {
    return await API.postMethod(ENDPOINT.verificationOtp, false, {
        email,
        otp,
    })
}
const resetPassword = async (email,password, password_confirmation) => {
    return await API.postMethod(ENDPOINT.resetPassword, false, {
        email,
        password,
        password_confirmation,
    })
}
const authUser = async (email,password, password_confirmation) => {
    return await API.postMethod(ENDPOINT.authUser, true)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    signup,
    forgetPassword,
    verificationOtp,
    socialLogin,
    resetPassword,
    authUser
}