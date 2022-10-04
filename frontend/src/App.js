import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";


import { UserProvider } from "./features/auth/userContext";
import { TaskProvider } from "./features/tasks/TaskContext";

import { PractiseProvider } from "./features/practise/PractiseContext";

function App() {
    return (
        <>
            <UserProvider>
                <TaskProvider>
                    <PractiseProvider>
                        <Router>
                            <div>
                                <Header />
                                <Routes>
                                    <Route path = "/" element={<Landing />}/>
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/register"
                                        element={<Register />}
                                    />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route
                                        path="/profile"
                                        element={<Profile />}
                                    />
                                </Routes>
                            </div>
                        </Router>
                        <ToastContainer />
                    </PractiseProvider>
                </TaskProvider>
            </UserProvider>
        </>
    );
}

export default App;
