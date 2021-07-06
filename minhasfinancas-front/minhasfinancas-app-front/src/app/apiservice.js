import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
});

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    requestUrl(url) { return `${this.apiUrl}${url}`}

    post(url, obj) { return httpClient.post(this.requestUrl(url), obj) }

    put(url, obj) { return httpClient.put(this.requestUrl(url), obj) }

    patch(url, obj) { return httpClient.patch(this.requestUrl(url), obj) }

    delete(url) { return httpClient.delete(this.requestUrl(url)) }

    get(url) { return httpClient.get(this.requestUrl(url)) }
}

export default ApiService;