$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});
function getMovies(searchText) {
	axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=thewdb')
	  .then((response) => {
	  	console.log(response);
	  	let movies = response.data.Search;
	  	let output = '';
	  	$.each(movies, (index, movie) => {
	  		output += `
	  		  <div class="col-md-3">
	  		    <div class="well text-center">
	  		      <img src="${movie.Poster}">
	  		      <h5>${movie.Title}</h5>
	  		      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
	  		    </div>
	  		  </div>
	  		`;
	  	});

	  	$('#movies').html(output);
	  })
	  .catch((err) => {
	  	console.log(err);
	  })
};


function movieSelected(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}

function getMovie(){
	let movieId = sessionStorage.setItem('movieId');

	axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb')
	  .then((response) => {
	  	console.log(response);
	  	let movie = response.data;

	  	let output =`
	  	  <div class="row">
	  	    <div class="col-md-4">
	  	      <img src="${movie.Poster}" class="thumbnail">
	  	    </div>
	  	    <div class="col-md-8">

	  	    </div>
	  	  </div>
	  	`;

	  	$('#movie').html(output);
	  })
	  .catch((err) => {
	  	console.log(err);
	  })
}