import galleryItemTpl from './templates/galleryItemTpl.hbs';
import './sass/main.scss';

import refs from './js/refs.js';
import ApiService from './js/apiService.js';
import LoadMoreBtn from './js/loadMoreBtn.js';
import notification from './js/notification.js';
//import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.form.addEventListener('submit', handleBtnSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function handleBtnSubmit(event) {
    event.preventDefault();

    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query.trim() === '') {
        return  notification.emptyInputError();
    }

    apiService.resetPage();
    clearContainer();
    fetchImages();
    refs.input.value = '';
    
};

function fetchImages() {
  loadMoreBtn.disable();
  apiService.fetchImages()
    .then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
    refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
    })
    .catch(() => {
      notification.fetchError();
    });
}

function appendImagesMarkup(images) {
    if (images.hits.length === 12) {
        loadMoreBtn.show();
    } else if (images.hits.length < 12) {
        loadMoreBtn.hide();
    }
  refs.imagesContainer.insertAdjacentHTML('beforeend', galleryItemTpl(images));
}

function clearContainer() {
  refs.imagesContainer.innerHTML = '';
}

refs.imagesContainer.onclick = (e) => {

  const instance = basicLightbox.create(`
		<img src="${e.target.alt}">
	`);
instance.show(e);
}