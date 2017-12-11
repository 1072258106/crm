import * as remindApi from '../../api/remind'

export default {
    namespaced: true,
    state: {
        groups: []
    },
    getters: {
        customGroups: state => {
            //自定义分组，排除系统分组
            return state.groups.filter(function (item) {
                return item.group_id != 1 && item.group_id != 2;
            })
        },
        lastGroupId: state => {
            const defaultGroups = state.groups[state.groups.length - 1];
            if ('undefined' !== typeof (defaultGroups)) {
                return defaultGroups.group_id;
            } else {
                return 0;
            }
        }
    },
    mutations: {
        updateGroups(state, list) {
            state.groups = list;
        }
    },
    actions: {
        getGroups({ commit }) {
            remindApi.getGroups()
                .then(
                response => {
                    let responseData = response.data;
                    if (responseData.code == 0) {
                        let data = responseData.data;
                        commit('updateGroups', data.list);
                    }
                }
                )
        },
        updateGroups({ commit }) {
            return new Promise((resolve, reject) => {
                remindApi.getGroups()
                    .then(
                    response => {
                        let responseData = response.data;
                        if (responseData.code == 0) {
                            let data = responseData.data;
                            commit('updateGroups', data.list);
                            resolve();
                        } else {
                            reject();
                        }
                    }
                    )
            })
        }
    }
}