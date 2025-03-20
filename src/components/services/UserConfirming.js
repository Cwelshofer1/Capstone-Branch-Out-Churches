export const getAllUserConfirmingEvents = () => {
    return fetch("http://localhost:8088/userConfirmingEvent").then((res) => res.json())
}

export const createUserattendingEvent = (userAttending) => {
    return fetch(`http://localhost:8088/userConfirmingEvent/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAttending),
    })
}

export const deleteUserAttending = (id) => {
    return fetch(`http://localhost:8088/userConfirmingEvent/${id}`, {
        method:"DELETE",
    })

}
export const getAllUserConfirmingEventsById = (eventId) => {
    return fetch(`http://localhost:8088/userConfirmingEvent/${eventId}`).then((res) => res.json())
    
}