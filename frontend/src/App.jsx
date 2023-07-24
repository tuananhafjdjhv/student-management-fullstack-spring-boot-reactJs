
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
import Login from './components/Login'
import Signup from './components/Signup'
import Course from './components/Course'
import Profile from './components/Profile'
import UpdateUser from './components/UpdateUser'
import Chat from './components/chat/Chat'
import Home from './components/Home'


function App() {


  return (
    <>
    <Routes >
        <Route  Component={Admin} path='/admin'></Route>
      <Route index Component={Login} path='/'></Route>
      <Route  Component={Signup} path='/signup'></Route>
      <Route  Component={Course} path='/course'></Route>
      <Route  Component={Profile} path='/profile/:id'></Route>
      <Route  Component={UpdateUser} path='/edit-profile/:id'></Route>
      <Route  Component={Chat} path='/chat/:id'></Route>
      <Route index  Component={Home} path='/home'></Route>
      
      
    </Routes>
    
    </>
  )
}

export default App
