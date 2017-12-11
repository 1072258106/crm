import axios from '../http'

export function getGroups() {
    return axios.get('/remind/get_groups');
}