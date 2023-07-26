import axios from "axios";
import React, { useState } from "react";

const ModalNotificationDeleteAll = ({closeModal,fetchData}) => {

  const handleDeleteAll = async () => {
    const res = await axios.delete(
      `http://localhost:8080/v1/api/user/deleteAll`
    );
        if (res.status === 200) {
           let res2 = await fetchData();
            closeModal()
           
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
                  <h3 className="text-xl font-semibold text-red-500">
                    Bạn có chắc muốn xóa tất cả
                  </h3>
                </div>
                {/*body*/}

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Đóng
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDeleteAll}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
   
  );
};
export default ModalNotificationDeleteAll;
