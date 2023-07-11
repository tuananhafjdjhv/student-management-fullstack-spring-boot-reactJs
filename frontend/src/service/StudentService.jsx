import axios from "axios";



export default class StudentService {
    showAll() {
        return axios.get("http://localhost:8080/v1/api/auth/show-all")
    }
    blockUser(id){
       return axios.get(`http://localhost:8080/v1/api/auth/block-user/${id}`)
    }
    unblockUser(id){
        return axios.get(`http://localhost:8080/v1/api/auth/unblock-user/${id}`)
     }
    searchUser(body){
        return axios.get("http://localhost:8080/v1/api/admin/search",body)
    }
}