/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./Routes/PrivateRoute";
import HomePage from "./Routes/HomePage";
import { Login } from "./Routes/Login";
import { SignUp } from "./Routes/SignUp";
import { useAuth } from "./context/auth-context";

// Main App Component
function App() {
  const { loading, isAuth } = useAuth();

  if (loading) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/todo" element={<p>Detail Page</p>}/>
        </Route>
        <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login/>}/>
        <Route path="/signup" element={isAuth? <Navigate to="/" replace /> : <SignUp/>}/>
        <Route path="/*" element={<p>Not Found</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;