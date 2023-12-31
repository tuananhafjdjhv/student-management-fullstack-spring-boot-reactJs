import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import Cookies from "js-cookie";
import { ModalChangepass } from "./ModalChangepass";
import ErrorPage from "./ErrorPage";

const Profile = () => {
  const isLogin = Cookies.get("token");
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    username: "",
    address: "",
    avatar: "",
    phoneNumber: "",
    birthDate: "",
  });

  const token = Cookies.get("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleSubmitChangeAvatar = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      "http://localhost:8080/v1/api/auth/change-avatar",
      { avatar: imageUrl },
      config
    );
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

  const handleSubmit = () => {
    try {
      const updatedUserData = {
        name: student.name,
        email: student.email,
        username: student.username,
        address: student.address,
        avatar: student.avatar,
        phoneNumber: student.phoneNumber,
        birthDate: student.birthDate,
      };
      setStudent({ ...student, value: updatedUserData });
      console.log(student);
      const response = axios.put(
        "http://localhost:8080/v1/api/update",
        student
      );

      toast.success("Cập nhật thành công");
      // navigate("/admin");
      // window.location.reload();
    } catch (error) {
      console.log("error ====", error);
      toast.error("Cập nhật lỗi !!");
      navigate("/chết-lun");
    }
  };

  const uploadImage = (e) => {
    let previewImg = e.target.files[0];
    if (previewImg == null) return;
    const imageRef = ref(storage, `uploadImage/${uploadImage.name}${v4()}`);
    uploadBytes(imageRef, previewImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setStudent({ ...student, avatar: url });
        setImageUrl(url);
        console.log("image url ", url);
      });
    });
  };

  const [openModalChangePass, setOpenModalChangePass] = useState(false);
  return (
    <>
      {isLogin ? (
        <>
          <div className="bg-gray-100">
            <Navbar></Navbar>
            {openModalChangePass && (
              <ModalChangepass
                closeModal={() => setOpenModalChangePass(false)}
              />
            )}
            <div className="container mx-auto my-5 p-5">
              <div className="md:flex no-wrap md:-mx-2 ">
                {/* Left Side */}
                <form
                  onSubmit={handleSubmitChangeAvatar}
                  className="w-full md:w-3/12 md:mx-2"
                >
                  {/* Profile Card */}
                  <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden rounded ">
                      <img
                        className="h-auto w-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                      {student.name}
                    </h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">
                      Owner at Her Company Inc.
                    </h3>
                    <div className="w-[20%] px-[35%]">
                      <div className="text-center my-2 h-16 w-16 ">
                        <div className="relative w-30 group border-xl">
                          <img
                            src={
                              student.avatar === ""
                                ? "https://www.thepitttowndentist.com.au/wp-content/uploads/2018/08/default-avatar-768x768.jpg"
                                : student.avatar
                            }
                            alt="avatar"
                            className="h-16 w-16 rounded-full  mx-auto"
                          />
                          <div className="rounded-full  absolute top-0 left-0 w-full h-0 bg-black bg-opacity-50 group-hover:h-full duration-100 transition-all flex justify-center items-center overflow-hidden">
                            <div className="w-full h-full relative flex justify-center items-center">
                              <p className="text-white text-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                                avatar
                              </p>
                              <input
                                className="block mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 absolute top-0 left-0 w-full h-full opacity-0"
                                id="small_size"
                                type="file"
                                name="avatar"
                                onChange={uploadImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End of profile card */}
                  <div className="my-4 flex " />
                  {/* Friends card */}
                  <button
                    type="submit"
                    className=" bg-slate-500 rounded-xl p-2 hover:shadow font-mono hover:text-white border-blue-500 hover:bg-red-800"
                  >
                    {" "}
                    Change Avatar
                  </button>
                  <button
                    onClick={() => setOpenModalChangePass(true)}
                    type="button"
                    className="mt-5 bg-slate-500 rounded-xl p-2 hover:shadow font-mono hover:text-white border-blue-500 hover:bg-red-800"
                  >
                    {" "}
                    Change Password
                  </button>
                  {/* End of friends card */}
                </form>
                {/* Right Side */}
                <div className="w-full md:w-9/12 mx-2 h-64">
                  {/* Profile tab */}
                  {/* About Section */}
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span className="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">About</span>
                    </div>
                    <form onSubmit={handleSubmit} className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold"> Name</div>
                          <div className="px-4 py-2">
                            <input
                              className="rounded"
                              type="text"
                              value={student.name}
                              onChange={(e) =>
                                setStudent({
                                  ...student,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            User Name
                          </div>
                          <div className="px-4 py-2">
                            <input
                              type="text"
                              value={student.username}
                              onChange={(e) =>
                                setStudent({
                                  ...student,
                                  username: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Contact No.
                          </div>
                          <div className="px-4 py-2">
                            <input
                              type="text"
                              value={student.phoneNumber}
                              onChange={(e) =>
                                setStudent({
                                  ...student,
                                  phoneNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            {" "}
                            Address
                          </div>
                          <div className="px-4 py-2">
                            <input
                              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              type="text"
                              value={student.address}
                              onChange={(e) =>
                                setStudent({
                                  ...student,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email.</div>
                          <div className="px-4 py-2">
                            <div className="text-blue-800" href="#">
                              <input
                                type="text"
                                readOnly
                                value={student.email}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Birthday
                          </div>
                          <div className="px-4 py-2">
                            <input
                              type="date"
                              value={student.birthDate}
                              onChange={(e) =>
                                setStudent({
                                  ...student,
                                  birthDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button className="bg-red-500 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:text-white hover:bg-red-700 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        Update
                      </button>
                    </form>
                  </div>
                  {/* End of about section */}
                  <div className="my-4" />
                  {/* Experience and education */}
                  <div className="bg-white p-3 shadow-sm rounded-sm"></div>
                  {/* End of profile tab */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ErrorPage/>
      )}
    </>
  );
};

export default Profile;
