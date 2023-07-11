
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
import CreateStudent from './components/CreateStudent'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

function App() {

  return (
    <>
    <Routes >
      <Route  Component={Admin} path='/admin'></Route>
      <Route  Component={CreateStudent} path='/create-student'></Route>
      <Route index Component={Login} path='/'></Route>
      <Route  Component={Signup} path='/signup'></Route>
      <Route  Component={Home} path='/home'></Route>
    </Routes>
    
    </>
  )
}

export default App
