// const api_url = 'https://api.themoviedb.org/3/';
// const api_key =  '04c35731a5ee918f014970082a0088b1';
const page = (Math.random()*1000)%500 + 1;
const img_path = "https://image.tmdb.org/t/p/w1280";
const api_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const box = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//event listener
form.addEventListener('submit',searchedMovies);


async function getMovies(url){

    console.log('start');
    let response = await fetch(url);

    let data = await response.json();
    console.log(data);
    data.results.forEach(element => {
        showMovie(element);
    });

    return data;
}
function getColor(a)
{
    if(a>=7.5)
    return 'green';
    else if(a>=5)
    return 'orange';
    else
    return 'red';
}
function showMovie(element)
{
    if(element.poster_path!=null)
    {
        let clr = getColor(element.vote_average);
        
    const parent = document.createElement('div');
    parent.classList.add('container');

    parent.innerHTML = `
    <img src = ${img_path+element.poster_path} alt="movie image" >
    <div class="movie-info">
    <h3>${element.original_title}</h3>
    <span style="color:${clr};">${element.vote_average} &#9733;</span>
    </div>
    <div class="overview">
    <h2> Overview :</h2>
    <p>${element.overview}</p>
    </div>
    `;

    box.appendChild(parent);
    }
}

function searchedMovies(e)
{
    e.preventDefault();
    const movie = search.value;
    if(movie)
    {
        box.innerHTML = '';
        getMovies(search_api+movie);
        search.value = '';
    }
}

getMovies(api_url+page);

