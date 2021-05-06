// Global inits
var img_1 = "";
var img_2 = "";
var effect = "";
var cur_page = 1;

function prepareFacesPage() {
	var page = "Faces";
	$.ajax({
		url: "/load-page",
		dataType: "json",
		type: "POST",
		data: {"page": page},
		success: function(result){
			loadFacesPage(result);
		}
	});
}

function loadFacesPage(result){

	cur_page = 1;
	$("#faces-page").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#faces-page").fadeIn("Slow");
	$('#face-grid-1').fadeIn(2200);
	$('#footer-section').fadeIn('slow');
	$('#face-grid-2').hide();
	$('#face-grid-back-button-div').hide();
	loadFacePageListeners();

	$('#slides').hide();
	
}

function loadFacePageListeners(){

	// Page 1 Donald Trump Listener
	$('#select-donald-trump-card-1').click(function() {
		img_1 = "donald_trump";
		show_face_grid_2();
	});
	$('#select-donald-trump-1').click(function() {
		img_1 = "donald_trump";
		show_face_grid_2();
	});

	// Page 1 Hillary Clinton Listener
	$('#select-hillary-clinton-card-1').click(function() {
		img_1 = "hillary_clinton";
		show_face_grid_2();
	});
	$('#select-hillary-clinton-1').click(function() {
		img_1 = "hillary_clinton";
		show_face_grid_2();
	});

	// Page 1 Ted Cruz Listener
	$('#select-ted-cruz-card-1').click(function() {
		img_1 = "ted_cruz";
		show_face_grid_2();
	});
	$('#select-ted-cruz-1').click(function() {
		img_1 = "ted_cruz";
		show_face_grid_2();
	});

	// Page 2 Donald Trump Listener
	$('#select-donald-trump-card-2').click(function() {
		img_2 = "donald_trump";
		show_effects_selector_carousel();
	});
	$('#select-donald-trump-2').click(function() {
		img_2 = "donald_trump";
		show_effects_selector_carousel();
	});

	// Page 2 Hillary Clinton Listener
	$('#select-hillary-clinton-card-2').click(function() {
		img_2 = "hillary_clinton";
		show_effects_selector_carousel();	
	});
	$('#select-hillary-clinton-2').click(function() {
		img_2 = "hillary_clinton";
		show_effects_selector_carousel();
	});

	// Page 2 Ted Cruz Listener
	$('#select-ted-cruz-card-2').click(function() {
		img_2 = "ted_cruz";
		show_effects_selector_carousel();
	});
	$('#select-ted-cruz-2').click(function() {
		img_2 = "ted_cruz";
		show_effects_selector_carousel();
	});

	// Back button listener
	$('#faces-grid-back-button').click(function() {
		face_page_back_button();
	});

	// Face Morph button listener
	$('#carousel-facemorph-button').click(function() {
		face_morph();
	});


	// Face Swap button listener

	// Funny Mirrors button listener

}

function show_face_grid_1() {
	$('#face-grid-2').hide();
	$('#face-grid-back-button-div').hide();
	$('#faceMorph_result').hide();
	$('#spinner').hide();
	$('#loader').hide();
	$('#slides').hide();
	$('#face-grid-1').fadeIn("Slow");
	$('#faces-page-tracker').html('Page 1 of 4');
	$('#faces-message').html('Click a face from the faces below to select your first choice');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 1;
	//console.log("Current page: " + cur_page);

	
}

function show_face_grid_2() {
	//console.log("Img 1: " + img_1);
	$('#face-grid-1').hide();
	$('#faceMorph_result').hide();
	$('#spinner').hide();
	$('#loader').hide();
	$('#slides').hide();
	$('#face-grid-2').fadeIn("slow");
	$('#face-grid-back-button-div').fadeIn('slow');
	$('#faces-page-tracker').html('Page 2 of 4');
	$('#faces-message').html('Click a face from the faces below to select your second choice');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 2;
	//console.log("Current page: " + cur_page);

}

function show_effects_selector_carousel(){

	$('#face-grid-1').hide();
	$('#face-grid-2').hide();
	$('#faceMorph_result').hide();
	$('#spinner').hide();
	$('#loader').hide();
	$('#slides').fadeIn('slow');
	$('#faces-page-tracker').html('Page 3 of 4');
	$('#faces-message').html('Select an effect from the carousel below');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 3;

}

function face_page_back_button() {
	if (cur_page == 2) {
		show_face_grid_1();
	}
	if (cur_page == 3) {
		show_face_grid_2();
	}
	if (cur_page == 4) {
		show_effects_selector_carousel();
	}
}

function face_morph() {
	console.log("You selected face morph effect with");
	console.log("Img 1: " + img_1);
	console.log("Img 2: " + img_2);

	$('#face-grid-1').hide();
	$('#face-grid-2').hide();
	$('#slides').hide();
	$('#faceMorph_result').show();
	$('#spinner').show();
	$('#loader').show();
	$('#faces-page-tracker').html('Page 4 of 4');
	$('#faces-message').html('And the results are in!');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 4;

	$.ajax({
		url: "/face-morph",
		dataType: "json",
		type: "POST",
		data: {"img1": img_1, "img2": img_2},
		success: function(result){
			console.log("Hit success branch out of face morph ajax call :) ");
			$('#spinner').hide();
			$('#loader').hide();
			var html_string = '<img src="{{ url_for(\'static\',filename=\'output_image.jpg\') }}">';
			console.log(html_string);
			//$("#result_img").html('<img src="{{ url_for(\'static\',filename=\'output_image.jpg\') }}" align="absmiddle" ">');
			$("#result_img").html('<center><img src="../static/output_image.jpg"></center>');

			//<img src="{{ url_for('static',filename='output_image.jpg') }}">
		}
	});

}