// a context file for the practise feature
import React, { createContext, useState } from "react";

const PractiseContext = createContext();

export const PractiseProvider = ({ children }) => {
    const [practise, setPractise] = useState([]);
    return (
        <PractiseContext.Provider value={{practise,setPractise}}  >
            {children}
        </PractiseContext.Provider>
    );
}

export default PractiseContext;