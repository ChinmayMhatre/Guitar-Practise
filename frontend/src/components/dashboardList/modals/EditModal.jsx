import React, { useContext, useEffect, useState, useRef } from "react";
import TaskContext from "../../../features/tasks/TaskContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import taskService from "../../../features/tasks/taskService";
import { toast } from "react-toastify";

function EditModal({ open, handleClose, editTask }) {
    const [taskName, setTaskName] = useState("");
    const [taskTime, setTaskTime] = useState();
    const [difficulty, setDifficulty] = useState("");
    const { tasks,setTasks } = useContext(TaskContext);

    const handleChange = (event) => {
        setDifficulty(event.target.value);
        console.log(difficulty);
    }

    useEffect( () => {
        console.log(editTask);
        tasks.map(task => {
            if(task._id === editTask){
                setTaskName(task.title);
                setTaskTime(task.duration);
                setDifficulty(task.difficulty);
            }
        })

    }, [tasks, editTask]);





    // Styles
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = async () => {
        if(taskName.length > 20){
            toast.error("Task name cannot be greater than 20 letters")
            setTaskName("");
            return
        }
        if(taskName.length < 2){
            toast.error("Task name cannot be less than 2 letters")
            setTaskName("");
            return
        }
        if(taskTime < 1){
            toast.error("Duration cannot be less 1 minutes")
            setTaskTime("");
            return
        }
        if(taskTime > 60){
            toast.error("Duration cannot be greater than 60 minutes")
            setTaskTime("");
            return
        }
        if(difficulty === ""){
            toast.error("Please select a difficulty")
            setDifficulty("");
            return
        }

        try {
            const task = {
                title: taskName,
                duration: taskTime,
                difficulty: difficulty,
            };
            const result = await taskService.HandleEditTask(editTask, task);
            setTasks((prev)=> prev.filter((task)=>task._id !== editTask))
            setTasks((prev) => [...prev, result]);
            toast.success("Task Edited successfully", result);
            setTaskName("");
            setTaskTime("");
            setDifficulty("");
            handleClose();
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Enter your new task
                    </Typography>
                    <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                    >
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            minWidth: 120,
                        }}
                    >
                        <FormControl
                            fullWidth
                            sx={{
                                mt: 2,
                                mb: 2,
                            }}
                        >
                            <TextField
                                id="task-name"
                                label="Task Name"
                                variant="outlined"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                        >
                            <TextField
                                id="task-time"
                                type="number"
                                label="Time (Minutes)"
                                variant="outlined"
                                value={taskTime}
                                onChange={(e) => setTaskTime(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Difficulty
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={difficulty}
                                label="Difficulty"
                                onChange={handleChange}
                            >
                                <MenuItem value={"easy"}>Easy</MenuItem>
                                <MenuItem value={"medium"}>Medium</MenuItem>
                                <MenuItem value={"hard"}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                        >
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditModal;
