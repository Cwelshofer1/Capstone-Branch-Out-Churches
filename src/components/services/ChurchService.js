export const getAllChurches = () => {
    return fetch("http://localhost:8088/churches").then((res) => res.json())
}