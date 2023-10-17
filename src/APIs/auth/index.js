import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const login = async (email, password) => {
    return await API.postMethod(ENDPOINT.login, false, {
        email,
        password,
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
const resetPassword = async (email,otp) => {
    return await API.postMethod(ENDPOINT.verificationOtp, false, {
        email,
        otp,
    })  
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    signup,
    forgetPassword,
    verificationOtp
}