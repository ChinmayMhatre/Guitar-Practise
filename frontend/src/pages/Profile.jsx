import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../features/auth/userContext";
import practiseService from "../features/practise/practiseService";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import BarChart from "../components/BarChart";

function Profile() {
    const { user, setUser } = useContext(userContext);
    // const {userData , setUserData} = useState(null)
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        console.log(lsUser);
        if (!lsUser) {
            navigate("/login");
        } else {
            // if user context already has this ignore.
            const current = {
                name: lsUser.name,
                email: lsUser.email,
            };
            setUser(current);
            getPractiseData();
            console.log("user", userData);
        }
    }, [navigate]);

    const getPractiseData = async () => {
        try {
            const result = await practiseService.getPractise();
            console.log(result);

            setUserData({
                labels: result.map((item) => item.Date.substring(0, item.Date.indexOf("T"))),
                datasets: [
                    {
                        label: "Practise Duration (Minutes)",
                        data: result.map((item) => item.duration),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{ bgcolor: deepPurple[500], height: 100, width: 100 }}
                >
                    OP
                </Avatar>
                {user ? (
                    <>
                        <h1>{user.name}</h1>
                    </>
                ) : null}
            </Box>
            <Box id="graph"
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {userData ? (
                    <div style={{
                        width: "60%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <BarChart userData={userData} />
                    </div>
                ) : null}
            </Box>
        </>
    );
}

export default Profile;
