import React, { useContext, useEffect, useState, useRef } from "react";
import TaskContext from "../features/tasks/TaskContext";
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
import ConfettiGenerator from "confetti-js";
import practiseService from "../features/practise/practiseService";

import taskService from "../features/tasks/taskService";
import { toast } from "react-toastify";




function TaskCompleteModal({ open, handleClose, setTask, duration }) {
    useEffect(() => {
        if (open) {
        add();
        const confettiSettings = { target: "my-canvas" };
        const confetti = new ConfettiGenerator(confettiSettings);
        console.log("here");
        confetti.render();
        setTimeout(() => {
            confetti.clear();
        }, 1000);
        }
        
    }, [open]);

    const add = async ()=>{
        try {
            const result = await practiseService.addPractise(duration);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const close = () => {
        setTask(null);
        handleClose();
    };

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

    return (
        <>
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
                        <Button
                            variant="contained"
                            color="success"
                            onClick={close}
                        >
                            Task Completed
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {open ? (
                <canvas
                id="my-canvas"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                }}
            ></canvas>) : null}
                
            
        </>
    );
}

export default TaskCompleteModal;
