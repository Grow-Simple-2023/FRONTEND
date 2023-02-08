import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./Pages/AdminTabs/Orders";
import OverView from "./Pages/AdminTabs/OverView";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import Login from "./Pages/AuthStack/Login";
import Signup from "./Pages/AuthStack/Signup";
import Rider from "./Pages/RiderStack";

function App() {
  let location = useLocation();
  console.log(location);
  const jwt = localStorage.getItem("@jwtauth");
  return (
    <div className="App">
      {(location.pathname === "/orders" ||
        location.pathname === "/overview") && <Header />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={jwt ? "/overview" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/overview" element={<OverView />} />
        <Route path="/rider" element={<Rider />} />
      </Routes>
    </div>
  );
}

export default App;
