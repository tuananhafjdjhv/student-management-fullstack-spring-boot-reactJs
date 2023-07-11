import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import Navbar from "./Navbar";

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [roles, setRoles] = useState([]);


  const navigate = useNavigate();

  const handleSelectRole = (e) => {
    setRoles(e.target.value);
  };


  const signupClick = (e) => {
    let body = {
      name,
      email,
      username,
      password,
      avatar,
      address,
      phoneNumber,
      roles
    };
    let authService = new AuthService();
    authService.signup(body).then((res) => {
      console.log(res.data);
        navigate("/");
      
    });
    e.preventDefault();
  };
  return (
    <>
    <Navbar></Navbar>
    <section
      className="flex flex-col md:flex-row h-screen items-center"
      style={{
        backgroundImage: "",
        backgroundColor: " #1da1f2",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="relative bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-max rounded-2xl px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              Create Account 
            </h1>
          </div>
          <form action={signupClick} className="mt-3">
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="fullName"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="avatar"
                type="text"
                placeholder="Avatar"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="username"
                type="Address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
            <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="phoneNumber"
                type="text"
                placeholder="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
            <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="birthDate"
                type="date"
                placeholder="birth date"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <select value={roles} onChange={handleSelectRole} className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white">
              <option value="">--Chọn quyền truy cập-- </option>
              <option value="ADMIN">Admin </option>
              <option value="PM">PM</option>
              <option value="TEACHER">TEACHER</option>
              <option value="STUDENT">STUDENT</option>
            </select>
            <div>
              <input
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full block hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-4"
              style={{ backgroundColor: "#00acee" }}
              onClick={signupClick}
            >
              Thêm mới
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
    
  );
};
export default Signup;
