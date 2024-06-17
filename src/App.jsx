import { Routes, Route } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import { Authorized } from "./views/Authorized.jsx";

export const App = () => {
    return (
    <Routes>
      <Route path="/login" element={<>TO DO</>}/>
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