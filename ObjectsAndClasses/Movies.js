function storeMovies(movies) {
  const moviesInfo = [];

  const findMovie = (movieName) => {
    for (let index = 0; index < moviesInfo.length; index++) {
      const movie = moviesInfo[index];

      if (movie.name === movieName) {
        return movie;
      }
    }
    return undefined;
  };

  const addDirector = (movieName, director) => {
    const movie = findMovie(movieName);
    movie && (movie["director"] = director);
  };

  const addDate = (movieName, date) => {
    const movie = findMovie(movieName);
    movie && (movie["date"] = date);
  };

  movies.forEach((movie) => {
    if (movie.includes("addMovie")) {
      moviesInfo.push({ name: movie.replace("addMovie ", "") });
    } else if (movie.includes("directedBy")) {
      const nameAndDirector = movie.split(" directedBy ");
      addDirector(nameAndDirector[0], nameAndDirector[1]);
    } else if (movie.includes("onDate")) {
      const nameAndDate = movie.split(" onDate ");
      addDate(nameAndDate[0], nameAndDate[1]);
    }
  });

  moviesInfo.forEach((movie) => {
    movie.hasOwnProperty("name") &&
      movie.hasOwnProperty("director") &&
      movie.hasOwnProperty("date") &&
      console.log(JSON.stringify(movie));
  });
}

storeMovies([
  "addMovie Fast and Furious",
  "addMovie Godfather",
  "Inception directedBy Christopher Nolan",
  "Godfather directedBy Francis Ford Coppola",
  "Godfather onDate 29.07.2018",
  "Fast and Furious onDate 30.07.2018",
  "Batman onDate 01.08.2018",
  "Fast and Furious directedBy Rob Cohen",
]);

storeMovies([
  "addMovie The Avengers",
  "addMovie Superman",
  "The Avengers directedBy Anthony Russo",
  "The Avengers onDate 30.07.2010",
  "Captain America onDate 30.07.2010",
  "Captain America directedBy Joe Russo",
]);
