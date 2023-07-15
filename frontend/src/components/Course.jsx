import Footer from "./Footer";
import Navbar from "./Navbar";

const Course = () => {
  return (
    <div className="h-screen">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-grow p-4">
        <Navbar></Navbar>
        <div className="bg-white p-8">
          <h1 className="text-2xl font-bold mb-4">Course List</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left">Course Name</th>
                <th className="text-left">Instructor</th>
                <th className="text-left">Enrollment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">React Fundamentals</td>
                <td className="text-left">John Doe</td>
                <td className="text-left">50</td>
              </tr>
              <tr>
                <td className="text-left">JavaScript Advanced</td>
                <td className="text-left">Jane Smith</td>
                <td className="text-left">30</td>
              </tr>
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
