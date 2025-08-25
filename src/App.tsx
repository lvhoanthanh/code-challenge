import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Problem2 from "./problem2";
import Problem3 from "./problem3";
import "./App.css";

const App = () => {
  return (
    <Router>
      <nav>
        <NavLink
          to="/problem2"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Problem 2
        </NavLink>
        {" | "}
        <NavLink
          to="/problem3"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Problem 3
        </NavLink>
      </nav>

      <Routes>
        <Route path="/problem2" element={<Problem2 />} />
        <Route path="/problem3" element={<Problem3 />} />
      </Routes>
    </Router>
  );
};

export default App;