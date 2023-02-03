import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./Pages/AdminTabs/Orders";
import OverView from "./Pages/AdminTabs/OverView";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/overview" element={<OverView />} />
      </Routes>
    </div>
  );
}

export default App;
