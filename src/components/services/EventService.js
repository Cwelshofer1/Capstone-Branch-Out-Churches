export const getAllEvents = () => {
    return fetch("http://localhost:8088/events/?_expand=church").then((res) => res.json())
}