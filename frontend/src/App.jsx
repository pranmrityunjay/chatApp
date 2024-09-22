import './App.css'
// eslint-disable-next-line no-unused-vars
import { Login } from './pages/Login.jsx'
// import {SignUp} from './pages/Signup.jsx'
import Homepage from './pages/Homepage.jsx'
export const App =  ()=> {

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        {/* <Login/> */}
        {/* <SignUp/> */}
        <Homepage/>
      </div>
    </>
  )
}

export default App
