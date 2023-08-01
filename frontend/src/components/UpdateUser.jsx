import { useEffect, useState } from "react";
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
    avatar: "",
    phoneNumber: "",
    birthDate: "",
  });

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

      toast.success("Update thành công");
      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.log("error ====", error);
      toast.error("Update lỗi !!");
      navigate("/chết-lun");
    }
  };

  const [imageUrl, setImageUrl] = useState("");

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
                  placeholder=""
                  value={student.email}
                  disabled
                  // }
                />
              </div>
              <div>
                <input
                  className="bg-gray-200 w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={student.username}
                  onChange={(e) =>
                    setStudent({ ...student, username: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="relative w-16 group">
                  <img
                    src={
                      student.avatar === ""
                        ? "https://www.thepitttowndentist.com.au/wp-content/uploads/2018/08/default-avatar-768x768.jpg"
                        : student.avatar
                    }
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
                  placeholder="Phone Number"
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
