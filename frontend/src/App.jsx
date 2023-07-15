
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Course from './components/Course'
import Profile from './components/Profile'


function App() {

  return (
    <>
    <Routes >
      <Route  Component={Admin} path='/admin'></Route>
      <Route index Component={Login} path='/'></Route>
      <Route  Component={Signup} path='/signup'></Route>
      <Route  Component={Home} path='/home'></Route>
      <Route  Component={Course} path='/course'></Route>
      <Route  Component={Profile} path='/profile'></Route>
    </Routes>
    
    </>
  )
}

export default App
