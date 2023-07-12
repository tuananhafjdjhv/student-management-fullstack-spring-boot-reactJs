

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h4 className="text-xl font-bold">Liên hệ</h4>
            <p className="mt-4">Địa chỉ: 123 Đường Phạm Hùng, Thành phố Hà Nội</p>
            <p>Email: info@example.com</p>
            <p>Điện thoại: 0123456789</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h4 className="text-xl font-bold mr-40">Liên kết</h4>
            <ul className="mt-4 flex flex-row">
              <li className="mr-4"><a href="#" className="text-gray-400 hover:text-white">Trang chủ</a></li>
              <li className="mr-4"><a href="#" className="text-gray-400 hover:text-white">Thông tin</a></li>
              <li className="mr-4"><a href="#" className="text-gray-400 hover:text-white">Đăng ký</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Đăng nhập</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
