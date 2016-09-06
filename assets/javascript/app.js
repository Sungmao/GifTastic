var movies = ['Poodle','Labrador Retriever','Husky','Boxer','Dachshund','Pug','Schnauzer'];

function displayMovieInfo(){

	$('#moviesView').empty();

	var movie = $(this).attr('data-name');

	var queryURL="http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++){

			var movieDiv = $('<div>');

			var rating = results[i].rating;

			var pOne = $('<p>').text("Rating:"+results[i].rating);

			movieDiv.append(pOne);

			var image = $('<img>');

			image.attr("class", "gif");

			image.attr("src", results[i].images.fixed_height_small_still.url);

			image.attr("data-still", results[i].images.fixed_height_small_still.url);

			image.attr("data-animate", results[i].images.fixed_height_small.url);

			image.attr("data-state", "still");

			movieDiv.append(image);

			$('#moviesView').append(movieDiv);

		}

	})
};	


function renderButtons(){

	$('#buttonsView').empty();

	for (var i = 0 ; i < movies.length; i++){

		var a = $('<button>');

		a.addClass('movie');
		a.attr('data-name', movies[i]);
		a.text(movies[i]);

		$('#buttonsView').append(a);
	}
}

$('#addMovie').on('click',function(){

	var movie = $('#movie_input').val().trim();

	movies.push(movie);

	renderButtons();

	return false;

})

$(document).on('click','.movie', displayMovieInfo);

renderButtons();

$(document).on('click','.gif', function(){

	var state = $(this).attr('data-state');

	console.log(state);

	if ( state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');

    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});



