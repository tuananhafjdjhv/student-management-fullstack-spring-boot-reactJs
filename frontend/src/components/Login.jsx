import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import { login } from "../redux/reduxSlice";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [role,setRole] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginClick = (e) => {
    let body = {
      username: username,
      password: password,
    };
    let authService = new AuthService();
    authService.login(body).then((res) => {
      dispatch(login(res.data));
      const {isBlock} = res.data.status;
      const datas = res.data.roles;
      
      setRole(datas.id)
      console.log("role: "+datas);
      if (isBlock) {
        alert("tai khoan bi khoa")
        navigate("/");
      } else {
        alert("dang nhap thanh cong")
        if (role == 1 && role == 3 && role == 4) {
          navigate("/admin");
        } else {
          navigate("/home")
        }
        // navigate("/admin");
        
      }
        
      
    });
    e.preventDefault();
  };

  return (
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
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-3/4 rounded-2xl px-6 lg:px-16 xl:px-12
        flex items-center justify-center relative"
      >
        <div className="w-full h-100">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {" "}
              Login{" "}
            </h1>
          </div>
          <form className="mt-6">
            <div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Username"
                className="bg-gray-200 w-full px-4 py-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                className="bg-gray-200 w-full px-4 py-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full block hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-4"
              style={{ backgroundColor: "#00acee" }}
              onClick={loginClick}
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-5">
            <p
              className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold text-center"
              style={{ color: "#00acee" }}
              onClick={() => navigate("/signup")}
            >
              Forgot password ?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
