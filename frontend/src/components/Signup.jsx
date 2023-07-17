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
  const [role,setRole] = useState([]);
  const isLogin = Cookies.get("token");
  const [checkbox,setCheckbox] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  })
  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setCheckbox((prevCheckbox) => ({
      ...prevCheckbox,
      [checkboxName]: isChecked,
    }));

    if (isChecked) {
      const inputValue = event.target.value;
      setRole((prevValues) => [...prevValues, inputValue]);
      setInputValue({...inputValue, roles: role});
    } else {
      const updatedValues = role.filter((value) => value !== event.target.value);
      // setRole(updatedValues);
      setInputValue({...inputValue, roles: updatedValues});
    }
  };

  console.log("role   === ",role);

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
    setInputValue({ ...inputValue, roles: role})

    if (
      inputValue.name === "" ||
      inputValue.username === "" ||
      inputValue.email === "" ||
      inputValue.password === "" ||
      inputValue.address === "" ||
      inputValue.birthDate === "" ||
      inputValue.phoneNumber === ""
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }


    
    axios
      .post("http://localhost:8080/v1/api/auth/signup", inputValue)
      .then((res) =>{
        setInputValue({ ...inputValue, roles: role})
        
      console.log(res.data)
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi");
        console.log(err);
      })
    setError("");
    toast.success("Thêm mới thành công");
    navigate("/admin");
  };

  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = (e) => {
    let previewImg = e.target.files[0];
    if (previewImg == null) return;
    const imageRef = ref(storage, `uploadImage/${uploadImage.name}${v4()}`);
    uploadBytes(imageRef, previewImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setInputValue({ ...inputValue,avatar : url });
        setImageUrl(url);
        console.log("image url ",url);
      });
    });
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
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
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
                <input
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="small_size"
                  type="file"
                  name="avatar"
                  onChange={uploadImage}
                />

                <div>
                  <img width={50} src={imageUrl} alt="avatar" />
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
                <>
                  <h7 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Chọn quyền Truy cập
                  </h7>
                  <ul
                    className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox-list"
                          type="checkbox"
                          defaultValue=""
                          value="ADMIN"
                          name="checkbox1"
                          checked={checkbox.checked}
                          // value={inputValue.roles}
                          onChange={handleCheckboxChange}
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
                          value="PM"
                          name="checkbox2"
                          checked={checkbox.checked}
                          onChange={handleCheckboxChange}
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
                          value="TEACHER"
                          checked={checkbox.checked}
                          onChange={handleCheckboxChange}
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
                          value="STUDENT"
                          checked={checkbox.checked}
                          onChange={handleCheckboxChange}
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
