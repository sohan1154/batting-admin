import axios from 'axios';
import * as GlobalProvider from '../globals/globals';

//axios.defaults.baseURL = 'http://localhost:3001';
 axios.defaults.baseURL = 'http://172.104.41.239:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function updateHeaders() {
    let token = GlobalProvider.getToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
}

function readError(error) {
    // console.log('error:::', error)

    let message;
    let errorMsg = error;

    if (typeof errorMsg === 'undefined') {
        message = "Something went wrong, Please try again.";
    }
    else if (typeof errorMsg === 'object') {

        if (typeof errorMsg.message !== 'undefined') {
            message = errorMsg.message;
        }
        else if (typeof errorMsg.error !== 'undefined') {
            message = errorMsg.error;
        }
        else {
            message = "Something went wrong, please try again.";
        }
    }
    else {
        message = errorMsg;
    }

    return message;
}

function readResponse(response) {
    // console.log('response::::', response.data);
    return response.data;
}

// Login 
export const login = (params) => {
    return axios.post(`/login`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Settings 
export const updateAccount = (params) => {
    updateHeaders();
    return axios.post(`/settings/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/settings/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePassword = (params) => {
    updateHeaders();
    return axios.post(`/settings/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Sub-Admins 
export const createSubAdminAccount = (params) => {
    updateHeaders();
    return axios.post(`/sub-admins/create-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getSubAdminUsers = (role) => {
    updateHeaders();
    return axios.get(`/sub-admins/list/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getSubAdminArchiveUsers = (role) => {
    updateHeaders();
    return axios.get(`/sub-admins/archive/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updateSubAdminAccount = (params) => {
    updateHeaders();
    return axios.post(`/sub-admins/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getSubAdminAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/sub-admins/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deleteSubAdminAccount = (id) => {
    updateHeaders();
    return axios.put(`/sub-admins/delete-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restoreSubAdminAccount = (id) => {
    updateHeaders();
    return axios.put(`/sub-admins/restore-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeSubAdminAccountStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/sub-admins/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeSubAdminPassword = (params) => {
    updateHeaders();
    return axios.post(`/sub-admins/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Masters
export const createMasterAccount = (params) => {
    updateHeaders();
    return axios.post(`/masters/create-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getMasterUsers = (role) => {
    updateHeaders();
    return axios.get(`/masters/list/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getMasterArchiveUsers = (role) => {
    updateHeaders();
    return axios.get(`/masters/archive/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updateMasterAccount = (params) => {
    updateHeaders();
    return axios.post(`/masters/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getMasterAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/masters/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deleteMasterAccount = (id) => {
    updateHeaders();
    return axios.put(`/masters/delete-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restoreMasterAccount = (id) => {
    updateHeaders();
    return axios.put(`/masters/restore-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeMasterAccountStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/masters/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeMasterPassword = (params) => {
    updateHeaders();
    return axios.post(`/masters/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const addMasterCredit = (params) => {
    updateHeaders();
    return axios.post(`/masters/add-credit`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const withdrawMasterCredit = (params) => {
    updateHeaders();
    return axios.post(`/masters/withdraw-credit`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Players 
export const createPlayerAccount = (params) => {
    updateHeaders();
    return axios.post(`/players/create-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getPlayerUsers = (role) => {
    updateHeaders();
    return axios.get(`/players/list/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getPlayerArchiveUsers = (role) => {
    updateHeaders();
    return axios.get(`/players/archive/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updatePlayerAccount = (params) => {
    updateHeaders();
    return axios.post(`/players/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getPlayerAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/players/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deletePlayerAccount = (id) => {
    updateHeaders();
    return axios.put(`/players/delete-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restorePlayerAccount = (id) => {
    updateHeaders();
    return axios.put(`/players/restore-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePlayerAccountStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/players/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePlayerBettingStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/players/change-betting-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePlayerPassword = (params) => {
    updateHeaders();
    return axios.post(`/players/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const addPlayerCredit = (params) => {
    updateHeaders();
    return axios.post(`/players/add-credit`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const withdrawPlayerCredit = (params) => {
    updateHeaders();
    return axios.post(`/players/withdraw-credit`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Credits 
export const getCreditsHistory = () => {
    updateHeaders();
    return axios.get(`/credits/history`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Third Party APIs
export const callThirtPartyAPI_getSports = () => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-sports`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getSeries = (sportsID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-series/${sportsID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getMatches = (sportsID, seriesID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-matches/${sportsID}/${seriesID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getMarkets = (eventID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-markets/${eventID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getMarketsSelection = (marketID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-markets-selection/${marketID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getMarketOdds = (marketID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-market-odds/${marketID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getSession = (matchID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-session/${matchID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const callThirtPartyAPI_getScore = (matchID) => {
    updateHeaders();
    return axios.get(`/call-third-party-apis/get-score/${matchID}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Sports
export const getSports = () => {
    updateHeaders();
    return axios.get(`/sports/listing`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeSportsStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/sports/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Series
export const getSeries = (params) => {
    updateHeaders();
    return axios.get(`/series/listing`, {params: params}).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeSeriesStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/series/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deleteSeries = (id, status) => {
    updateHeaders();
    return axios.put(`/series/delete/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Matches
export const getMatches = (params) => {
    updateHeaders();
    return axios.get(`/matches/listing`, {params: params}).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeMatchStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/matches/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deleteMatch = (id, status) => {
    updateHeaders();
    return axios.put(`/matches/delete/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// list sub admin wise masters 
export const getListSubAdminWiseMasters = (parent_id, status) => {
    updateHeaders();
    return axios.get(`/list_sub_admin_wise_masters/${parent_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// list master wise players 
export const getListMasterWisePlayers = (parent_id, status) => {
    updateHeaders();
    return axios.get(`/list_master_wise_players/${parent_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// list matches in-play 
export const getListMatchesInplay = () => {
    updateHeaders();
    return axios.get(`/matches/in-play`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// list matche Sessions 
export const getListMatcheSessions = (event_id) => {
    updateHeaders();
    return axios.get(`/sessions/listing/${event_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// add/remove session 
export const addremoveMatchStatus = (session_id, status) => {

    updateHeaders();
    return axios.put(`/sessions/add-remove/${session_id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// abandoned the session
export const abandonedMatchStatus = (session_id) => {
    
    updateHeaders();
    return axios.put(`/sessions/abandoned/${session_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
// list matche Sessions 
export const getGlobleSettingData = (params) => {
    updateHeaders();
    return axios.get(`/settings/get-global-settings`,{params: params}).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//

export const updateGlobleSetting = (params) => {
    updateHeaders();
    return axios.post(`/settings/update-global-settings`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Refresh Match odd
export const GetMatchRefresh = (event_id) => {
    
    updateHeaders();
    return axios.get(`/matches/user-match-odds/${event_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}


//get advertisements
export const getadvertisements = () => {
    updateHeaders();
    return axios.get(`/players/get-advertisements`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//update stakes
export const updateStakeData = (params) => {
    updateHeaders();
    return axios.post(`/settings/update-stakes`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
//get user match bets
export const GetMatchbatoddSession = (event_id) => {
    
    updateHeaders();
    return axios.get(`/bats/user-match-bats/${event_id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

//update and save user bats

export const NewBatsAddon = (params) => {
    updateHeaders();
    return axios.post(`/bats/save`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}