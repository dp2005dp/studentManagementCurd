import {useState , useEffect} from 'react'
import './index.css'

const ViewStudents = () => {
   
  const [category , setCategory] = useState('all')
  const [studentsData , setStudentsData] = useState([])
  const [lastPage , setLastPage] = useState(5)
  const [pagenation , setPagenation] = useState()
  const onSelect = (e) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
     const featchStudents = async () => {
         const options = {
           method : 'GET',   
        }

         const response = await fetch(`http://localhost:5000/get-students?category=${category}` , options)
         const data = await response.json()
         setPagenation(Math.ceil(data.students.length / 5))
         if (response.ok === true) {
            const startIndex = lastPage - 5
            setStudentsData(data.students.slice(startIndex, lastPage))
         }
         else {
            alert(data.message)
         }
         console.log(data)
     }
      featchStudents()
      console.log(category)
  } , [category , lastPage])

  const updateData = (lastIndex) => {
       setLastPage(lastIndex)
  }
      
  
  return (
     
       <div className='view-container'>
             <h1 className='main-heading'>View Students</h1>
         <div >
               
               
                <div className='flex-container'>
                  <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='logo' alt="logo"/>
                   
                   <select className='select-box' onChange={onSelect}>
                    <option value="all">All Students</option>
                    <option value="top">Top Students</option>
                    <option value="low">Low Students</option>
                    <option value="average">Average Students</option>
                    </select>
                    </div>
                 
                   </div>
               
               
               
               
                 
                 
                     {
                       studentsData.length === 0 ? (
                         <>
                          <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1767012066/21302564_40ig_i46o_210716_orco2x.jpg" alt="not-found" className='no-students-image'/>
                          <p className='no-students'>No Students Found</p>
                          </>
                       ) : (
                              <>
                                 <div className='get-students-name-container'>
                                  <p className='get-students-name roll-and-mark'>Register Num</p>
                                  <p className='get-students-name name-and-location'>Name</p>
                                  <p className='get-students-name roll-and-mark'>Mark</p>
                                  <p className='get-students-name name-and-location'>Location</p>
                                </div>
                               <ul className='ul'>
                                 {
                                  studentsData.map(eachSTudent => (
                                <li className='list '>
                                    <p className='data roll-and-mark'>{eachSTudent.register_num}</p>
                                    <p className='data name-and-location'>{eachSTudent.stu_name}</p>
                                    <p className='data roll-and-mark'>{eachSTudent.stu_mark}</p>
                                    <p className='data name-and-location'>{eachSTudent.stu_location}</p>
                                 </li>
                                    ))
                                  }
                              </ul>
                            

                              <div className='pagenation-container'>
                              
                                 {
                                  [...Array(pagenation)].map((__,index) => (
                                      <button className='pagenation-button' key={index} type='button' onClick={ () => updateData((index + 1) * 5)}>{index + 1}</button>
                                  ))} 
                                
                                 
                              </div>


                                </>
                       )
                     }
                   
                   
                   
                   
                   
             
            

    

       </div>

       
)
}


export default ViewStudents;