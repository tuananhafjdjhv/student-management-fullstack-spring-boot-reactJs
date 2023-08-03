import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import Navbar from "./Navbar";
import validator from "validator";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Signup = () => {
  const [error, setError] = useState("");
  const [role, setRole] = useState([]);
  const isLogin = Cookies.get("token");
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    roles: [],
  });
  // const [newRoles,setNewRoles ]= useState();
  
  const handleCheckboxChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      roles: selectedRoles,
    }));
  };

  console.log("role   === ", role);



  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setInputValue({ ...inputValue, [key]: value });
    if (key === "email") {
      if (value.trim() === "") {
        setError("Vui lòng nhập email");
      } else if (!validator.isEmail(value)) {
        setError("Vui lòng nhập email hợp lệ.");
      } else {
        setError("");
      }
    }
    if (key === "username") {
      if (value.trim() === "" || inputValue.username.trim().length < 6) {
        setError("Vui lòng nhập username và  phải trên 6 kí tự");
      } else {
        setError("");
      }
    }
    if (key === "name") {
      if (value.trim() === "" || inputValue.name.trim().length < 6) {
        setError("Vui lòng nhập họ tên và  phải trên 6 kí tự");
      } else {
        setError("");
      }
    }
    if (key === "password") {
      if (value.trim() === "" || inputValue.password.trim().length < 6) {
        setError("Vui lòng nhập mật khẩu và  phải trên 6 kí tự");
      } else {
        setError("");
      }
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setInputValue({ ...inputValue, roles: role });

      if (
        inputValue.name === "" ||
        inputValue.username === "" ||
        inputValue.email === "" ||
        inputValue.password === "" ||
        inputValue.address === "" ||
        inputValue.birthDate === "" ||
        inputValue.phoneNumber === "" ||
        inputValue.roles === ""
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      const res = axios.post(
        "http://localhost:8080/v1/api/auth/signup",
        inputValue
      );

      setError("");
      toast.success("Thêm mới thành công");
      navigate("/admin");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
      console.log(error);
    }
  };

  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = (e) => {
    let previewImg = e.target.files[0];
    if (previewImg == null) return;
    const imageRef = ref(storage, `uploadImage/${uploadImage.name}${v4()}`);
    uploadBytes(imageRef, previewImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setInputValue({ ...inputValue, avatar: url });
        setImageUrl(url);
        console.log("image url ", url);
      });
    });
  };

  console.log(inputValue);
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
              {error && <h7 style={{ color: "red" }}>{error}</h7>}
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Create Account
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
                  value={inputValue.name}
                  onChange={(e) => handleChange(e)}
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
                  value={inputValue.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={inputValue.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  // for="small_size"
                >
                  Tải lên avatar
                </label>
                {/* <input
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="small_size"
                  type="file"
                  name="avatar"
                  onChange={uploadImage}
                />

                <div>
                  <img width={50} src={imageUrl} alt="avatar" />
                </div> */}
                <div>
                <div className="relative w-16 group">
                  <img
                    src={
                      imageUrl === ""
                        ? "https://www.thepitttowndentist.com.au/wp-content/uploads/2018/08/default-avatar-768x768.jpg"
                        : imageUrl
                    }
                    // src="https://www.thepitttowndentist.com.au/wp-content/uploads/2018/08/default-avatar-768x768.jpg"
                    alt="avatar"
                    className="w-full"
                  />
                  <div className="absolute top-0 left-0 w-full h-0 bg-black bg-opacity-50 group-hover:h-full duration-300 transition-all flex justify-center items-center overflow-hidden">
                    <div className="w-full h-full relative flex justify-center items-center">
                      <p className="text-white">Avatar</p>
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
              

              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="address"
                  type="Address"
                  placeholder="Address"
                  // value={address}
                  // onChange={(e) => setAddress(e.target.value)}
                  value={inputValue.address}
                  onChange={(e) => handleChange(e)}
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
                  value={inputValue.phoneNumber}
                  onChange={(e) => handleChange(e)}
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
                  value={inputValue.birthDate}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
              <div >
                <select
                onChange={handleCheckboxChange}
                className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white" >
                  <option value="">Chọn quyền truy cập</option>
                  <option value="ADMIN" >ADMIN</option>
                  <option value="PM">PM</option>
                  <option value="STUDENT">STUDENT</option>
                  <option value="TEACHER">TEACHER</option>
                </select>
              </div>
              </div>
              <div className="flex flex-row">
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="password"
                  type="password"
                  placeholder="Password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  value={inputValue.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                type="submit"
                className="w-full block hover:bg-indigo-400 focus:bg-indigo-600 text-white font-semibold rounded-lg
              px-4 py-3 mt-4"
                style={{ backgroundColor: "#00acee" }}
                // onClick={handleAdd}
              >
                Thêm mới
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
