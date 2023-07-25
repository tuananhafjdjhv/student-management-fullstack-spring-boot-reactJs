import { Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";

const UpdateCourse = ({
  isOpen,
  onClose,
  courseData,
  onInputChange,
  onUpdateCourse,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        // onSubmit={handleSubmitUpdate}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Update Course</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <form onSubmit={onUpdateCourse}>
              <p className="text-red-400">{/* {error} */}</p>
              <div className="relative p-6 flex-auto ">
                Name Course :{" "}
                <input
                  //   value={courseUpdate.courseName}
                  name="courseName"
                  type="text"
                  className="w-1"
                  value={courseData.courseName}
                  onChange={onInputChange}
                  //   onChange={(e) => handleChange(e)}
                />
                Description Course :
                <input
                  // onChange={(e) => handleChange(e)}
                  // value={courseUpdate.description}
                  value={courseData.description}
                  onChange={onInputChange}
                  type="text"
                  name="description"
                />
                <div className="flex">
                  <input
                    className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="large_size"
                    type="file"
                    name="image"
                    // value={courseData.image}
                    onChange={onInputChange}
                  />
                  <div><img width={400} src={courseData.image} alt="" /></div>
                </div>
                Image Course :{" "}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateCourse;
