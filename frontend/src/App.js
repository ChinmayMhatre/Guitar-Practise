import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                      <Route path="/" element={<Dashboard/>} />
                      <Route path="/login" element={<Login/>} />
                      <Route path="/register" element={<Register/>} />
                      <Route path="/profile" element={<Profile/>} />
                      <Route path="/landing" element={<Landing/>} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
