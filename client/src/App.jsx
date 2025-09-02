import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import RecordingVideo from "./pages/recordingVideo";
import Login from "./pages/login";
import Register from "./pages/register";
import MyProfile from "./pages/myProfile";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/myfeed" element={<Feed />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/recordingvideo" element={<RecordingVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
