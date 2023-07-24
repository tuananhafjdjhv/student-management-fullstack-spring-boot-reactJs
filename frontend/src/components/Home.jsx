import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
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
            <div className="bg-[rgb(207,46,46)] w-[30%] rounded-xl border-2">
              <h1 className="text-white text-3xl text-left mt-[5%] m-2">
                Dành cho người mới bắt đầu
              </h1>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl "
              >
                {" "}
                <span className="text-sm">Khoá lập trình fullstack</span>
              </a>
            </div>
            <div className="w-[30%] bg-[rgb(207,46,46)] rounded-xl border-2">
              <h1 className="text-white text-left mt-[5%] text-3xl m-2">
                Dành cho người đã có nền tảng
              </h1>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl text-sm"
              >
                {" "}
                Khóa lập trình công nghệ cao
              </a>
            </div>
            <div className="w-[30%] bg-[rgb(207,46,46)] rounded-xl ">
              <h1 className="text-white text-left mt-[5%] text-3xl m-2">
                Dành cho người muốn đi Nhật Bản
              </h1>
              <div></div>
              <a
                href="https://rikkei.edu.vn/khoa-hoc-cho-nguoi-moi-bat-dau/"
                target="_self"
                className=" bg-white -500 rounded-xl text-sm"
              >
                Khóa lập trình viên Nhật Bản
              </a>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <h1 className="text-3xl text-red-400">
              Điều ấn tượng chỉ có tại Rikkei Academy{" "}
            </h1>
            <h3 className="text-3xl mt-10 text-red-400">
              Giàu kinh nghiệm, giỏi chuyên môn và tận tâm
            </h3>
          </div>
        </div>
        <div className="fixed top-0 right-0 mt-96">
          <a href="">
            <img
              className="mt-4"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-zalo.svg"
              alt="zalo"
            />
          </a>
          <a href="">
            <img
              className="mt-2"
              src="https://rikkei.edu.vn/wp-content/themes/hoabinhweb-v3-154-child-theme/image/icon-call.svg"
              alt="phone"
            />
          </a>
        </div>
        <div>
          <img
          className="mt-10"
            src="https://rikkei.edu.vn/wp-content/uploads/2022/12/Thiet-ke-chua-co-ten.png"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-4xl text-red-400 mt-[5%] ">Các khóa học dành cho bạn </h1>
          <div className="grid grid-cols-3 mt-[2%]">
            <div className="text-start bg-red-200 ">
              <img
                src="https://lms-rikkei-prod-2.s3.ap-southeast-1.amazonaws.com/materials/1684976508_jrRrYlyV1s8hn5xR.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV4NLCS5RFIZPBIGI%2F20230724%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230724T173713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Signature=abeaaa4b808602463d191a8f244b34260cec80e392f0e57d4ec5bb0397fec7d9"
                alt=""
              />
              <h3 className="">Java backend developer</h3>
              <p>Mô tả: </p>
              <a href="" className="bg-red-400 rounded-xl">Đăng kí</a>
            </div>
            <div className="text-start">
              <img
                src="https://lms-rikkei-prod-2.s3.ap-southeast-1.amazonaws.com/materials/1684976508_jrRrYlyV1s8hn5xR.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV4NLCS5RFIZPBIGI%2F20230724%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230724T173713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Signature=abeaaa4b808602463d191a8f244b34260cec80e392f0e57d4ec5bb0397fec7d9"
                alt=""
              />
              <h3 className="">React JS Frontend Developer</h3>
              <p>Mô tả: </p>
              <a href="">Đăng kí</a>
            </div>
            <div className="text-start ">
              <img
                src="https://lms-rikkei-prod-2.s3.ap-southeast-1.amazonaws.com/materials/1684976508_jrRrYlyV1s8hn5xR.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAV4NLCS5RFIZPBIGI%2F20230724%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230724T173713Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Signature=abeaaa4b808602463d191a8f244b34260cec80e392f0e57d4ec5bb0397fec7d9"
                alt=""
              />
              <h3 className="text-left">Fullstack lập trình viên</h3>
              <p>Mô tả: </p>
              <a href="" className="rounded-xl bg-red-400">Đăng kí</a>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Home;
