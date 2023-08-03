import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import UserData from "./UserData";
import { toast } from "react-hot-toast";

const Home = () => {
  const [listCourse, setListCourse] = useState([]);
  const fetchData = () => {
    const response = axios
      .get("http://localhost:8080/v1/api/course/show-all")
      .then((res) => {
        console.log(res.data);
        setListCourse(res.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const [inputValue, setInputValue] = useState({
    name: "",
    phoneNumber: "",
    course: "Khoá học lập trình Fullstack - Fulltime",
    regions: "Bắc",
    currentJob: "THPT",
    createDate: new Date(),
  });

  const [error, setError] = useState();
  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    if (key === "name") {
      if (value.trim() === "") {
        setError("Vui lòng điền tên của bạn");
      } else {
        setError("");
      }
    }
    if (key === "phoneNumber") {
      if (value.trim() === "") {
        setError("Vui lòng điền SĐT của bạn");
      } else {
        setError("");
      }
    }
    if (key === "createDate") {
      if (value.trim() === "") {
        setInputValue({ ...inputValue, createDate: new Date() });
      }
    }
    setInputValue({ ...inputValue, [key]: value });
  };

  const handleSubmit = () => {
    if (inputValue.name.trim() === "" || inputValue.phoneNumber.trim() === "") {
      toast.error("Thêm thông tin không thành công");
    } else {
      const res = axios.post(
        "http://localhost:8080/v1/api/save-data",
        inputValue
      );
      toast.success("Cảm ơn bạn đã đăng kí, Vui lòng đợi phản hồi nhé");
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    setIsVisible(scrolled > windowHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex mt-[2%] ml-[5%] ">
        <div className=" mr-[1%] ml-10">
          <img
            src="https://rikkei.edu.vn/wp-content/uploads/2022/04/Logo-Rikkei.png"
            alt=""
          />
        </div>
        <form className="mg px-[24%] w-[90%] h-4">
          <div className="relative">
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none rounded">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block rounded-3xl w-full p-[5%] pl-[20%] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
            />
          </div>
        </form>
      </div>
      <div className="justify-between">
        <div className="ml-[10%] w-[%] h-[15%]">
          <ul className="text-s font-bold flex gap-[3%] ">
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Trang chủ</li>
            </a>
            <a href="" className="hover:text-red-600 hover: ">
              {" "}
              <ul className="">Giới thiệu</ul>
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Khóa học</li>
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Lịch khai giảng</li>
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Tin tức</li>
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Test tư duy</li>{" "}
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Tuyển dụng</li>
            </a>
            <a href="" className="hover:text-red-600">
              {" "}
              <li>Tư vấn miễn phí</li>
            </a>
          </ul>
        </div>
        <div className="">
          <div className="">
            <img
              src="https://rikkei.edu.vn/wp-content/uploads/2022/11/ava-website-1-01-2-min-scaled.jpg"
              alt="logo"
            />
          </div>
          <div className=" flex mt-4 ml-4  grid-cols-3 gap-[10%] rounded-full cursor-pointer m-10 w-auto h-auto">
            <div className="bg-[rgb(207,46,46)] w-[40%] rounded-xl border-2 transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-3xl text-left mt-[5%] m-5 font-bold ">
                Dành cho người mới bắt đầu
              </h1>
              <div className="px-[5%] py-[2%] p-[50%] text-left ">
                <a
                  onClick={() => setIsOpen(true)}
                  target="_self"
                  className="text-black bg-white -500 rounded-2xl py-[2%] hover:bg-slate-400 hover:text-white"
                >
                  {" "}
                  <span className="text-sm px-[8%]">
                    Khoá lập trình fullstack
                  </span>
                </a>
              </div>
            </div>
            <div className="bg-[rgb(207,46,46)] h-40 w-[40%] rounded-xl border-2 transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-3xl text-left mt-[8%] m-[7%] font-bold">
                Dành cho người đã có nền tảng
              </h1>
              <a
                onClick={() => setIsOpen(true)}
                target="_self"
                className=" text-black bg-white -500 rounded-2xl py-[2%] hover:bg-slate-400 hover:text-white"
              >
                {" "}
                <span className="text-sm px-[7%] ">
                  Khóa lập trình công nghệ cao
                </span>
              </a>
            </div>
            <div className="bg-[rgb(207,46,46)]  w-[40%] rounded-xl border-2 transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-3xl text-left mt-[8%] m-[7%] font-bold">
                Dành cho người muốn đi Nhật Bản
              </h1>
              <div></div>
              <a
                onClick={() => setIsOpen(true)}
                target="_self"
                className=" text-black bg-white -500 rounded-2xl py-[2%] hover:bg-slate-400 hover:text-white"
              >
                <span className="text-sm px-[7%]">
                  Khóa lập trình viên Nhật Bản
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <h1 className="text-4xl text-red-400">
              Điều ấn tượng chỉ có tại Rikkei Academy{" "}
            </h1>
            <h3 className="text-2xl mt-10 ">
              Giàu kinh nghiệm, giỏi chuyên môn và tận tâm
            </h3>
          </div>
        </div>
        <div className="fixed top-1 right-5 mt-96 z-50">
          <a onClick={() => setIsOpen(true)}>
            <img
              className="cursor-pointer mt-4 border border-transparent transition-transform transform-gpu hover:scale-110 hover:border-black rounded-[50%] border-5"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-zalo.svg"
              alt="zalo"
            />
          </a>
          <a onClick={() => setIsOpen(true)}>
            <img
              className="cursor-pointer mt-4 border border-transparent transition-transform transform-gpu hover:scale-110 hover:border-black rounded-[50%] border-5"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-call.svg"
              alt="phone"
            />
          </a>

          <a
            className={
              `scroll-to-top-button ${isVisible ? "visible" : "hidden"}` 
            }
            onClick={scrollToTop}
          >
            <img
             src="/src/assets/images/arrow.png" alt=""
             className=" w-9 cursor-pointer mt-3 ml-1 border border-transparent transition-transform transform-gpu hover:scale-110 hover:border-black rounded-[50%] border-5"

             />
          </a>
        </div>

        {/* <div
          className={
            `scroll-to-top-button ${isVisible ? "visible" : "hidden"}` +
            `cursor-pointer mt-4 border border-transparent transition-transform transform-gpu hover:scale-110 hover:border-black rounded-[50%] border-5`
          }
          onClick={scrollToTop}
        >
          Top
        </div> */}
        <div>
          <h1 className="text-4xl text-red-400 mt-[5%] ">
            Các khóa học dành cho bạn{" "}
          </h1>
          <div className="grid grid-cols-3 mt-[3%] gap-[5%] rounded-xl">
            {listCourse.map((course, index) => (
              <div
                className="hover:scale-110 transition-transform transform-gpu hover:bg-red-100 hover:border-1"
                key={index}
              >
                <div className="text-start h-[60%] bg-red-100 transform hover:border-black cursor-pointer">
                  <a onClick={() => setIsOpen(true)}>
                    <img
                      className="rounded-t-xl object-cover w-full h-full"
                      src={course.image}
                      alt=""
                    />{" "}
                  </a>

                  <a onClick={() => setIsOpen(true)}>
                    {" "}
                    <h3 className="ml-[3%] text-2xl text-red-600 block-ellipsis-course-name hover:text-green-700">
                      {course.courseName}
                    </h3>{" "}
                  </a>
                  <a onClick={() => setIsOpen(true)}>
                    {" "}
                    <p className="ml-[3%] block-ellipsis">
                      Mô tả: {course.description}
                    </p>
                  </a>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-red-400 rounded-l ml-[3%] mt-[3%] text-2xl py-1 px-2 text-white hover:text-black hover:bg-red-500 hover:border-black"
                  >
                    Đăng kí
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[10%]">
        {isOpen ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}

                  {/*body*/}
                  <div
                    id="modal"
                    className="fixed inset-0 flex items-center justify-center z-50"
                  >
                    <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-md">
                      <div className="p-4">
                        <form onSubmit={handleSubmit}>
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-red-500">
                              Thông tin khách hàng
                            </h3>

                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-red-500 ">×</span>
                            </button>
                          </div>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          <div className="flex flex-cols-2">
                            <div className="w-1/2 mr-2">
                              <label
                                htmlFor="name"
                                className="block font-medium mb-2"
                              >
                                Tên của bạn (<a className="text-red-600">*</a>):
                              </label>
                              <input
                                onChange={(e) => handleChange(e)}
                                value={inputValue.name}
                                type="text"
                                id="name"
                                name="name"
                                required=""
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="w-1/2 mr-2">
                              <label
                                htmlFor="phone"
                                className="block font-medium mb-2"
                              >
                                Số điện thoại (<a className="text-red-600">*</a>
                                ):
                              </label>
                              <input
                                onChange={(e) => handleChange(e)}
                                value={inputValue.phoneNumber}
                                type="text"
                                name="phoneNumber"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                maxLength={10}
                                minLength={10}
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="region"
                              className="block  mb-2 text-left font-bold"
                            >
                              Bạn đang quan tâm đến khóa học:
                            </label>
                            <select
                              id="course"
                              name="course"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                              onChange={handleChange}
                              value={inputValue.course}
                            >
                              <option value="Khoá học lập trình Fullstack - Fulltime">
                                Khoá học lập trình Fullstack - Fulltime
                              </option>
                              <option value="Khoá học lập trình - Parttime">
                                Khoá học lập trình - Parttime
                              </option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor="region"
                              className="block  mb-2 text-left font-bold"
                            >
                              Bạn đến từ khu vực nào?:
                            </label>
                            <select
                              onChange={handleChange}
                              value={inputValue.regions}
                              id="regions"
                              name="regions"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            >
                              <option value="Bắc">Bắc</option>
                              <option value="Trung">Trung</option>
                              <option value="Nam">Nam</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="occupation"
                              className="block  mb-2 text-left font-bold"
                            >
                              Bạn đang là ?
                            </label>
                            <select
                              onChange={handleChange}
                              value={inputValue.currentJob}
                              id="currentJob"
                              name="currentJob"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            >
                              <option value="THPT">THPT</option>
                              <option value="Sinh viên">Sinh viên</option>
                              <option value="Người đi làm">Người đi làm</option>
                              <option value="Thực tập sinh Nhật Bản">
                                Thực tập sinh Nhật Bản
                              </option>
                              <option value="Bộ đội">Bộ đội</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setIsOpen(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              GỬI THÔNG TIN ĐĂNG KÍ
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
