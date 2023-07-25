import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import Sidebar from "./Sidebar";

const Admin = () => {
  const isLogin = Cookies.get("token");
  const navigate = useNavigate();
  const [listStudent, setListStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [size, setSize] = useState();
  const [totalElements, setTotalElements] = useState();
  const [totalPages, setTotalPages] = useState();

  const handlePageClick = () => {
    if (pageCount <= totalPages - 2) {
      setPageCount(pageCount + 1);
    } else return toast.error("Đã hết");
  };

  const handlePreviousClick = () => {
    if (pageCount >= 1) {
      setPageCount(pageCount - 1);
    } else return toast.error("Đã đến đầu trang");
  };

  useEffect(() => {
    try {
      fetchData(pageCount);
    } catch (e) {
      console.log(e);
    }
  }, [pageCount]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/api/auth/show-all?page=${page}`
      );
      setListStudent(response.data.content);
      console.log(response.data);
      setSize(response.data.size);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let show = new StudentService();
    show
      .searchUser(search)
      .then((res) => {
        setListStudent(res.data);
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  const handleChange = (e) => {
    handleSearch(e);
    if (e.target.value === "") {
      let show = new StudentService();
      show.showAll(pageCount).then((res) => {
        setListStudent(res.data.content);
      });
    }
    setSearch(e.target.value);
  };

  const handleGetStudent = (id) => {
    let show = new StudentService();
    show.getById(id).then((res) => {
      console.log(res.data);
    });
    navigate(`/profile/${id}`);
  };

  const handleEdit = (id) => {
    let show = new StudentService();
    show.getById(id).then((res) => {
      console.log(res.data);
    });
    navigate(`/edit-profile/${id}`);
  };

  const handleUnblock = (id) => {
    try {
      let res = new StudentService();
      res.unblockUser(id);
      toast.success("Unblock successfully !");
      window.location.reload();
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  const handleBlok = (id) => {
    try {
      let res = new StudentService();
      res.blockUser(id);
      toast.success("Blok successfully !");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <div className="flex flex-col gap-5 h-max ">
            <Navbar ></Navbar>
          <div className="flex ">
            {/* <Sidebar /> */}
            <div
              className="container mx-auto p-12"
              style={{
                backgroundImage: "",
                backgroundColor: "rgb(169 206 244 / 38%)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="flex items-center ml-20">
                <div className="flex">
                  <nav className="" aria-label=" Page navigation example">
                    <ul className="flex items-center -space-x-px h-10 text-base">
                      <li>
                        <button
                          onClick={handlePreviousClick}
                          className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1 1 5l4 4"
                            />
                          </svg>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={handlePageClick}
                          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 9 4-4-4-4"
                            />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex ml-auto">
                  <NavLink
                    to={"/signup"}
                    className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Thêm sinh viên
                  </NavLink>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 "></h1>
              <div className="mb-3 mx-auto mr-4">
                <form className="flex-auto">
                  <input
                    className="border border-gray-300 px-6 py-2 rounded-full w-4 w-auto"
                    type="text"
                    id="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Tìm kiếm sinh viên"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded ml-2"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>

              <table className="border border-gray-300 mx-auto">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2 bg-gray-200">STT</th>
                    <th className="border-b px-4 py-2 bg-gray-200">
                      Họ và tên
                    </th>
                    <th className="border-b px-4 py-2 bg-gray-200">
                      Mã sinh viên
                    </th>
                    <th className="border-b px-4 py-2 bg-gray-200">Địa chỉ</th>
                    <th className="border-b px-4 py-2 bg-gray-200">Avatar</th>
                    <th className="border-b px-4 py-2 bg-gray-200">Option</th>
                    <th className="border-b px-4 py-2 bg-gray-200">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listStudent.map((cu, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{index + 1}</td>
                      <td className="border-b px-4 py-2">{cu.name}</td>
                      <td className="border-b px-4 py-2">{cu.id}</td>
                      <td className="border-b px-4 py-2">{cu.address}</td>
                      <td className="border-b px-4 py-2">
                        <img style={{ width: 80 }} src={cu.avatar} />
                      </td>
                      <td className="border-b px-4 py-2">
                        <button
                          onClick={() => handleGetStudent(cu.id)}
                          className="bg-slate-400 hover:bg-yellow-700 text-white font-bold py-0 px-2 rounded mr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-6"
                          >
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path
                              fillRule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(cu.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                              clipRule="evenodd"
                            />
                            <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                            <path
                              fillRule="evenodd"
                              d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {cu.status ? (
                          <>
                            <button
                              onClick={() => handleUnblock(cu.id)}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-2 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-6"
                              >
                                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleBlok(cu.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        )}
                      </td>
                      <td className="border-b px-4 py-2">
                        {cu.status ? (
                          <p className="bg-red-500 border-b rounded px-4 py-2">
                            Tài khoản bị khóa
                          </p>
                        ) : (
                          <p className="bg-green-500 rounded">Hoạt động</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex ml-96">
                <nav className="" aria-label=" Page navigation example">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <button
                        onClick={handlePreviousClick}
                        className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {/* <span className="sr-only">Previous</span> */}
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={handlePageClick}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {/* <span className="sr-only">Next</span> */}
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          </div>
          

          <Footer></Footer>
        </>
      ) : (
        <ErrorPage></ErrorPage>
      )}
    </>
  );
};

export default Admin;
