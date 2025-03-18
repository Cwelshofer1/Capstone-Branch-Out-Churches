import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ChurchesList } from "../components/churches/ChurchList";
import { NavBar } from "../components/nav/Navbar";
import { Welcome } from "../components/welcome/Welcome";
import "./ApplicationViews.css"
import { EventsList } from "../components/events/EventsList";

export const ApplicationViews = () => {

    return <>
    
   
   
  
    <Routes>
        <Route path="/" element={
            <>
            <NavBar/>
            <Outlet />
            </>}>
            <Route index element={<Welcome />} />
            <Route path="/all-churches" element={<ChurchesList/>}/>
            <Route path="/all-events" element={<EventsList/>}/>
        </Route>

    </Routes>
    
    </>
}