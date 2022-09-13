import React, { useState, useEffect } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
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
                            onChange={(text) => setEmail(text)}
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(text) => setPassword(text)}
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
