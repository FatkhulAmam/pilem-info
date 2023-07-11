const API_KEY = "04c35731a5ee918f014970082a0088b1"
const getByID = "https://api.themoviedb.org/3/movie/"
const params = new URLSearchParams(window.location.search)
const root = document.getElementById("root")

// Sticky Navbar
document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
    (window.scrollY > 50) ?  $('.navbar').addClass('navbar-light bg-light') : $('.navbar').removeClass('navbar-light bg-light');
  });
});

if (params.has("id")) {
  const id = params.get("id")
  const URL = `${getByID}${id}?api_key=${API_KEY}`

  // Fetch json data from URL
  async function fetchData(URL) {
    try {
      const data = await fetch(URL).then((res) => res.json())
      return data
    } catch (error) {
      console.log(error.message)
      return null
    }
  }

  fetchData(URL).then(data => {
    if (!data.status_code) {
      const movie = data
      const content = `
        <div class="container m-5">
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="${movie.original_title}">
            </div>
            <div class="col-md-8 content">
              <h1 class="text-center mb-5">${movie.original_title}</h1>
              <div class="row mb-5">
                <div class="col-md-6">
                  <p>Release Date: ${movie.release_date}</p>
                  <p>Vote Average: ${movie.vote_average}</p>
                  <p>Vote Count: ${movie.vote_count}</p>
                  <p>Popularity: ${movie.popularity}</p>
                </div>
                <div class="col-md-6">
                  <p>Genre: ${movie.genres.map(genre => genre.name).join(", ")}</p>
                  <p>Language: ${movie.original_language}</p>
                  <p>Runtime: ${movie.runtime} minutes</p>
                  <p>Status: ${movie.status}</p>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-md-12">
                  <h3>Overview</h3>
                  <p>${movie.overview}</p>
                </div>
              </div>
              <a class="btn btn-outline-secondary" href="index.html" role="button">Back to home</a>
            </div>
          </div>
        </div>
      `
      root.innerHTML = content
    } else {
      root.innerHTML = `<h1 class="text-center" style="
        display:flex;
        justify-content: center;
        align-items: center;
        height:20vh">Movie not found</h1>`
    }
  })
}
