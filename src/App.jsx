import { Routes, Route } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import { Authorized } from "./views/Authorized.jsx";
import { Login } from "./auth/Login.jsx";

export const App = () => {
    return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<>TO DO</>}/>
  
      <Route 
        path="*" 
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        } 
      />
    </Routes>
    )
  }