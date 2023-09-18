import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'


const login = async (email, password) => {
    return await API.postMethod(ENDPOINT.login, false, {
        email,
        password,
    })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
}