import React from "react"
import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login.jsx"
import { Register } from "./components/auth/Register.jsx"
import { Authorized } from "./views/Authorized.jsx"
import { ApplicationViews } from "./views/ApplicationViews.jsx"

export const App = () => {
  return (
  <div className="background-img">
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews/>
          </Authorized>
        }>

        </Route>
    </Routes>
</div>
    

  )
}
