import axios from "axios";

export default class AuthService {

    login(body) {
        return axios.post("http://localhost:8080/v1/api/auth/signIn", body)
    }

    signUp(body) {
        return axios.post("http://localhost:8080/v1/api/auth/signup", body)
    }

    changePassword(body) {
        return axios.put("http://localhost:8080/v1/api/auth/change-password",body)
    }
}