import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
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
              
            </div>
            <form onSubmit={onUpdateCourse}>
              <p className="text-red-400">{/* {error} */}</p>
              <div className="relative p-6 flex-auto">
                <label className="font-bold text-left">Name Course :{" "}</label>
                
                <input
                  name="courseName"
                  type="text"
                  className="w-1"
                  value={courseData.courseName}
                  onChange={onInputChange}
                />
                <label className="text-left font-bold">Description Course :</label>
                <textarea
                  value={courseData.description}
                  onChange={onInputChange}
                  type="text"
                  name="description"
                  className="w-full h-40 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
                />

                <div className="mb-3">
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    name="image"
                    onChange={onInputChange}

                  />
                </div>

                <div className="flex mb-3" >
                  <label className="text font-bold">Image Course :</label>
                  <div className="ml-[20%] ">
                    <img width={200} src={courseData.image} alt="" />
                  </div>
                </div>
                
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onClose(false)}
                >
                  Close
                </button>
                <button
                  
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Change
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
