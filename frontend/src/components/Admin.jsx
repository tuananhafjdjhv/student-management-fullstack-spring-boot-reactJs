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

const Admin = () => {
  const isLogin = Cookies.get("token");
  const navigate = useNavigate();
  const [listStudent, setListStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [size, setSize] = useState();
  const [totalElements, setTotalElements] = useState()
  const [totalPages, setTotalPages] = useState()

  const handlePageClick = () => {
    
    if (pageCount <= totalPages-2){
      setPageCount(pageCount + 1);
    } else 
      return toast.error("Đã hết");
  };

  const handlePreviousClick = () => {
     
    if (pageCount >= 1) {
      setPageCount(pageCount - 1);
    } else 
        return toast.error("Đã đến đầu trang");;
    
   
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
          <Navbar></Navbar>
          <div
            className="container mx-auto p-12"
            style={{
              backgroundImage: "",
              backgroundColor: "rgb(169 206 244 / 38%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="flex align-text-center">
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
                {/* <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <button
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </button>
                </li> */}
                
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
            <div className="mt-4">
              <NavLink
                to={"/signup"}
                className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Thêm sinh viên
              </NavLink>
            </div>
            <h1 className="text-3xl font-bold mb-4 "></h1>
            <div className="mb-3 mx-auto mr-4">
              <form className="flex">
                <input
                  className="border border-gray-300 px-4 py-2 rounded-md w-full w-auto "
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
                  <th className="border-b px-4 py-2 bg-gray-200">Họ và tên</th>
                  <th className="border-b px-4 py-2 bg-gray-200">
                    Mã sinh viên
                  </th>
                  <th className="border-b px-4 py-2 bg-gray-200">Địa chỉ</th>
                  <th className="border-b px-4 py-2 bg-gray-200">Avatar</th>
                  <th className="border-b px-4 py-2 bg-gray-200">Option</th>
                  <th className="border-b px-4 py-2 bg-gray-200">Trạng thái</th>
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
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleEdit(cu.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Sửa
                      </button>
                      {cu.status ? (
                        <>
                          <button
                            onClick={() => handleUnblock(cu.id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          >
                            unBlock
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleBlok(cu.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Block
                          </button>
                        </>
                      )}
                    </td>
                    <td className="border-b px-4 py-2">
                      {cu.status ? (
                        <p className="bg-red-500 border-b px-4 py-2">
                          Tài khoản bị khóa
                        </p>
                      ) : (
                        <p className="bg-green-500">Hoạt động</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex align-text-center">
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
                {/* <li>
                  <button
                    onClick={()=>setPageCount(1)}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    onClick={()=>setPageCount(2)}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </button>
                </li> */}
                
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
