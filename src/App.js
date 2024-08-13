import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed.js';
import PrivateRoute from './Components/PrivateRoute.js';
import ForgetPassword from './Components/ForgetPassword.js';
import Profile from './Components/Profile.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute element={<Feed/>} />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/forgetpassword" element={<ForgetPassword />}></Route>
            <Route exact path="/profile/:id" element={<Profile />}></Route>


          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
