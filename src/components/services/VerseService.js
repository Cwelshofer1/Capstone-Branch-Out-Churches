export const getVerse = () => {
    return fetch("https://bible-api.com/data/web/random").then((res) => res.json())
}