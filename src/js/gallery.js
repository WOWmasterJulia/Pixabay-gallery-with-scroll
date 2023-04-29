import createGalleryCards from "../tamplates/gallery-card.hbs";
import { PixabayAPI } from "./pixabayAPI";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const pixabayAPI = new PixabayAPI();

async function onRenderPage(page) {
    try {
        const respons = await pixabayAPI.getPopularPhotos(page);
        galleryEl.innerHTML = createGalleryCards(respons.data.results);
        // console.log(data.hits);
        // const markupcard = respons.data.results;
        // galleryEl.insertAdjacentHTML('beforeend', createGalleryCards);
    } catch(error) {
         console.log(error);
    }
};

onRenderPage();


const searchFormEl = document.querySelector('#search-form');
const btnEl = document.querySelector('.load-more');
// searchFormEl.addEventListener('submit', searchForm);
searchFormEl.addEventListener('submit', onSearchForm);
// console.dir(searchFormEl);

// let inpValue = '';
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,  
});


/* Пошук по запиту */

async function createByQueryPogination(event) {
     try {
        const currentPage = event.page;
        // console.log(currentPage);
        const respons = await pixabayAPI.getPhotoByQuery(currentPage);
        galleryEl.innerHTML = createGalleryCards(respons.data.results);
    } catch(error) {
        console.log(error)
    }
};

async function onSearchForm(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements["searchQuery"].value.trim();
    console.dir(searchQuery);
    pixabayAPI.query = searchQuery;
    // pagination.off('afterMove', createPopularPogination);
    if (!searchQuery) {
        return Report.warning('Пустий запит!!!', 'Заповнить якісь данні.')
    }
    
    // try {
        
    //     const respons = await pixabayAPI.getPhotoByQuery(page);
    //     if (respons.data.results.length === 0) {
    //         galleryEl.innerHTML = '';
    //         // container.classList.add('is-hidden');
    //         Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    //     }
    //     if (respons.data.results.length < options.itemsPerPage) {
    //         // container.classList.add('is-hidden');
    //         return galleryEl.innerHTML = createGalleryCards(respons.data.results);
    //     }

    //     galleryEl.innerHTML = createGalleryCards(respons.data.results);
    //     // container.classList.remove('is-hidden');
    //     // pagination.reset(respons.data.total);
    //     // pagination.on('afterMove', createByQueryPogination)
    // } catch(error) {
    //     console.log(error)
    // }
}

// const searchFormEl = document.querySelector('.js-search-form');


// const checkBoxEl = document.querySelector('#theme-switch-toggle');
// checkBoxEl.addEventListener('change', onCheckboxClick);