import {useState} from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useContext} from 'react'
import userContext from './auth/userContext'

function PrivateRoutes() {
    const {user,setUser} = useContext(userContext);
    const [auth,setAuth] = useState(false);
    const lsUser = JSON.parse(localStorage.getItem("user"));
    console.log(lsUser);
    if (lsUser){
        const current = {
            name: lsUser.name,
            email: lsUser.email,
        };
        setAuth(true);
        setUser(current);
    }
  return (
    auth ? <Outlet /> : <Navigate to="/login" />
    
  )
}

export default PrivateRoutes