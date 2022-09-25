import React,{useEffect, useState} from "react";

function DisplayComponent({time}) {
    
    return (

        <div>
            <span>
                {time.m >= 10 ? time.m : "0" + time.m}
            </span>
            &nbsp;:&nbsp;
            <span>
                {time.s >= 10 ? time.s : "0" + time.s}
            </span>
        </div>
    );
}

export default DisplayComponent;
