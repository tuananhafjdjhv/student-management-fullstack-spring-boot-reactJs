
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = Cookies.get("token");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const LogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    Cookies.remove("token");
    navigate("/");
  };

  let color = [ "bg-green-950"];
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
                Lờ Mờ Ét
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
                to={"/admin"}
                className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sinh viên
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
              <a
                onClick={LogOut}
                
                className="cursor-pointer text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Đăng xuất
              </a>
              <button  className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline">
                  <span className="text-white">Jane Doe</span>
                  <img className="inline h-6 rounded-full" src="https://avatars2.githubusercontent.com/u/24622175?s=60&v=4" />
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
    ):(
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
                Lờ Mờ Ét
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
                to={"/admin"}
                className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sinh viên
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
              <NavLink to={"/"}
                
                className="cursor-pointer text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Đăng nhập
              </NavLink>
              <button  className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline">
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
            className="cursor-pointer text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
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
