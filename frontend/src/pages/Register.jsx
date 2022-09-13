import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import TextField from "@mui/material/TextField";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
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
                            onChange={(text) => setName(text)}
                            placeholder="Enter Your Name"
                        />
                    </div>
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
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(text) => setConfirmPassword(text)}
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
