import React, { useState, useEffect,useContext } from "react";
import userContext from "../features/auth/userContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import authService from "../features/auth/authService";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user,setUser} = useContext(userContext);
    

    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        if (lsUser) {
            const current = {
                name: lsUser.name,
                email: lsUser.email,
            };
            setUser(current);
            navigate("/dashboard");
        }else{
            setUser(null);
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if( email==="" || password==="" ){
            toast.error("Please fill all the fields");
            return;
        }
        const userData = {
            email,
            password,
        }
        const result = await authService.login(userData)
        if(result.name == "AxiosError"){
            toast.error("Internal Server Error");
            return;
        }else{
            toast.success("Registration Successful");
            const user = {
                name: result.name,
                email: result.email,
                token: result.token,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUser({name:user.name,email:user.email});
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        }


    };

    return (
        <div>
            <div className="heading">
                <h1>Login</h1>
            </div>

            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
