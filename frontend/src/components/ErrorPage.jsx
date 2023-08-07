
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <NavLink
        to={"/login"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Quay lại đăng nhập
      </NavLink>
      <img
        style={{ width: 1400, height: 500 }}
        src="https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design.jpg"
      ></img>
    </>
  );
};

export default ErrorPage;
