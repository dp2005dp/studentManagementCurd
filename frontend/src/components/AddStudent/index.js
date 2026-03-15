import {useState} from 'react'
import './index.css'

const AddStudent = () => {
   
  const [stuname , setStuname] = useState('')
  const [stumark , setStumark] = useState('')
  const [stulocation , setStulocation] = useState('')
  const [registernum , setRegisternum] = useState('')

 const registerNumber = (e) => {
   setRegisternum(e.target.value)
 }

 const stuName = (e) => {
   setStuname(e.target.value)
 }

 const stuMark = (e) => {
   setStumark(e.target.value)
 }

 const stuLocation = (e) => {
   setStulocation(e.target.value)
 }

  const registerForn = async (e) => {
       e.preventDefault()
       
       
       const studentData = {
          register_num: registernum,
          stu_name: stuname,
          stu_mark: stumark,
          stu_location: stulocation
       }
        

         
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(studentData)     
        }

        const response = await fetch('http://localhost:5000/students', options)
        const data = await response.json()
        alert(data.message)
        console.log(data)
       
        setRegisternum('')
        setStuname('')
        setStumark('')
        setStulocation('')

  }
  
  return (
     <>
      <h1 className='main-heading'>Add Student</h1>
       <div className='app-container'>
             
        

         
         <div >
               
               <form onSubmit={registerForn} className='form-container'>
                  <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='img' alt="logo"/>
                 
                 
                 <div className='div'>
                    <label htmlFor="register_num" className='content'>
                          Register Number
                    </label>
                        <br />
                    <input type="text" id="register_num"  className='input-box' placeholder="Enter student register number" onChange={registerNumber} value={registernum}/>

                  </div>

                 
                  <div className='div'>
                    <label htmlFor="stu_name" className='content'>
                          Name
                    </label>
                        <br />
                    <input type="text" id="stu_name"  className='input-box' placeholder="Enter student name" onChange={stuName} value={stuname}/>

                  </div>


                  <div className='div'>
                    <label htmlFor="stu_mark" className='content'>
                          Mark
                    </label>
                         <br />
                    <input type="text" id="stu_mark" className='input-box' placeholder="Enter student Mark" onChange={stuMark} value={stumark}/>
                  </div>

                  
                  <div className='div'>
                    <label htmlFor="stu_location" className='content'>
                          Location
                    </label>
                         <br />
                    <input type="text" id="stu_location" className='input-box' placeholder="Enter student location" onChange={stuLocation} value={stulocation}/>

                    
                    
                  </div>

                  <button type="submit" className='submit-button'>Submit</button>
               </form>

         </div>

       </div>

       </>
)
}


export default AddStudent;