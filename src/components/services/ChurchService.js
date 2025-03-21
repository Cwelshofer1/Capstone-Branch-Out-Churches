export const getAllChurches = () => {
    return fetch("http://localhost:8088/churches").then((res) => res.json())
}

export const getAllChurchesById = (id) => {
    return fetch(`http://localhost:8088/churches?id=${id}`).then((res) => res.json())
}

export const deleteChurch = (churchId) => {
    return fetch(`http://localhost:8088/churches/${churchId}`, {
        method:"DELETE",
    })

}

export const updateChurch = (church) => {
    return fetch(`http://localhost:8088/churches/${church.id}` , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(church),
    })
}

export const createChurch = (church, currentUser) => {
    return fetch(`http://localhost:8088/churches/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(church, currentUser),
    })
}