export const getAllEvents = () => {
    return fetch("http://localhost:8088/events/?_expand=church&_expand=user&_embed=userConfirmingEvent").then((res) => res.json())
}

export const getAllEventsById = (id) => {
    return fetch(`http://localhost:8088/events?id=${id}&_expand=church&_expand=user&_embed=userConfirmingEvent`).then((res) => res.json())
    
}
export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method:"DELETE",
    })

}
export const updateEvent = (event) => {
    return fetch(`http://localhost:8088/events/${event.id}` , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(event),
    })
}
export const createEvent = (event, currentUser) => {
    return fetch(`http://localhost:8088/events/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event, currentUser),
    })
}