import { useState } from "react";
import Login from "./components/Login"
import UpdateStudent  from "./components/UpdateStudent";
import AddStudent from "./components/AddStudent";
import DeleteStudent from "./components/DeleteStudent";
import Home from "./components/Home";
import ViewStudents from "./components/ViewStudents";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import ProtectApp from "./components/ProtectApp";
import AppContext from "./context/AppContext";

const App = () => {
 
  const [isLogin , setLogin] = useState(false)
   
  const setIsLogin = (value) => {
      setLogin(value);
  }

  return (
  <AppContext.Provider 
     value= {{
        isLogin,
        setIsLogin
     }}
   >
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <ProtectApp  element={<Home />} />} />
      <Route path="/add-student" element={<ProtectApp element={<AddStudent />} />} />
      <Route path="/update-student" element={<ProtectApp element={<UpdateStudent />} />} />
      <Route path="/delete-student" element={<ProtectApp element={<DeleteStudent />} />} />
      <Route path="/view-students" element={<ProtectApp element={<ViewStudents />} />} />
    </Routes>
  </Router>



   </AppContext.Provider>
  )
  
}

export default App;
