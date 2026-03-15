import {Link} from 'react-router-dom'
import './index.css'
import 'animate.css';


const Home = () => (
    <>
   <div className="home-container">
    <h1 className='main-heading'>Student Management System</h1>
    
    <div className='logo-container'>
         
       <img src="https://res.cloudinary.com/dwx8hebfs/image/upload/v1766764337/9396678_4163433_irg1eh.jpg" className='logo' alt="logo"/>

    </div>

  
     
     <div className="home-flex-container">
        
        <Link to="/add-student" className="link">
        <button type="button" className="navegative-button">Add Student</button>
        </Link>

       <Link to="/update-student" className="link">
        <button type="button" className="navegative-button">Update Student</button>
        </Link>
        
        <Link to="/delete-student" className="link">
        <button type="button" className="navegative-button">Delete Student</button>
        </Link>

        <Link to="/view-students" className="link">
        <button type="button" className="navegative-button">View Students</button>
         </Link>
     
     </div>
     
     </div>

     </>
)

export default Home;