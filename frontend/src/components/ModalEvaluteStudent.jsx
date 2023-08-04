import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const ModalEvaluteStudent = ({ closeModal,studentId }) => {

  const [evaluate, setEvaluate] = useState("");
  
  const handleSaveAndCloseModal =  (studentId) => {
    if (evaluate === "") {
      return toast.error("Không được để trống! Đã xảy ra lỗi");

    } else {
       const res =  axios.post(
      "http://localhost:8080/v1/api/evaluate/create",
      { evaluate, studentId }
    );
    console.log("vào ko",res);
    closeModal();
    
    }
   
    
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Evaluate</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => closeModal(false)}
              >
                <span className="bg-transparent text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <>
                <div>
                  <textarea
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border font-extrabold  py-10 px-10 m-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                    placeholder="Evaluate...."
                    required=""
                    value={evaluate}
                    onChange={(e) => setEvaluate(e.target.value)}
                  />
                </div>
              </>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => closeModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>handleSaveAndCloseModal(studentId)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
