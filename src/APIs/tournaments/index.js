import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getTournamentBanner = async (id) => {
    return await API.getMethod(ENDPOINT.tournaments.tournamentBanner, true , false);
}

const enrollInTournament = async (data) => {
    return await API.postMethod(ENDPOINT.tournaments.enroll, true, data);
}

const createTournamentPost = async (data) => {
    return await API.postMethod(ENDPOINT.tournaments.tournamentBanner, true, data, true);
}

const getRules = async(id)=>{
    return await API.getMethod(`${ENDPOINT.tournaments.getRules}${id}`,true);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTournamentBanner,
    enrollInTournament,
    createTournamentPost,
    getRules
}