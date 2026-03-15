import {useState , useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import AppContext from '../../context/AppContext'
import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const {setIsLogin} = useContext(AppContext)
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
 

 const onUsername = (e) => {
   setUsername(e.target.value)
 }

 const onPassword = (e) => {
   setPassword(e.target.value)
 }

  
 const successFullLogin = () => {
      navigate('/')
 }

  const loginForm = async (e) => {
       e.preventDefault()
       
       
       const userDetails = {
          username,
          password,
       }
        

         
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userDetails)     
        }

        const response = await fetch('http://localhost:5000/login', options)
        const data = await response.json()

        if (response.ok === true) {
             setIsLogin(true)
             successFullLogin()
             alert(data.message)
        }
        else {
            alert(data.message)
        }

        setUsername('')
        setPassword('')
  }
  
  return (
     <>
      <h1 className='main-heading'>Student Management System</h1>
       <div className='login-container'>
         
            <div >  
               <form onSubmit={loginForm} className='form-container'>
                  <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='img' alt="logo"/>
                  <div className='div'>
                    <label htmlFor="username" className='content'>
                          Username
                    </label>
                        <br />
                    <input type="text" id="username"  className='input-box' placeholder="Enter username" onChange={onUsername} value={username}/>
                  </div>


                  <div className='div'>
                    <label htmlFor="password" className='content'>
                          Password
                    </label>
                         <br />
                    <input type="password" id="password" className='input-box' placeholder="Enter password" onChange={onPassword} value={password}/>
                  </div>

                  <button type="submit" className='submit-button'>Login</button>
               </form>

         </div>

       </div>

       </>
)
}


export default Login;