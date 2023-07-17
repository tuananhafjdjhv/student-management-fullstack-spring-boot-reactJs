import axios from "axios";



export default class StudentService {
    showAll() {
        return axios.get("http://localhost:8080/v1/api/auth/show-all")
    }
    blockUser(id){
       return axios.post(`http://localhost:8080/v1/api/auth/block-user/${id}`)
    }
    unblockUser(id){
        return axios.post(`http://localhost:8080/v1/api/auth/unblock-user/${id}`)
     }
    searchUser(name){
        return axios.get(`http://localhost:8080/v1/api/search/${name}`)
    }
    getById(id){
        return axios.get(`http://localhost:8080/v1/api/auth/user/${id}`)
    }
}