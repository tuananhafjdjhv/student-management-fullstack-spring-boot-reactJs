import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";

const Course = () => {
  const [listCourse, setListCourse] = useState([]);
  const fetchData = () => {
    const response = axios
      .get("http://localhost:8080/v1/api/course/show-all")
      .then((res) =>{
        console.log(res.data);
        setListCourse(res.data)});
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleDeleteCourse = (id) =>{
    const res = axios.delete(`http://localhost:8080/v1/api/course/delete/${id}`)
  }
  return (
    <div className="h-screen">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-grow p-4">
        <Navbar></Navbar>
        <div className="bg-white p-8 flex flex-col gap-5">
          <div className="flex ml-2">
            <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Add Course
            </button>
            <h1 className="ml-96 text-2xl font-bold mb-4 text-blue-400">
              Course List
            </h1>
          </div>

          <table className="min-w-full bg-blue-100 ">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Coourse Name</th>
                <th className="text-center">Course Id</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-align-center">
              {listCourse.map((course, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{course.courseName}</td>
                  <td className="text-center">{course.courseId}</td>

                  <td className="text-center">
                    <button
                      // onClick={() => handleEdit(cu.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                          clipRule="evenodd"
                        />
                        <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                        <path
                          fillRule="evenodd"
                          d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.courseId)}
                      className="bg-red-400 hover:bg-red-500 text-white font-bold py-0 px-2 rounded mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {/* Add more course rows */}
            </tbody>
          </table>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Course;
