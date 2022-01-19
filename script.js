const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=64c4c14a95c753fc8de3b5cd55a90f57&language=ru&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=64c4c14a95c753fc8de3b5cd55a90f57&language=ru&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function colorRate(vote) {
  if (vote >= 8) return 'green';
  else if (vote >= 5) return 'orange';
  else return 'red';
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const html = `<div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${colorRate(vote_average)}">${
      movie.vote_average
    }</span>
            </div>
            <div class="overview">
                <h3>Описание</h3>
                ${overview}
            </div>
        </div>`;
    main.insertAdjacentHTML('beforeend', html);
  });
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
