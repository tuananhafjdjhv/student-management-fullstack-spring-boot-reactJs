import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { v4 } from "uuid";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    username: "",
    address: "",
    avatarUrl: "",
    phoneNumber: "",
    birthDate: "",
  });


  const handleSubmit = async (e) => {
    let value = e.target.value;
    try {
      const updatedUserData = {
        name: student.name,
        email: student.email,
        username: student.username,
        address: student.address,
        phoneNumber: student.phoneNumber,
        avatarUrl: student.avatarUrl,
        birthDate: student.birthDate,
      };
      const response = await axios
        .put("http://localhost:8080/v1/api/update",updatedUserData)
        toast.success("Update thành công")
        setStudent({...student, value: updatedUserData});
        navigate("/admin")
         console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Update lỗi !!")
    } 
   };

   const [imageUrl, setImageUrl] = useState("");

   const uploadImage = (e) => {
     let previewImg = e.target.files[0];
     if (previewImg == null) return;
     const imageRef = ref(storage, `uploadImage/${uploadImage.name}${v4()}`);
     uploadBytes(imageRef, previewImg).then((snapshot) => {
       getDownloadURL(snapshot.ref).then((url) => {
         setStudent({ ...student,avatar : url });
         setImageUrl(url);
         console.log("image url ",url);
       });
     });
   };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/v1/api/auth/user/${id}`
    );
    setStudent(response.data);
  };


  return (
    <>
      <Navbar></Navbar>
      <section
        className="flex flex-col md:flex-row h-screen items-center"
        style={{
          backgroundImage: "",
          backgroundColor: " #1da1f2",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="relative bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-max rounded-2xl px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <div className="text-center">
              {/* {error && <h7 style={{ color: "red" }}>{error}</h7>} */}
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Update Account
              </h1>
            </div>
            <form className="mt-3" onSubmit={handleSubmit}>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="email"
                  type="email"
                  placeholder="Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="username"
                  type="text"
                  placeholder="Username"
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  value={student.username}
                  onChange={(e) =>
                    setStudent({ ...student, username: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  // for="small_size"
                >
                  Tải lên avatar
                </label>
                <input
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="small_size"
                  type="file"
                  name="avatar"
                  onChange={uploadImage}
                />

                <div>
                  <img width={50} src={student.avatar} alt="avatar" />
                </div>
              </div>

              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="address"
                  type="Address"
                  placeholder="Address"
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="phoneNumber"
                  type="number"
                  placeholder="phoneNumber"
                  // value={phoneNumber}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="birthDate"
                  type="date"
                  placeholder="birth date"
                  // value={birthDate}
                  // onChange={(e) => setBirthDate(e.target.value)}
                  value={student.birthDate}
                  onChange={(e) =>
                    setStudent({ ...student, birthDate: e.target.value })
                  }
                />
              </div>
              {/* <div>
                <>
                  <h7 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Chọn quyền Truy cập
                  </h7>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox-list"
                          type="checkbox"
                          defaultValue=""
                          // value="ADMIN"
                          name="checkbox1"
                          checked="checked"
                          value={student.roles.id}
                          // onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox-list"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          ADMIN
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox-list"
                          type="checkbox"
                          defaultValue=""
                          // value="PM"
                          name="checkbox2"
                          value={student.roles}
                          // onChange={handleCheckboxChange}
                          // onChange={(e) => setRole([...role, e.target.value])}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox-list"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          PM
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox-list"
                          type="checkbox"
                          defaultValue=""
                          // value="TEACHER"
                          value={student.roles}
                          // onChange={handleCheckboxChange}
                          // onChange={(e) => setRole([...role, e.target.value])}
                          name="checkbox3"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox-list"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Teacher
                        </label>
                      </div>
                    </li>
                    <li className="w-full dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="laravel-checkbox-list"
                          type="checkbox"
                          // value="STUDENT"
                          value={student.roles}
                          // onChange={handleCheckboxChange}
                          // onChange={(e) => setRole([...role, e.target.value])}
                          name="checkbox4"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="laravel-checkbox-list"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Student
                        </label>
                      </div>
                    </li>
                  </ul>
                </>
              </div> */}

              <button
                type="submit"
                className="w-full block hover:bg-indigo-400 focus:bg-indigo-600 text-white font-semibold rounded-lg
              px-4 py-3 mt-4"
                style={{ backgroundColor: "#00acee" }}
                // onClick={handelUpdateUser}
              >
                Xác nhận sửa
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateUser;
