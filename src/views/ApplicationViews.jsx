import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ChurchesList } from "../components/churches/ChurchList";
import { NavBar } from "../components/nav/Navbar";
import { Welcome } from "../components/welcome/Welcome";
import "./ApplicationViews.css"
import { EventsList } from "../components/events/EventsList";
import { EventDetails } from "../components/events/EventsDetails";
import { EditEventForm} from "../components/forms/EditEvent";
import { ChurchDetails } from "../components/churches/ChurchDetails";
import { EditChurchForm } from "../components/forms/EditChurch";
import { NewChurchForm } from "../components/forms/NewChurch";
import { NewEventForm } from "../components/forms/NewEvent";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localCustomer = localStorage.getItem("church_user")
        const customerObject = JSON.parse(localCustomer)
        setCurrentUser(customerObject)
    }, [])

    return <>
    <Routes>
        <Route path="/" element={
            <>
            <NavBar/>
            <Outlet />
            </>}>
            <Route index element={<Welcome />} />
            <Route path="all-churches" element={<ChurchesList/>}/>
            <Route path="new-church" element={<NewChurchForm currentUser={currentUser}/>}/>
            <Route path="all-churches/:id" element={<ChurchDetails currentUser={currentUser}/>}/>
            <Route path="all-churches/edit/:id" element={<EditChurchForm currentUser={currentUser}/>}/>
            <Route path="all-events" element={<EventsList/>}/>
            <Route path="new-event" element={<NewEventForm currentUser={currentUser}/>} />
            <Route path="all-events/:id" element={<EventDetails currentUser={currentUser} />} />
            <Route path="all-events/edit/:id" element={<EditEventForm currentUser={currentUser} />} />
        </Route>

    </Routes>
    
    </>
}