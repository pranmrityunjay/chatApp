import './App.css'
// eslint-disable-next-line no-unused-vars
import { Login } from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Homepage from './pages/Homepage.jsx'
import {Routes, Route} from "react-router-dom"
import { useAuthContext } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
export const App =  ()=> {
  const {authUser} = useAuthContext()
  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path="/" element={authUser ? <Homepage/> : <Navigate to={'/login'}/>}/>
          <Route path="/login" element={authUser ? <Navigate to='/'/> : <Login/>}/>
          <Route path="/signup" element={authUser ? <Navigate to='/'/> : <SignUp/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
