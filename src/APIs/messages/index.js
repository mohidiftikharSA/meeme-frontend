import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getAllSupport = async () => {
    return await API.getMethod(ENDPOINT.messages.allSupportChats, true, false);
}

const createTicket = async (data) => {
    return await API.postMethod(ENDPOINT.messages.createTicket, true, data, true, false);
}

const getTicketMessages = async (data) => {
    return await API.postMethod(ENDPOINT.messages.getTicketMessages, true, data)
}

const replySupportChat = async (data) => {
    return await API.postMethod(ENDPOINT.messages.replySupportChat, true, data, true);
}

const getInboxList = async () => {
    return await API.getMethod(ENDPOINT.messages.getInboxList, true, false);
}

const getChatMessages = async (id) => {
    return await API.getMethod(`${ENDPOINT.messages.getChatMessages}${id}`, true);
}

const sendMessage = async (data) => {
    return API.postMethod(ENDPOINT.messages.getInboxList, true, data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllSupport,
    createTicket,
    getTicketMessages,
    replySupportChat,
    getInboxList,
    getChatMessages,
    sendMessage
}