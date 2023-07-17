import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import ErrorPage from "./ErrorPage";

const Admin = () => {
  const isLogin = Cookies.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listStudent, setListStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    try {
      let show = new StudentService();
      show.showAll(currentPage).then((res) => {
        setListStudent(res.data.content);
        console.log(res.data.content);
      });
      const { content, totalPages } = show.data;
      setListStudent(content);  
      setTotalPages(totalPages);
      setListStudent(show.data);
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  const goToPage = (currentPage) => {
    setCurrentPage(currentPage+1 );
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
      show.showAll().then((res) => {
        setListStudent(res.data);
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
                    {/* {roles.map((roles,index) => <span key={index}>{roles.name}</span>)} */}
                    {/* <td className="border-b px-4 py-2">{cu.roles}</td> */}
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
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            unBlock
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
            <div className="mt-4">
              <ul className="flex justify-center">
                <li className="mr-2">
                  <button
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    &lt;
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    1
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    2
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    3
                  </button>
                </li>
                {/* <li className="mr-2">
                  <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    ...
                  </a>
                </li> */}
                <li className="mr-2">
                  {Array.map((page,index) => (
                    
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      key={index}
                      onClick={(page) => goToPage(page)}
                      
                    >
                      {console.log("page ",page)}{page + 1}  >
                    </button>
                  ))} 
                </li>
              </ul>
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
