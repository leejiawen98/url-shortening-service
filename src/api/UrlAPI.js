import api from "./AxiosConfig";

export async function shortenURL(url) {
    return api.post("/post/shorten", {
        url: url
    })
    .then(response => {
        if (response.status === 201) {
            return response.data;
        } else if (response.status === 200) {
            return response.data[0].short_url;
        }
        return
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


export async function redirect(shortUrl) {
    return api.post("/post/url", {
        shortUrl: shortUrl
    })
    .then(response => {
        return response.data[0].url;
    }).catch(error => {
        throw error.response.status;
    })
}
