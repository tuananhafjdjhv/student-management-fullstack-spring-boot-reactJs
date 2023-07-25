import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = Cookies.get("token");
  const avatar = Cookies.get("avatar");
  const name = Cookies.get("name");
  const getEmailFromCookie = Cookies.get("email");
  const [userProfile, setUserProfile] = useState({});

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const LogOut = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("avatar");
    Cookies.remove("name");
    Cookies.remove("email");
    toast.success("Đăng xuất thành công!")
    navigate("/login");
  };

  let color = ["bg-green-950"];
  const [colorState, setColorState] = useState(0);
  useEffect(() => {
    let id = setInterval(() => {
      if (colorState < color.length - 1) {
        setColorState((prev) => prev + 1);
      } else {
        setColorState(0);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [colorState]);
  const [avatarState, setAvatarState] = useState();

  useEffect(() => {
    avatarVariable();
  }, []);

  const avatarVariable = () => {
    if (avatar === "") {
      setAvatarState(
        <img
          className="inline h-6 rounded-full"
          src="https://antimatter.vn/wp-content/uploads/2022/11/hinh-avatar-trang-buon.jpg"
        />
      );
    } else {
      setAvatarState(<img className="inline h-6 rounded-full" src={avatar} />);
    }
  };

  const [userId, setUserId] = useState();
  useEffect(() => {
    const res = axios
      .get(`http://localhost:8080/v1/api/auth/user-email/${getEmailFromCookie}`)
      .then((response) => {
        setUserId(response.data.id);
        setUserProfile(response.data);
      });
      
  }, []);
  const handleShowProfile = () => {
    navigate(`/profile/${userId}`);
  };
  const handleClickToChat = () => {
    navigate(`/chat/${userId}`);

  }

  return (
    <>
      {isLogin ? (
        <>
          <nav className={`${color[colorState]} transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div>
                    <img
                      src="/logo.png"
                      width="40"
                      height="50"
                      className="bg-black-500"
                      alt="Logo"
                    ></img>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      Learning Store
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink
                      to={"/"}
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Trang chủ
                    </NavLink>
                    <NavLink
                      to={"/admin"}
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sinh viên
                    </NavLink>
                    <Link to={"/course"}
                      
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Khoá học
                    </Link>
                    <a
                      href="#"
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Bạn bè
                    </a>
                    <a
                      onClick={LogOut}
                      className="cursor-pointer text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Đăng xuất
                    </a>
                    <button className="text-white hover:bg-blue-600 px-2 py-2 rounded-md text-sm font-medium">
                      <div className="button-container">
                        <div
                          style={{ width: 17, borderRadius: 50 }}
                          className="bg-red-500 notification"
                        >
                          1
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 16"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                          <path
                            fillRule="evenodd"
                            d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                    <button
                    onClick={(handleClickToChat)}
                    className="text-white hover:bg-blue-600 px-2 py-2 rounded-md text-sm font-medium">
                      <div className="button-container">
                        <div
                          style={{ width: 17, borderRadius: 50 }}
                          className="bg-red-500 notification"
                        >
                          1
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 19"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={handleShowProfile}
                      className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline"
                    >
                      <span className="text-white">{name}</span>
                      {avatarState}
                      {/* <img className="inline h-6 rounded-full" src={avatar} /> */}
                    </button>
                  
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={toggleNavbar}
                    type="button"
                    className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`${isOpen ? "block" : "hidden"} md:hidden`}
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Trang chủ
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sinh viên
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Khoa
                </a>
                <a
                  onClick={LogOut}
                  className="cursor-pointer text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Đăng xuất
                </a>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className={`${color[colorState]} transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div>
                    <img
                      src="/logo.png"
                      width="40"
                      height="50"
                      className="bg-black-500"
                      alt="Logo"
                    ></img>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      Learn
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="#"
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Trang chủ
                    </a>
                    <NavLink
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Về chúng tôi
                    </NavLink>
                    <a
                      href="#"
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Khoá học
                    </a>
                    <a
                      href="#"
                      className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Bạn bè
                    </a>
                    <NavLink
                      to={"/login"}
                      className="cursor-pointer text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Đăng nhập
                    </NavLink>
                    <button className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline">
                      {/* <span className="text-white">Jane Doe</span>
                  <img className="inline h-6 rounded-full" src="https://avatars2.githubusercontent.com/u/24622175?s=60&v=4" /> */}
                      {/* <svg fill="currentColor" viewBox="0 0 20 20"  className="inline w-4 h-4 transition-transform duration-200 transform"> */}
                      {/* <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /> */}
                      {/* </svg> */}
                    </button>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={toggleNavbar}
                    type="button"
                    className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`${isOpen ? "block" : "hidden"} md:hidden`}
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Trang chủ
                </a>
                {/* <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sinh viên
                </a> */}
                <a
                  href="#"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Khoa
                </a>
                <a className="cursor-pointer text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                  Đăng nhập
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
