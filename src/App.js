import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VolumePage from "./pages/VolumePage";
import BillPage from "./pages/BillPage";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from "./constants/role";
import { getUsersByAdmin } from "./apis/auth.api";
import { useEffect } from "react";
import { getListUsers } from "./redux/role.slice";
import HomePage from "./pages/HomePage";


function App() {

  const currentRole = useSelector(state => state.auth.login.role);
  const token = useSelector(state => state.auth.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole !== null && currentRole === ROLE.ADMIN) {
      console.log(token);
      getUsersByAdmin(token)
        .then(res => {
          dispatch(getListUsers(res.data.users))
        })
        .catch(err => console.log(err));
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/volume" element={<VolumePage />} />
          <Route path="/bill" element={<BillPage />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
