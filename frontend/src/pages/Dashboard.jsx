import React, { useContext, useEffect, useState, useRef } from "react";
import NewModal from "../components/dashboardList/modals/NewModal";
import userContext from "../features/auth/userContext";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import TaskContext from "../features/tasks/TaskContext";
import axios from "axios";

import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import EditModal from "../components/dashboardList/modals/EditModal";
import PerformTask from "../components/PerformTask";
import { ListItemButton } from "@mui/material";

function Dashboard() {
    const { user, setUser } = useContext(userContext);
    const { tasks, setTasks } = useContext(TaskContext);

    //Modal states
    const [newOpen, setNewOpen] = useState(false);
    const handleNewOpen = () => setNewOpen(true);
    const handleNewClose = () => setNewOpen(false);

    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const [editTask, setEditTask] = useState();
    const [currentTaskId, setcurrentTaskId] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        console.log(lsUser);
        if (!lsUser) {
            navigate("/login");
        } else {
            const current = {
                name: lsUser.name,
                email: lsUser.email,
                avatar: lsUser.avatar
            };
            setUser(current);
        }
    }, [navigate]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await axios.get("/api/tasks/", {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                },
            });
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                },
            });
            console.log(response.data);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div id="dashboard">
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 0 }}
                    
                >
                    <Grid
                        item
                        xs={12}
                        md={12}
                        lg={4}
                        sx={{
                        position: "relative"
                        }}
                        
                    >
                        <Box
                            className="glass-dense"
                            sx={{
                                pr: 2,
                                p: 2,
                                ml: 6,
                                my: 2,
                                height: "85vh",
                            }}
                            
                        >
                            <List dense={false}>
                                {tasks.map((el) => {
                                    return (
                                        <ListItem
                                            secondaryAction={
                                                <>
                                                    <Chip
                                                        label={el.difficulty}
                                                        sx={{
                                                            backgroundColor: `${
                                                                el.difficulty ===
                                                                "easy"
                                                                    ? "#4caf50"
                                                                    : el.difficulty ===
                                                                        "medium"
                                                                    ? "#ff9800"
                                                                    : "#f44336"
                                                            }`,
                                                            color: "white",
                                                        }}
                                                    />
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="edit"
                                                        sx={{ ml: 2 }}
                                                        onClick={() => {
                                                            console.log(el);
                                                            setEditTask(el._id);
                                                            handleEditOpen();
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        sx={{ ml: 2 }}
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            deleteTask(el._id)
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <ListItemButton
                                                onClick={() => {
                                                    setcurrentTaskId(el._id);
                                                    console.log(currentTaskId);
                                                }}
                                            >
                                                <ListItemText
                                                    primary={el.title}
                                                    primaryTypographyProps={{
                                                        fontSize:17,
                                                        fontWeight: 600,
                                                        color: "#308878"
                                                    }}
                                                    secondary={
                                                        el.duration + " Minutes"
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            
                        </Box>
                        <Fab
                                
                                aria-label="add"
                                sx={{
                                    position: "absolute",
                                    bottom: 50,
                                    right: 50,
                                    background: '#2193b0',
                                    color: 'white',
                                }}
                                onClick={handleNewOpen}
                            >
                                <AddIcon />
                            </Fab>
                    </Grid>
                    <Grid item xs={12} md={12} lg={8}>
                        <Box
                            className = "glass"
                            id = "dashboardGrid2"
                            sx={{
                                pr: 2,
                                p: 2,
                                mr: 6,
                                my: 2,
                                height: "85vh",
                            }}
                        >
                            <PerformTask id={currentTaskId} />
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <NewModal open={newOpen} handleClose={handleNewClose} />
            <EditModal
                open={editOpen}
                handleClose={handleEditClose}
                editTask={editTask}
            />
            <div className="circle1"></div>
            <div className="circle2"></div>
        </>
    );
}

export default Dashboard;
