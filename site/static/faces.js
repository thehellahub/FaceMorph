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
	$('#faceMorph_result').hide();
	$('#spinner').hide();
	$('#loader').hide();
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
	/*var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;
	slider.oninput = function() {
	  output.innerHTML = this.value;
	}*/

	// Face Swap button listener
	$('#carousel-faceswap-button').click(function() {
		face_swap();
	});

	// Funny Mirrors button listener
	$('#carousel-funnymirrors-button').click(function() {
		funny_mirrors();
	});
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
	$('#faces-message').html('Click a face from the faces below to select your first victim');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 1;	
}

function show_face_grid_2() {
	$('#face-grid-1').hide();
	$('#faceMorph_result').hide();
	$('#spinner').hide();
	$('#loader').hide();
	$('#slides').hide();
	$('#face-grid-2').fadeIn("slow");
	$('#face-grid-back-button-div').fadeIn('slow');
	$('#faces-page-tracker').html('Page 2 of 4');
	$('#faces-message').html('Click a face from the faces below to select your second victim');
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 2;
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
	var opacity = $('#demo').html();
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
	//var opacity = $('#demo').html();
	//console.log("Selected opacity value: " + opacity);
	$.ajax({
		url: "/face-morph",
		dataType: "json",
		type: "POST",
		//data: {"img1": img_1, "img2": img_2, "opacity": opacity,},
		data: {"img1": img_1, "img2": img_2,},
		success: function(result){
			$('#spinner').hide();
			$('#loader').hide();
			$("#result_img").html('<center><img src="../static/'+result+'"></center>');
		}
	});
}

function face_swap() {
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
		url: "/face-swap",
		dataType: "json",
		type: "POST",
		data: {"img1": img_1, "img2": img_2,},
		success: function(result){
			$('#spinner').hide();
			$('#loader').hide();
			$("#result_img").html('<center><img src="../static/'+result+'"></center>');
		}
	});
}

function funny_mirrors() {
	$('#face-grid-1').hide();
	$('#face-grid-2').hide();
	$('#slides').hide();
	$('#faceMorph_result').show();
	$('#spinner').show();
	$('#loader').show();
	$('#faces-page-tracker').html('Page 4 of 4');
	$('#faces-message').html('And the results are in!');
	var img = $("#funny-mirrors-img-selector option:selected").text();
	var effect = $("#funny-mirrors-effect-selector option:selected").text(); 
	window.scrollTo(0, 0); // xcoordinate,ycoordinate -- scroll to top of page
	cur_page = 4;
	if (img == "Victim 1"){
		img = img_1;
	} else {
		img = img_2
	}
	$.ajax({
		url: "/funny-mirrors",
		dataType: "json",
		type: "POST",
		data: {"img": img, "effect": effect},
		success: function(result){
			$('#spinner').hide();
			$('#loader').hide();
			$("#result_img").html('<center><img src="../static/'+result+'"></center>');
		}
	});
}