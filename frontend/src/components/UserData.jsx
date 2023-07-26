import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import ModalNotificationDeleteAll from "./ModalNotificationDeleteAll";

const UserData = () => {
  const [listUserData, setListUserData] = useState([]);

  const fetchData = () => {
    const res = axios
      .get("http://localhost:8080/v1/api/user/all-data")
      .then((response) => {
        setListUserData(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => fetchData(), []);

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8080/v1/api/deleteUserData/${id}`
    );
    if (res.status === 200) {
      fetchData();
    } else {
      console.log(res);
    }
  };
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleRenderDate = (date) => {
    let tempDate = new Date(date);
    return `${tempDate.getFullYear()}-${
      tempDate.getMonth() + 1
    }-${tempDate.getDate()}  ${tempDate.getHours()}:${tempDate.getMinutes()}`;
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex ml-[10%]">
        <h1 className="text-3xl mt-[2%] text-red-500 font-serif">
          Data Khách Hàng
        </h1>
        <div className="ml-[60%] mt-[2%]">
          <button
            onClick={() => setIsOpenModal(true)}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Delete All
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[2%]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên Khách Hàng
              </th>
              <th scope="col" className="px-6 py-3">
                số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Khóa học
              </th>
              <th scope="col" className="px-6 py-3">
                Vùng miền
              </th>
              <th scope="col" className="px-6 py-3">
                Công việc hiện tại
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listUserData.map((user, index) => {
              return (
                <>
                  <tr
                    key={index + 1}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.course}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.regions}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.currentJob}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {handleRenderDate(user.createDate)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className=" mt-[5%]">
        {isOpenModal && (
          <ModalNotificationDeleteAll
            closeModal={() => setIsOpenModal(false)}
            fetchData={fetchData}
          />
        )}
        <Footer></Footer>
      </div>
    </>
  );
};

export default UserData;
