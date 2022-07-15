import api from "./AxiosConfig";

export async function shortenURL(url) {
    return api.post("/post/shorten", {
        url: url
    })
    .then(response => {
        return response.data;
    }).catch(error => {
        throw error.response.status;
    })
}


export async function getAllShortenedUrls() {
    return api.get("/get/urls")
    .then(response => {
        return response.data;
    }).catch(error => {
        throw error.response.status;
    })
}