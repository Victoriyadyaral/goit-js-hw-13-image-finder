import notification from './notification.js'

const API_KEY = '22396340-e0d4683315286afcf7ffb4767';
const BASE_URL = 'https://pixabay.com/api';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }

    fetchImages() {
      
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`;
        
    return fetch(url)
      .then(response => response.json())
        .then((images) => {
            if (images.total === 0) {
             notification.incorrectRequest();   
            } else if (images.hits.length === 12 && this.page === 1) {
              notification.successRequest();
            }
                this.incrementPage();
                return images;
        })
      .catch(() => {
      notification.fetchError();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}