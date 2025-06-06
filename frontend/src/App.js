import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import UserState from "./context/user/userState";
import PostState from "./context/post/postState";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css"

function App() {
  return (
    <>

      <UserState>
        <PostState>
          <Router>
            <Routes>

              <Route exact path="/auth" element={<Auth />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/" element={<Home />} />

            </Routes>

          </Router>
          </PostState>
      </UserState>

    </>
  );
}

export default App;
