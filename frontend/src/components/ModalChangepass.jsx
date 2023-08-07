import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const ModalChangepass = ({ closeModal }) => {
  const isLogin = Cookies.get("token");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (newPass !== rePass) {
      return toast.error("Mật khẩu mới không trùng khớp");
    } else {
      try {
      const headers = {
        Authorization: `Bearer ${isLogin}`,
        "Content-Type": "application/json",
      };
      const data = {
        oldPass,
        newPass,
        rePass,
      };
      const res = await axios
        .put("http://localhost:8080/v1/api/auth/change-password", data, { headers })
        // .then((res) => console.log(res));
      toast.success("Đổi mật khẩu thành công");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Mật khẩu cũ không đúng");
    }
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "oldPass") {
      setOldPass(value);
    }
    if (name === "newPass") {
      setNewPass(value);
    }
    if (name === "rePass") {
      setRePass(value);
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
              <h3 className="text-xl font-semibold">Change Password</h3>
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
                  <input
                    type="password"
                    name="oldPass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required=""
                    value={oldPass}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="newPass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="New password"
                    required=""
                    value={newPass}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="rePass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="New Repassword"
                    required=""
                    value={rePass}
                    onChange={handleChange}
                  />
                </div>
              </>
              {error ? (
                <div>
                  <p>{error}</p>
                </div>
              ) : (
                ""
              )}
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
                onClick={handleSubmit}
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
