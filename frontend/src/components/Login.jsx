import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginClick = async (e) => {
    e.preventDefault();

    try {
      // Gọi API để đăng nhập và nhận JWT từ server
      const response = await axios
        .post("http://localhost:8080/v1/api/auth/signIn", {
          username,
          password,
        })
        .then((res) => console.log(res));

      // Lưu JWT vào cookie
      // document.cookie = `token=${response.data.token}; path=/`;
      // Cookies.set('token', response.data.token, { expires: 7 });

      // Đăng nhập thành công
      setError("");
      setPassword("");
      setUsername("");
      // alert("Đăng nhập thành công!", navigate("/admin"));
      toast.success("Đăng nhập thành công!");
      navigate("/admin");
      // console.log(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      // setError(alert("Tên người dùng hoặc mật khẩu không đúng."));
      toast.error("Tên người dùng hoặc mật khẩu không đúng.");
    }
  };


  return (
    <>
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
              {/* <p className="bg-red-500">{error}</p> */}
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                {" "}
                Login{"  "}
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
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="bg-gray-200 w-full px-4 py-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full block hover:bg-indigo-800 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-4"
                style={{ backgroundColor: "#00acee" }}
                onClick={loginClick}
              >
                Log In
              </button>
            </form>

            <div className="flex flex-row gap-2 p-3">
              <div className="flex bg-gray-50 ">
                <a
                href="http://localhost:8080/oauth2/authorization/google"
                  // onClick={(e)=> googleLogin(e)}
                  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                  >
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Color-"
                        transform="translate(-401.000000, -860.000000)"
                      >
                        <g
                          id="Google"
                          transform="translate(401.000000, 860.000000)"
                        >
                          <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            id="Fill-1"
                            fill="#FBBC05"
                          >
                            {" "}
                          </path>
                          <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            id="Fill-2"
                            fill="#EB4335"
                          >
                            {" "}
                          </path>
                          <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            id="Fill-3"
                            fill="#34A853"
                          >
                            {" "}
                          </path>
                          <path
                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                            id="Fill-4"
                            fill="#4285F4"
                          >
                            {" "}
                          </path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>Google</span>
                </a>
              </div>
              <div className="flex bg-gray-50">
                <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <svg
                    className="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 48 48"
                    version="1.1"
                  >
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Color-"
                        transform="translate(-200.000000, -160.000000)"
                        fill="#4460A0"
                      >
                        <path
                          d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                          id="Facebook"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span> Facebook</span>
                </button>
              </div>
            </div>
            <div className="text-center mt-5">
              <p
                className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold text-center"
                style={{ color: "#00acee" }}
                onClick={() => navigate("/")}
              >
                Forgot password ?
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
