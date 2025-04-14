import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Setup from "./Setup";
import InterviewRoom from "./InterviewRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
      </Routes>
    </Router>
  );
}

export default App;