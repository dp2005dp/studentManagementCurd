import {useState} from 'react'
import './index.css'

const DeleteStudent = () => {
   
  const [registerNum , setRegisterNum] = useState('')


 const onDeteStudent = (e) => {
   setRegisterNum(e.target.value)
 }

  const registerForn = async (e) => {
       e.preventDefault()
       
       
       const studentData = {
          register_num: registerNum,
       }
        
         const options = {
          method: 'DELETE',
           headers: {
             'Content-Type': 'application/json'
          },
           body: JSON.stringify(studentData)     
         }

         const response = await fetch(`http://localhost:5000/delete-student/${registerNum}`, options)
         const data = await response.json()
         alert(data.message)
        console.log(studentData)

        setRegisterNum('')
     
  }
  
  return (
     <>
      <h1 className='main-heading'>Delete Student</h1>
       <div className='app-container'>
         
         <div >
               
               <form onSubmit={registerForn} className='form-container'>
                  <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='img' alt="logo"/>
                  <div className='div'>
                    <label htmlFor="register_num" className='content'>
                          Student Register Number
                    </label>
                        <br />
                    <input type="text" id="register_num"  className='input-box' placeholder="Enter student register number" onChange={onDeteStudent} value={registerNum}/>

                  </div>
                  <button type="submit" className='submit-button'>Submit</button>
               </form>

         </div>

       </div>

       </>
)
}


export default DeleteStudent;