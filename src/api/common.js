import axios from '../http'

export function getUserInfo() {
    return axios.get("/user/info");
}

export function setSmsSign(sign) {
    return axios.post("/user/set_sign", {
        sign: sign
    });
}

export function getConfirmOrderNum() {
    return axios.get("/recharge/confirms")
}