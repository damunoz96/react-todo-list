/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Routes/HomePage";
import { Login } from "./Routes/Login";

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/todo" element={<p>Detail Page</p>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<p>Not Found</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;