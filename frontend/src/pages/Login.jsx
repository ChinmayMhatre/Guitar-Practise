import React, { useState, useEffect, useContext } from "react";
import userContext from "../features/auth/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../features/auth/authService";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(userContext);

    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        if (lsUser) {
            const current = {
                name: lsUser.name,
                email: lsUser.email,
            };
            setUser(current);
            navigate("/dashboard");
        } else {
            setUser(null);
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            toast.error("Please fill all the fields");
            return;
        }
        const userData = {
            email,
            password,
        };
        const result = await authService.login(userData);
        if (result.name == "AxiosError") {
            toast.error("Internal Server Error");
            return;
        } else {
            toast.success("Registration Successful");
            const num = Math.floor(Math.random() * 100) + 1;
            const avatar = `https://avatars.dicebear.com/api/bottts/${num}.svg`;
            const user = {
                name: result.name,
                email: result.email,
                token: result.token,
                avatar,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUser({ name: user.name, email: user.email, avatar });
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex justify-center mt-36">
            <div className=" bg-gray-200 rounded-2xl w-4/5 md:w-3/5 lg:w-2/5 shadow-lg flex flex-col justify-center p-10 md:py-12 ">
                <div className="">
                    <h1 className="text-center font-extrabold text-gray-700 text-4xl" >Login</h1>
                    <h3 className="text-center font-medium text-xl ">Log in to your account and get started! </h3>
                </div>

                <div className="w-full md:px-14 ">
                    <form onSubmit={onSubmit} className="w-full">
                        <div className="form-group w-full">
                            <input
                                type="email"
                                id="email"
                                className="form-control mt-9 w-full"
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
                        <div className="form-group ">
                            <button type="submit" className="btn w-full bg-gray-500 ">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <Link to="/register">
                    <p className="text-center text-gray-700 mt-4 transition ease-in-out hover:text-cyan-500  hover:transition-all">
                        Don't have an account? Register
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
