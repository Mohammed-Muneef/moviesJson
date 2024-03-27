async function fetchMovies() {
  try {
    const response = await fetch("./movies.json");
    var jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
var i = 1;
let currentPage = 1;
var itemsPerPage = 5;
fetchMovies().then((movies) => {
  display(movies);
});

function display(movies) {
  for (const movie of movies.slice(0, 5)) {
    renderMovie(movie);
  }

  function renderPagination() {
    function renderMovies(movies) {
      const movieElement = document.getElementsByTagName("tbody");
      movieElement[0].innerHTML = ``;
      for (const movie of movies) {
        renderMovie(movie);
        i++;
      }
    }
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ``;

    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.addEventListener("click", () => {
        currentPage--;
        renderMovies(
          movies.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        renderPagination();
      });
      pagination.appendChild(prevButton);
    }

    const showPageNumbers = true;

    if (showPageNumbers) {
      const totalPages = Math.ceil(movies.length / itemsPerPage);

      const currentPageButton = document.createElement("button");
      currentPageButton.textContent = currentPage;
      currentPageButton.classList.add("page-number");
      currentPageButton.classList.add("active");

      currentPageButton.addEventListener("click", () => {
        renderMovies(
          movies.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      });

      pagination.appendChild(currentPageButton);
    }

    if (currentPage >= 1) {
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.addEventListener("click", () => {
        currentPage++;
        renderMovies(
          movies.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        renderPagination();
      });
      pagination.appendChild(nextButton);
    }
  }
  renderPagination();
}

//  here

function renderMovie(movie) {
  const movieElement = document.getElementsByTagName("tbody");

  const imdbRating = movie.imdb.rating;
  const tomatoRating = movie.tomatoes.viewer.rating * 2;

  const combinedRating = (imdbRating + tomatoRating) / 2;

  movieElement[0].innerHTML += `
      <tr>
      
      <td>${movie.title}</td>
      <td>${movie.imdb.rating}</td>
      <td>${movie.tomatoes.viewer.rating}</td>
      <td>${combinedRating.toFixed(1)}</td>
      <td>${movie.plot}</td>
    </tr>
    `;
}

// function filterByTitle()
// {
//   fetchMovies().then((movies) => {
//     return movies.slice().sort((movie1, movie2) => {
//       const title1 = movie1.title.toLowerCase(); // Ensure case-insensitive sorting
//       // console.log(title1)
//       const title2 = movie2.title.toLowerCase();
//       return title1.localeCompare(title2);
//     });
//   });
// }
async function filterByTitle() {
  const movies = await fetchMovies(); // Assuming fetchMovies returns a Promise

  return movies.slice().sort((movie1, movie2) => {
    const title1 = movie1.title.toLowerCase(); // Ensure case-insensitive sorting
    const title2 = movie2.title.toLowerCase();
    return title1.localeCompare(title2);
  });
}
function filter() {
  filterByTitle()
    .then((filteredMovies) => {
      const movieElement = document.getElementsByTagName("tbody");
      movieElement[0].innerHTML = ``;
      // Use the filteredMovies list here, e.g., for display
      console.log(filteredMovies);
      display(filteredMovies);
    })
    .catch((error) => {
      // Handle errors during fetching or sorting (optional)
      console.error("Error filtering movies:", error);
    });
}

async function filterByRating() {
  const movies = await fetchMovies(); // Assuming fetchMovies returns a Promise

  return movies.slice().sort((movie1, movie2) => {
    // Handle missing or invalid ratings by sorting them lower
    const rating1 = movie1.imdb.rating ? Number(movie1.imdb.rating) : -Infinity;
    const rating2 = movie2.imdb.rating ? Number(movie2.imdb.rating) : -Infinity;
    return rating2 - rating1; // Descending order (higher rating - lower rating)
  });
}
function filter2() {
  filterByRating()
    .then((filteredMovies) => {
      const movieElement = document.getElementsByTagName("tbody");
      movieElement[0].innerHTML = ``;
      // Use the filteredMovies list here, e.g., for display
      console.log(filteredMovies);
      display(filteredMovies);
    })
    .catch((error) => {
      // Handle errors during fetching or sorting (optional)
      console.error("Error filtering movies:", error);
    });
}

async function filterByTomatoRating() {
  const movies = await fetchMovies(); // Assuming fetchMovies returns a Promise

  return movies.slice().sort((movie1, movie2) => {
    // Handle missing or invalid ratings by sorting them lower
    const rating1 = movie1.tomatoes.viewer.rating
      ? Number(movie1.tomatoes.viewer.rating)
      : -Infinity;
    const rating2 = movie2.tomatoes.viewer.rating
      ? Number(movie2.tomatoes.viewer.rating)
      : -Infinity;
    return rating2 - rating1; // Descending order (higher rating - lower rating)
  });
}

function filter3() {
  filterByTomatoRating()
    .then((filteredMovies) => {
      const movieElement = document.getElementsByTagName("tbody");
      movieElement[0].innerHTML = ``;
      // Use the filteredMovies list here, e.g., for display
      console.log(filteredMovies);
      display(filteredMovies);
    })
    .catch((error) => {
      // Handle errors during fetching or sorting (optional)
      console.error("Error filtering movies:", error);
    });
}


async function filterByCombinedRating() {
  const movies = await fetchMovies(); // Assuming fetchMovies returns a Promise
  movies.forEach(movie => {
    movie.combined = Number(((movie.imdb.rating+(movie.tomatoes.viewer.rating*10)/5)/2).toFixed(1))
  })
  return movies.slice().sort((movie1, movie2) => {
    // Handle missing or invalid ratings by sorting them lower
    const rating1 = movie1.combined
      ? Number(movie1.combined)
      : -Infinity;
    const rating2 = movie2.combined
      ? Number(movie2.combined)
      : -Infinity;
    return rating2 - rating1; // Descending order (higher rating - lower rating)
  });
}

function filter4() {
  filterByCombinedRating()
    .then((filteredMovies) => {
      const movieElement = document.getElementsByTagName("tbody");
      movieElement[0].innerHTML = ``;
      // Use the filteredMovies list here, e.g., for display
      console.log(filteredMovies);
      display(filteredMovies);
    })
    .catch((error) => {
      // Handle errors during fetching or sorting (optional)
      console.error("Error filtering movies:", error);
    });
}