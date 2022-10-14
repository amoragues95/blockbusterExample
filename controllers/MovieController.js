let getMovies = async(req, res)=>{
    let movies = await fetch('https://ghibliapi.herokuapp.com/films?fields=title,description,director,producer,release_date,running_time,rt_score');
    movies = await movies.json();
    res.status(200).send(movies);
}

module.exports = {
    getMovies
}