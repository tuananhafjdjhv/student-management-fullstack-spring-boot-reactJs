import { Modal } from "antd";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import React from "react";
import { v4 } from "uuid";
import { storage } from "../firebase/firebaseConfig";

const UpdateCourse = ({
  isOpen,
  onClose,
  courseData,
  onInputChange,
  currentCourse,
  fetchData,
}) => {
  if (!isOpen) return null;

  const [inputValueCourse, setInputValueCourse] = useState({
    courseName: "",
    description: "",
    image: "",
  });

  const uploadImage = (e) => {
    let previewImg = e.target.files[0];
    if (previewImg == null) return;
    const imageRef = ref(storage, `uploadImage/${uploadImage.name}${v4()}`);
    uploadBytes(imageRef, previewImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setInputValueCourse({ ...inputValueCourse, image: url });
        console.log("image url ", url);
      });
    });
  };

  const handleSubmit = async () => {
    try {
      const course = {
        courseId: currentCourse.courseId,
        courseName: courseData.courseName,
        description: courseData.description,
        image: inputValueCourse.image,
      };
      if (inputValueCourse.image === "") {
        course.image = courseData.image;
      }
      setInputValueCourse({ ...inputValueCourse, value: course });
      const response = await axios.put(
        `http://localhost:8080/v1/api/course/updateCourse`,
        course
      );

      if (response.status === 200) {
        const res = await fetchData();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div>
              {/* <p className="text-red-400">{error}</p> */}
              <div className="relative p-6 flex-auto">
                <label className="font-bold text-left">Name Course : </label>

                <input
                  name="courseName"
                  type="text"
                  className="w-1"
                  value={courseData.courseName}
                  onChange={onInputChange}
                />
                <label className="text-left font-bold">
                  Description Course :
                </label>
                <textarea
                  value={courseData.description}
                  onChange={onInputChange}
                  type="text"
                  name="description"
                  className="w-full h-40 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
                />
                <div className="flex mb-3 ">
                  <div className="ml-[35%] ">
                    <img
                      className="w-[30%]"
                      src={
                        inputValueCourse.image !== ""
                          ? inputValueCourse.image
                          : courseData.image
                      }
                      alt=""
                    />
                  </div>
                </div>

                <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                  <div
                    className="file_upload p-5 relative  border-dotted "
                    style={{ width: 150 }}
                  >
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          multiple=""
                          name="image"
                          onChange={uploadImage}
                        />
                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                          Upload photo
                        </div>
                      </label>
                    </div>
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
                  onClick={handleSubmit}
                >
                  Save Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateCourse;
