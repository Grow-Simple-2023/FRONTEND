import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./Pages/AdminTabs/Orders";
import OverView from "./Pages/AdminTabs/OverView";
import Header from "./components/Header";
import Form from "./components/Form";
import { useLocation } from "react-router-dom";
import Login from "./Pages/AuthStack/Login";
import Signup from "./Pages/AuthStack/Signup";
import Index from "./Pages/RiderStack/Index";

function App() {
  let location = useLocation();
  console.log(location);
  return (
    <div className="App">
      {(location.pathname === "/orders" ||
        location.pathname === "/overview") && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/overview" element={<OverView />} />
      </Routes>
    </div>
  );
}

export default App;
