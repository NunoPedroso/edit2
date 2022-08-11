
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {NavLink} from "react-router-dom";
import Home from "./pages/Home";


import './index.css'

import About from "./pages/About";


export default function App() {

    return (
        <div className="App">
        <Router>
            <header className="navBar">
                <NavLink className="navBarLink" to="/">Home</NavLink>
                <NavLink className="navBarLink" to="/about">About</NavLink>
            </header>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
        </Router>

        </div>
    );
}

