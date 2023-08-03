import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import Footer from "./Footer";
import ModalNotificationDeleteAll from "./ModalNotificationDeleteAll";
import axios from "axios";
import { useEffect } from "react";
import { ModalCreateNewClass } from "./ModalCreateNewClass";

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
        console.log(res.data);
        setListStudent(res.data);
      });
    console.log(id);
    console.log("ra đi mà");
  };

  const [newClass,setNewClass] = useState({})
  const [isTogle,setIsTogle] = useState(false)

  const closeModal =()=>{
    setIsTogle(false);
  }


  return (
    <>
      <Navbar></Navbar>
       <h1 className="text-xl mt-[2%] text-red-500 font-serif">
          Quản Lý Class
        </h1>
      <div className="flex ml-8">
            <button 
            onClick={()=>setIsTogle(true)} 
            className="px-1 bg-slate-200 rounded-xl border-collapse hover:bg-slate-400 "
            >Thêm mới Lớp</button>
      
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[2%]">
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
            </tr>
          </thead>
          <tbody>
            <>
            {listStudent.map((student,index) => 
            <tr
                key={index + 1}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index+1}
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
                
              </tr>
            )}
              
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
        <Footer></Footer>
      </div>
    </>
  );
};