import {useState} from 'react'
import './index.css'

const UpdateStudent = () => {
  const [registernum , setRegisternum] = useState('')
  const [stuname , setStuname] = useState('')
  const [stumark , setStumark] = useState(0)
  const [stulocation , setStulocation] = useState('')
  const [isNameUpdated , setIsNameUpdated] = useState(false)
  const[isMarkUpdated , setIsMarkUpdated] = useState(false)
  const[isLocationUpdated , setIsLocationUpdated] = useState(false)
  const [isSubmitted , setIsSubmitted] = useState(false)

  const [toggleName , setToggleName] = useState(false)
  const [toggleMark , setToggleMark] = useState(false)
  const [toggleLocation , setToggleLocation] = useState(false)
  

  
    const onSubmit = () => {
     
    if(isNameUpdated === false && isMarkUpdated === false && isLocationUpdated === false){
        alert('Please select atleast one field to update')
        return
     }
    setToggleName(isNameUpdated)
    setToggleMark(isMarkUpdated)
    setToggleLocation(isLocationUpdated)

    setIsSubmitted(true)
}
  
 
const registerNumber =(e) => {
    setRegisternum(e.target.value)
}


const onName = () => {
    setIsNameUpdated((prestate) => !prestate)
    }

const onMark = () => {
    setIsMarkUpdated((prestate) => !prestate)
    }

    const onLocation = () => {
        setIsLocationUpdated((prestate) => !prestate)
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

  const registerForn = async  (e) => {
       e.preventDefault()
       
       
       const studentData = {
          register_num: registernum,
          stu_name: stuname,
          stu_mark: stumark,
          stu_location: stulocation
       }
         
      

         
        const options = {
          method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
          body: JSON.stringify(studentData)     
         }

         const response = await fetch(`http://localhost:5000/update-student/${registernum}`, options)
         const data = await response.json()
        
        console.log(studentData.stu_mark)
         
      alert(data.message)
      setIsSubmitted(false)
      setStuname('')
      setStumark('')
      setStulocation('')
      setIsNameUpdated(false)
      setIsMarkUpdated(false)
      setIsLocationUpdated(false)
  }
  
  return (
     <>
      <h1 className='main-heading'>Update Student</h1>
      
         <div className='main-flex-container'>   
        
        <div className='flex-container'>

                    <input type="checkbox" id="up_name" className='checkbox' onChange={onName} checked={isNameUpdated}/>
                    <label htmlFor="up_name" className='content'> 
                          Name
                    </label>
    
         </div>

         <div className='flex-container'>
              <input type="checkbox" id="up_mark"  className='checkbox' onChange={onMark} checked={isMarkUpdated}/>
                    <label htmlFor="up_mark" className='content'>
                          Mark
                    </label>
                      
                  
         </div>

         <div className='flex-container'>
             <input type="checkbox" id="up_location"  className='checkbox' onChange={onLocation} checked={isLocationUpdated}/>
                    <label htmlFor="up_location" className='content'>
                         Location
                    </label>
                      
                   

         </div>
                 <button type="button" className='submit-button' onClick={onSubmit}>Submit</button>
         </div> 
       <div className='update-container'>

        
        
         <div >
               {
                 isSubmitted && (
                          <form onSubmit={registerForn} className='form-container'>
                  <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='img' alt="logo"/>
                 
                 <div className='div'>
                    <label htmlFor="register_num" className='content'>
                          Register Number
                    </label>
                        <br />
                    <input type="text" id="register_num"  className='input-box' placeholder="Enter student register number" onChange={registerNumber} value={registernum}/>

                  </div>
                 
                 
                 {
                     toggleName && (
                                      <div className='div'>
                    <label htmlFor="stu_name" className='content'>
                          Name
                    </label>
                        <br />
                    <input type="text" id="stu_name"  className='input-box' placeholder="Enter student name" onChange={stuName} value={stuname}/>

                  </div>

                     )
                 }
                  
                   
                   {
                     toggleMark && (

                                      <div className='div'>
                    <label htmlFor="stu_mark" className='content'>
                          Mark
                    </label>
                         <br />
                    <input type="text" id="stu_mark" className='input-box' placeholder="Enter student Mark" onChange={stuMark} value={stumark}/>
                  </div>
                     )
                   }

                 

                   
                   {
                     toggleLocation && (

                    <div className='div'>
                    <label htmlFor="stu_location" className='content'>
                          Location
                    </label>
                         <br />
                    <input type="text" id="stu_location" className='input-box' placeholder="Enter student location" onChange={stuLocation} value={stulocation}/>                    
                  </div>
                     )
                   }
                 
                  
                 
                         <button type="submit" className='update-button'>Update</button>
                     
                  
                 
               </form>
                 )
               }
             

         </div>

       </div>

       </>
)
}


export default UpdateStudent;