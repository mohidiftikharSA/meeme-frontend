import API from 'APIs/base'
import {ENDPOINT} from 'config/constants'

const getTournamentBanner = async (id) => {
    return await API.getMethod(ENDPOINT.tournaments.tournamentBanner, true, false);
}

const enrollInTournament = async (data) => {
    return await API.postMethod(ENDPOINT.tournaments.enroll, true, data);
}

const createTournamentPost = async (data) => {
    return await API.postMethod(ENDPOINT.tournaments.tournamentBanner, true, data, true);
}

const getRules = async (id) => {
    return await API.getMethod(`${ENDPOINT.tournaments.getRules}${id}`, true);
}

const getTournamentJudge = async () => {
    return await API.getMethod(`${ENDPOINT.tournaments.tournamentJudge}`, true)
}

const getTournamentPosts = async () => {
    return await API.getMethod(`${ENDPOINT.tournaments.tournamentPosts}`, true)
}

const likeTournamentPost = async (data) => {
    return await API.postMethod(`${ENDPOINT.tournaments.likeTournamentPost}`, true, data)
}
const disLikeTournamentPost = async (data) => {
    return await API.postMethod(`${ENDPOINT.tournaments.disLikeTournamentPost}`, true, data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTournamentBanner,
    enrollInTournament,
    createTournamentPost,
    getRules,
    getTournamentJudge,
    getTournamentPosts,
    likeTournamentPost,
    disLikeTournamentPost,
}