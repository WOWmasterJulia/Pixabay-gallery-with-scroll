import axios from "axios";

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35792942-c738c06de8752e63923c1b94a';
    #query = '';

    // getPopularPhotos(page) {
    //     // return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&q=${'random'}&page=1&per_page=40`, {
    //     return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&page=1&per_page=40`, {
    //         params: {
    //             // query: 'random',
    //             // page,
    //             // per_page: 40,
    //             // client_id: this.#API_KEY,
    //             key: this.#API_KEY,
    //             q: 'random',
    //             image_type: 'photo',
    //             orientation: 'horizontal',
    //             safesearch: 'true'
    //             // page: 1,
    //             // per_page: 40,        
    //     }})
    // }

    getPhotoByQuery(page) {
        // return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.#query}&page=1&per_page=40`, {
        return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&page=1&per_page=40`, {
        // return axios.get(`${this.#BASE_URL}/search/photos`, {
            params: {
                // query: this.#query,
                // page,
                // per_page: 40,
                // client_id: this.#API_KEY,
                key: this.#API_KEY,
                q: this.#query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true'
                // page: 1,
                // per_page: 40,
        }})
    }

    set query(newQuery) {
        this.#query = newQuery;
    }
}