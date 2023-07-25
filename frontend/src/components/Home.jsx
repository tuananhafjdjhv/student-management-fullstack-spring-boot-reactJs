import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [listCourse, setListCourse] = useState([]);
  const fetchData = () => {
    const response = axios
      .get("http://localhost:8080/v1/api/course/show-all")
      .then((res) => {
        console.log(res.data);
        setListCourse(res.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="justify-between">
        <div className="ml-20 w-auto h-10">
          <ul className="flex gap-9 ">
            <a href="">
              {" "}
              <li>Trang chủ</li>
            </a>
            <a href="">
              {" "}
              <li>Giới thiệu</li>
            </a>
            <a href="">
              {" "}
              <li>Khóa học</li>
            </a>
            <a href="">
              {" "}
              <li>Lịch khai giảng</li>
            </a>
            <a href="">
              {" "}
              <li>Tin tức</li>
            </a>
            <a href="">
              {" "}
              <li>Test tư duy</li>{" "}
            </a>
            <a href="">
              {" "}
              <li>Tuyển dụng</li>
            </a>
            <a href="">
              {" "}
              <li>Tư vấn miễn phí</li>
            </a>
          </ul>
        </div>
        <div className="">
          <div className="">
            <img
              src="https://rikkei.edu.vn/wp-content/uploads/2022/11/ava-website-1-01-2-min-scaled.jpg"
              alt="logo"
            />
          </div>
          <div className=" flex mt-4 ml-4  grid-cols-3 gap-[10%] rounded-full cursor-pointer m-10 w-auto h-auto">
            <div className="bg-[rgb(207,46,46)] w-[30%] rounded-xl border-2 transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-3xl text-left mt-[5%] m-2">
                Dành cho người mới bắt đầu
              </h1>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl "
              >
                {" "}
                <span className="text-sm px-2 py-2">
                  Khoá lập trình fullstack
                </span>
              </a>
            </div>
            <div className="w-[30%] bg-[rgb(207,46,46)] rounded-xl border-2 transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-left mt-[5%] text-3xl m-2">
                Dành cho người đã có nền tảng
              </h1>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl"
              >
                {" "}
                <span className="text-sm px-1 py-1 ">
                  Khóa lập trình công nghệ cao
                </span>
              </a>
            </div>
            <div className="w-[30%] bg-[rgb(207,46,46)] rounded-xl transform hover:translate-y-[-15%] duration-300 transition-all">
              <h1 className="text-white text-left mt-[5%] text-3xl m-2">
                Dành cho người muốn đi Nhật Bản
              </h1>
              <div></div>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl text-sm"
              >
                <span className="text-sm px-2 py-1">
                  Khóa lập trình viên Nhật Bản
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <h1 className="text-4xl text-red-400">
              Điều ấn tượng chỉ có tại Rikkei Academy{" "}
            </h1>
            <h3 className="text-2xl mt-10 ">
              Giàu kinh nghiệm, giỏi chuyên môn và tận tâm
            </h3>
          </div>
        </div>
        <div className="fixed top-1 right-5 mt-96">
          <a href="">
            <img
              className="mt-4 border border-transparent transition-transform transform-gpu hover:scale-110 hover:border-black rounded-[50%] border-5"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-zalo.svg"
              alt="zalo"
            />
          </a>
          <a href="">
            <img
              className="mt-2 transform hover:translate-y-[-35%] duration-300 transition-all"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-call.svg"
              alt="phone"
            />
          </a>
        </div>
        <div>
          <img
            className="mt-10 "
            src="https://rikkei.edu.vn/wp-content/uploads/2022/12/Thiet-ke-chua-co-ten.png"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-4xl text-red-400 mt-[5%] ">
            Các khóa học dành cho bạn{" "}
          </h1>
          <div className="grid grid-cols-3 mt-[5%] gap-[4%] ">
            {
              listCourse.map((course,index)=>
                <div className="" key={index}>
              <div className="text-start bg-red-100 rounded-xl transform hover:translate-y-[-15%] duration-300 transition-all">
                <img
                  className="rounded-t-xl "
                  src={course.image}
                  alt=""
                />
                <h3 className="ml-[3%] text-2xl text-red-600 block-ellipsis-course-name">
                  {course.courseName}
                </h3>
                <p className="ml-[3%] block-ellipsis">Mô tả: {course.description}</p>
                <a
                  href=""
                  className="bg-red-400 rounded-l ml-[3%] mt-[3%] text-2xl py-1 px-2 text-white"
                >
                  Đăng kí
                </a>
              </div>
            </div>
              )
            }
          </div>
        </div>
      </div>
      <div className="mt-[10%]">
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
