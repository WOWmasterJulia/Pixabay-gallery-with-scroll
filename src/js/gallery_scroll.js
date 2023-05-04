import createGalleryCards from "../tamplates/gallery-card.hbs";
import { PixabayAPI } from "./pixabayAPI";

// import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const pixabayAPI = new PixabayAPI();

const searchFormEl = document.querySelector('.search-form');
// const btnEl = document.querySelector('.load-more');
searchFormEl.addEventListener('submit', onSearchForm);
let ttlPic = 0;
const perPage = 40;
let totalPage = 0;
let page = 1;
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,  
});

const optionsScroll = {
    root: null,
    rootMargin: '300px',
    threshold: 1.0,
}
const callback = async function (entries, obs) {
    console.log(entries[0].isIntersecting);
    try {
        if (entries[0].isIntersecting) {
                page += 1;
            obs.disconnect();
            if (page <= totalPage) {
                const respons = await pixabayAPI.getPhotoByQuery(page, perPage);
                galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(respons.data.hits));
                ttlPic = ttlPic + respons.data.hits.length;
                obs.observe(galleryEl.lastElementChild);
                console.log(page, totalPage, ttlPic);
                gallery.refresh();
            }   else {
                Report.failure("We're sorry, but you've reached the end of search results.");                
                obs.disconnect();
                return;
            }
        }
      } catch (error) {
    console.log(error.message);
  }      
};
const observer = new IntersectionObserver(callback, optionsScroll);

/* Пошук по запиту */
// console.log(observer);
async function onSearchForm(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements["searchQuery"].value.trim();
    console.dir(searchQuery);
    
    pixabayAPI.query = searchQuery;
    if (!searchQuery) {
        galleryEl.innerHTML = '';
        // return Notiflix.Notify.warning('Empty request!!!', 'fill in the request field!')
        return Report.warning('Empty request!!!', 'fill in the request field!')
    }
    galleryEl.innerHTML = '';
    page = 1; // сброс счетчика страниц
    ttlPic = 0; //сброс счетчика карточек 
    try {   
        const respons = await pixabayAPI.getPhotoByQuery(page,perPage);
        ttlPic = respons.data.hits.length + ttlPic;
        console.log(ttlPic);
        if (respons.data.hits.length === 0) {
            Report.info("Sorry, there are no images matching your search query. Please try again.");
            return
        } else {
            Report.success(`Hooray! We found ${respons.data.totalHits} images.`);
        };
        // if (respons.data.hits.length < perPage) {
        //     galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(respons.data.hits)); 
        //     gallery.refresh();
        //     return 
        // } 
        totalPage = Math.ceil(respons.data.totalHits / perPage);
        console.log(totalPage);
        galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(respons.data.hits)); 
        // console.log(galleryEl.lastElementChild);
        observer.observe(galleryEl.lastElementChild);
        gallery.refresh();
        
    } catch(error) {
        console.log(error)
    }
}



