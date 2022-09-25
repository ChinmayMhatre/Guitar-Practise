import { useContext } from "react";
import userContext from "../features/auth/userContext";
import { Navigate } from "react-router-dom";

function RequireAuth({children}) {
    const { setUser } = useContext(userContext);
    const lsUser = JSON.parse(localStorage.getItem("user"));
    if (lsUser.name && lsUser.email && lsUser.token) {
        setUser({ name: lsUser.name, email: lsUser.email });
        return <Navigate to="/" />;
    }
    return children;
}

function UserPresent({children}){
    const lsUser = JSON.parse(localStorage.getItem("user"));
    if (!lsUser.name || !lsUser.email || !lsUser.token) {
        return <Navigate to="/login" />;
    }
    return children;
}


export {RequireAuth,UserPresent};
