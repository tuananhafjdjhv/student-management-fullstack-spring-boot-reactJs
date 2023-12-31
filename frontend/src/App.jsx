import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Course from "./components/Course";
import Profile from "./components/Profile";
import UpdateUser from "./components/UpdateUser";
import Chat from "./components/chat/Chat";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import UserData from "./components/UserData";
import ChatRoom from "./components/ChatRoom";
import { UserDetail } from "./components/UserDetail";
import { ClassComponent } from "./components/ClassComponent";
import { LoadingImage } from "./components/LoadingImage";

function App() {
  return (
    <>
      <Routes>
        <Route Component={Admin} path="/admin"></Route>
        <Route Component={Login} path="/login"></Route>
        <Route Component={Signup} path="/signup">
          
        </Route>
        <Route Component={Course} path="/course"></Route>
        <Route Component={Profile} path="/profile/:id"></Route>
        <Route Component={UpdateUser} path="/edit-profile/:id"></Route>
        <Route Component={Chat} path="/chat/:id"></Route>
        <Route Component={ErrorPage} path="/error"></Route>
        <Route Component={UserData} path="/user-data"></Route>
        <Route index Component={Home} path="/"></Route>
        <Route Component={UserDetail} path="/user-detail/:id"></Route>
        <Route Component={ClassComponent} path="/class"></Route>
        <Route Component={ChatRoom} path="/chat"></Route>
        <Route Component={LoadingImage} path="/loading-image"></Route>
      </Routes>
    </>
  );
}

export default App;
