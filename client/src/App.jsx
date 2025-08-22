import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from "./pages/myProfile";
import Feed from "./pages/feed";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
