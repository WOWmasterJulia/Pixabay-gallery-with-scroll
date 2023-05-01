import axios from "axios";

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35792942-c738c06de8752e63923c1b94a';
    #query = '';

    getPhotoByQuery(pg, pP) {
        // console.log(this.#BASE_URL);
        return axios.get(this.#BASE_URL,{
            params: {
                key: this.#API_KEY,
                q: this.#query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: pg,
                per_page: pP,
        }})
    }

    set query(newQuery) {
        this.#query = newQuery;
    }
}