import { Box } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import TaskContext from "../features/tasks/TaskContext";
import Metronome from "./Metronome";
import Chip from "@mui/material/Chip";
import Timer from "./Timer";

function PerformTask({ id }) {
    const { tasks, setTasks } = useContext(TaskContext);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        console.log(id);
        console.log(tasks);
        if (id) {
            setCurrentTask(tasks.find((task) => task._id == id)); // === doesn't work convert id to string
        }
        console.log(currentTask);
    }, [tasks, id]);

    return (
        <>
            {currentTask ? (
                <Box>
                    <Box className="flex flex-col justify-center items-center mt-5">
                        <h2 className="text-white text-center text-6xl">
                            {currentTask.title}
                        </h2>
                        <Chip
                            label={currentTask.difficulty}
                            sx={{
                                backgroundColor: `${
                                    currentTask.difficulty === "easy"
                                        ? "#4caf50"
                                        : currentTask.difficulty === "medium"
                                        ? "#ff9800"
                                        : "#f44336"
                                }`,
                                color: "white",
                                fontSize: "1.2rem",
                                py: "0.5rem",
                                px: "1rem",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Timer task={currentTask} setTask={setCurrentTask} />
                        <Metronome />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        padding: "10px",
                    }}
                >
                    <h1 className="text-3xl font-medium text-white">
                        Please select a task to practise
                    </h1>
                </Box>
            )}
        </>
    );
}

export default PerformTask;
