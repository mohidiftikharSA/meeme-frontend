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
    return await API.postMethod(ENDPOINT.users.signUp, false, data)
}
const forgetPassword = async (email) => {
    return await API.postMethod(ENDPOINT.users.forgetPassword, false, {
        email
    })
}

const verificationOtp = async (email, otp) => {
    return await API.postMethod(ENDPOINT.users.verificationOtp, false, {
        email,
        otp,
    })
}
const resetPassword = async (email, password, password_confirmation) => {
    return await API.postMethod(ENDPOINT.users.resetPassword, false, {
        email,
        password,
        password_confirmation,
    })
}
const getCurrentUserProfile = async () => {
    return await API.getMethod(ENDPOINT.users.currentUserProfile, true)
}

const updateUser = async (data) => {
    return await API.putMethod(ENDPOINT.users.updateUser, true, data, true) 

}

const otherUserProfile = async(id)=>{
    return await API.getMethod(`${ENDPOINT.users.otherUserProfile}?id=${id}`,true);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    signup,
    forgetPassword,
    verificationOtp,
    socialLogin,
    resetPassword,
    getCurrentUserProfile,
    updateUser,
    otherUserProfile
}