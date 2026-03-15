import { useContext } from "react";
import {Navigate} from 'react-router-dom'
import AppContext from "../../context/AppContext";

const ProtectApp = ({element}) => {
     const {isLogin} = useContext(AppContext)
     if (isLogin === false ) {
         return <Navigate to="/login" replace />;
          
     }    
     return element;
    
}

export default ProtectApp;