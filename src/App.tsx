import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Problem2 from "./problem2";
import Problem3 from "./problem3";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/problem2">Problem 2</Link> |{" "}
        <Link to="/problem3">Problem 3</Link>
      </nav>

      <Routes>
        <Route path="/problem2" element={<Problem2 />} />
        <Route path="/problem3" element={<Problem3 />} />
      </Routes>
    </Router>
  );
};

export default App;