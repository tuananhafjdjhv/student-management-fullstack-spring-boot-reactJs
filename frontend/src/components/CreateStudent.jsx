

const CreateStudent = () => {
  return (
    <>
      <div className="w-96 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Thêm sinh viên</h1>
        <form>
          <div className="mb-4">
           
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              required=""
              placeholder="Tên"
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="studentId"
              name="studentId"
              required=""
              placeholder="Mã sinh viên"
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="email"
              name="email"
              required=""
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              id="age"
              name="age"
              required=""
              placeholder="Tuổi"
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="address"
              name="address"
              required=""
              placeholder="Quê quán"
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="birthdate"
              name="birthdate"
              required=""
              placeholder="Ngày sinh"
            />
          </div>
          <div className="flex justify-center">
          <div className="mt-2">
              <input
                type="password"
                name=""
                id=""
                placeholder="Password"
                className="bg-gray-200 w-full px-4 py-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:bg-white"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateStudent;
