const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=64c4c14a95c753fc8de3b5cd55a90f57&page=1&language=ru';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=64c4c14a95c753fc8de3b5cd55a90f57&language=ru&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else location.reload();
});

//Get initial movies
getMovies(API_URL);
