import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import Footer from "./Footer";
import ModalNotificationDeleteAll from "./ModalNotificationDeleteAll";
import axios from "axios";
import { useEffect } from "react";
import { ModalCreateNewClass } from "./ModalCreateNewClass";
import { ModalEvaluteStudent } from "./ModalEvaluteStudent";
import { ModalDetailEvaluate } from "./ModalDetailEvaluate";

export const ClassComponent = () => {
  const [listStudent, setListStudent] = useState([]);

  const [listClass, setListClass] = useState([]);

  const fetchDataClass = async () => {
    const res = await axios.get("http://localhost:8080/v1/api/class-all");
    setListClass(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    fetchDataClass();
  }, []);

  const [selectClass, setSelectClass] = useState(-1);

  useEffect(() => {
    if (selectClass !== -1) {
      handleGetAllStudentByClassId(selectClass);
    }
  }, [selectClass]);

  const handleGetAllStudentByClassId = async (id) => {
    const res = await axios
      .get(`http://localhost:8080/v1/api/class/${id}`)
      .then((res) => {
        setListStudent(res.data);
      });
  };

  const [isTogle, setIsTogle] = useState(false);
  const [isOpenModalValuate, setIsOpenModalValuate] = useState(false);
  const [isOpenModalDetailValuate, setIsOpenModalDetailValuate] =
    useState(false);

  const [listEvaluate, setListEvaluate] = useState([]);

  const handleModalOpen = async (studentId) => {
    setIsOpenModalDetailValuate(true);
    const res = await axios.get(
      `http://localhost:8080/v1/api/evaluate/student/${studentId}`
    );
    setListEvaluate(res.data);
    console.log(res.data);
  };
  const [id,setId] =useState()

  const hadleOpenModalCreateEvaluate = (studentId) => {
    console.log(studentId);
    setIsOpenModalValuate(true);
    setId(studentId);
      
  };

  return (
    <>
      <Navbar ></Navbar>
      <h1 className="text-xl mt-[2%] text-red-500 font-serif ">Quản Lý Lớp</h1>
      <div className="flex ml-8">
        <button
          onClick={() => setIsTogle(true)}
          className=" px-1 bg-slate-500 rounded-xl border-collapse hover:bg-slate-400 "
        >
          Thêm mới Lớp
        </button>

        <div className="ml-[60%] mt-[2%]">
          <select
            className="cursor-pointer ml-12 border-1 hover:border-blue-600 px-4 py-1  rounded bg-slate-100 hover:bg-slate-200"
            value={selectClass}
            onChange={(e) => setSelectClass(e.target.value)}
          >
            <option value={-1}>Chọn Lớp muốn xem</option>
            {listClass.map((list, index) => (
              <option key={list.classId} value={list.classId}>
                {list.className}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg mt-[2%]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tên HV
              </th>
              <th scope="col" className="px-6 py-3">
                Lớp
              </th>
              <th scope="col" className="px-6 py-3">
                Mã HV
              </th>
              <th scope="col" className="px-6 py-3">
                Mã Giảng viên
              </th>
              <th scope="col" className="px-6 py-3">
                Giảng viên
              </th>
              <th scope="col" className="px-6 py-3">
                Đánh giá HV
              </th>
              <th scope="col" className="px-6 py-3">
                Xem
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {listStudent.map((student, index) => (
                <tr
                  key={index + 1}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.studentName}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.className}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.teacherId}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.teacherName}
                  </td>
                  <td className=" hover:underline  px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <button
                    className="hover:underline hover:text-blue-500"
                      onClick={() =>
                        hadleOpenModalCreateEvaluate(student.studentId)
                      }
                    >
                      Đánh giá{" "}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <button  className=" hover:underline hover:text-blue-500" onClick={() => handleModalOpen(student.studentId)}>
                      {" "}
                      Xem Đánh giá{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
      <div className=" mt-[5%]">
        {isTogle && (
          <ModalCreateNewClass
            closeModal={() => setIsTogle(false)}
            // fetchData={fetchData}
          />
        )}
        {isOpenModalValuate && (
          <ModalEvaluteStudent
            closeModal={() => setIsOpenModalValuate(false)}
            studentId={id}
          />
        )}
        {isOpenModalDetailValuate && (
          <ModalDetailEvaluate
            listEvaluate={listEvaluate}
            closeModal={() => setIsOpenModalDetailValuate(false)}
          />
        )}

        <Footer></Footer>
      </div>
    </>
  );
};
