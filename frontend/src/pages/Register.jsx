import React, { useState, useEffect,useContext } from "react";
import userContext from "../features/auth/userContext";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import authService from "../features/auth/authService";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const {
        user,
        setUser
    } = useContext(userContext);

    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        console.log(lsUser);
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

        if(name==="" || email==="" || password==="" || confirmPassword===""){
            toast.error("Please fill all the fields");
            return;
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        if(password.length<6){
            toast.error("Password must be atleast 6 characters long");
            return;
        }
        if(name.length<3){
            toast.error("Name must be atleast 3 characters long");
            return;
        }
            const userData = {
                name,
                email,
                password,
            }
        const result = await authService.register(userData)
        if(result.name == "AxiosError"){
            toast.error("Internal Server Error");
            return;
        }else{
            toast.success("Registration Successful");

            const num = Math.floor(Math.random() * 100 ) + 1
            const avatar = `https://avatars.dicebear.com/api/bottts/${num}.svg`
            const user = {
                name: result.name,
                email: result.email,
                token: result.token,
                avatar
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUser({name:user.name,email:user.email,avatar});
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
        }
        console.log(result);
    };

    return (
        <div>
            <div className="heading">
                <h1>Register</h1>
            </div>

            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                        />
                    </div>
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
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Your Password"
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

export default Register;
