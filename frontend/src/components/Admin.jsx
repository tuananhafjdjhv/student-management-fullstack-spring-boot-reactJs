import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listStudent, setListStudent] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    let show = new StudentService();
    show.showAll().then((res) => {
      console.log(res.data);
      setListStudent(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let show = new StudentService();
    show.searchUser().then((res) => {
      const results = res.data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      setListStudent(results);
      navigate("/admin");
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbar></Navbar>

      <div
        className="container mx-auto p-12"
        style={{
          backgroundImage: "",
          backgroundColor: "rgb(169 216 244)",
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
              <th className="border-b px-4 py-2 bg-gray-200">Mã sinh viên</th>
              <th className="border-b px-4 py-2 bg-gray-200">Địa chỉ</th>
              <th className="border-b px-4 py-2 bg-gray-200">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listStudent.map((cu, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{index}</td>
                <td className="border-b px-4 py-2">{cu.name}</td>
                <td className="border-b px-4 py-2">{cu.id}</td>
                <td className="border-b px-4 py-2">{cu.address}</td>
                <td className="border-b px-4 py-2">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Xem
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Sửa
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <ul className="flex justify-center">
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                &lt;
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                1
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                2
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                3
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ...
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Admin;
