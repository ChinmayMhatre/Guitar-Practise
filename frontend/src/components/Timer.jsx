// Timer.js

import React from "react";
import { useState, useEffect } from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import ConfettiGenerator from "confetti-js";
import TaskCompleteModal from "./TaskCompleteModal";
import practiseService from "../features/practise/practiseService";


const Timer = ({ task , setTask}) => {
    const [time, setTime] = useState({ s: 0, m: task.duration });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    // Not started = 0
    // started = 1
    // stopped = 2

    const start = () => {
        console.log("start");
        run();
        setStatus(1);
        setInterv(setInterval(run, 1000));
    };

    useEffect(() => {
        reset();
        setTime({ s: 0, m: task.duration });
        console.log("effect");
    }, [task.duration]);

    var updatedS = time.s,
        updatedM = time.m;

    const run = async () => {
        
        if(updatedM > 0 ){
            if (updatedS === 0) {
                updatedM--;
                updatedS = 59;
            } else {
                updatedS--;
            }
            return setTime({ m: updatedM, s: updatedS });
        }else if(updatedM === 0){
            if(updatedS === 0){
                clearInterval(interv);
                setStatus(0);
                setOpen(true);
                updatedM = -1
                updatedS = -1
                
                return null
            }else{
                updatedS--;
                return setTime({ m: updatedM, s: updatedS });
            }
        }
        return null
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ s: 0, m: task.duration });
    };

    const resume = () => start();

    return (
        <>
            <div className="clock-holder">
                <div className="stopwatch">
                    <DisplayComponent time={time} />
                    <BtnComponent
                        status={status}
                        resume={resume}
                        reset={reset}
                        stop={stop}
                        start={start}
                    />
                </div>
            </div>
            <TaskCompleteModal open={open} handleClose={handleClose} setTask={setTask} duration = {task.duration} />
        </>
    );
};

export default Timer;
