// *** JS starts here ***

// function gets called upon page load
$( document ).ready(function() {
    //console.log( "FaceMorph page load success!" );
    prepare_page_load();
    window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate

});

// Initial page setup
function prepare_page_load() {

	hide_all();
	$('#home-slides').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate

	// Setting up the button listeners

		// Navbar Listeners

			// FaceMorph Navbar Logo Listener
			$('#facemorph-navbar-logo').click(function() {
				//window.scrollTo(0, 100); // xcoordinate,ycoordinate
				$('#navbar-home-li').addClass('active');
				$('#navbar-history-li').removeClass('active');
				$('#navbar-faces-li').removeClass('active');
				$('#navbar-contact-li').removeClass('active');
				show_home();
			});

			// Home navbar button listener
			$('#navbar-home-button').click(function() {
				//window.scrollTo(0, 100); // xcoordinate,ycoordinate
				$('#navbar-home-li').addClass('active');
				$('#navbar-history-li').removeClass('active');
				$('#navbar-faces-li').removeClass('active');
				$('#navbar-contact-li').removeClass('active');
				show_home();
			});

			// History navbar button listener
			$('#navbar-history-button').click(function() {
				$('#navbar-home-li').removeClass('active');
				$('#navbar-history-li').addClass('active');
				$('#navbar-faces-li').removeClass('active');
				$('#navbar-contact-li').removeClass('active');
				show_history();
			});

			// Faces navbar button listener
			$('#navbar-faces-button').click(function() {
				$('#navbar-home-li').removeClass('active');
				$('#navbar-history-li').removeClass('active');
				$('#navbar-faces-li').addClass('active');
				$('#navbar-contact-li').removeClass('active');
				showFacesPage();
			});

			// Contact navbar button listener
			$('#navbar-contact-button').click(function() {
				$('#navbar-home-li').removeClass('active');
				$('#navbar-history-li').removeClass('active');
				$('#navbar-faces-li').removeClass('active');
				$('#navbar-contact-li').addClass('active');
				prepareNickPage();
			});

		// Carousel button listeners

			// Learn More carousel button listener
			$('#carousel-learn-more-button').click(function() {
				$('#navbar-home-li').removeClass('active');
				$('#navbar-history-li').addClass('active');
				$('#navbar-faces-li').removeClass('active');
				$('#navbar-connect-li').removeClass('active')
				show_history();
			});

			// Faces navbar button listener
			$('#carousel-faces-button').click(function() {
				$('#navbar-home-li').removeClass('active');
				$('#navbar-history-li').removeClass('active');
				$('#navbar-faces-li').addClass('active');
				$('#navbar-connect-li').removeClass('active')
				showFacesPage();
			});

	// END button listeners 

} // end prepare_page_load() 

function show_home(){
	window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate
	hide_all();
	$('#home-slides').fadeIn('slow');
	$('#footer-section').fadeIn('slow');

	// Set first slide to be the active one
	$("#carousel-slide1").addClass("active");
	$("#carousel-slide2").removeClass("active");
	$("#carousel-slide3").removeClass("active");
	$("#slide1").addClass("active");
	$("#slide2").removeClass("active");
	$("#slide3").removeClass("active");
}

function show_history() {
	prepareHistoryPage();
}

function showFacesPage(){
	hide_all();
	$('#faces-page').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	$('#navbar-home-li').removeClass('active');
	$('#navbar-history-li').removeClass('active');
	$('#navbar-faces-li').addClass('active');
	$('#navbar-contact-li').removeClass('active');
	prepareFacesPage();
}

// If you add a div to index.html, add it to the list..
// NOTE: Excludes navbar and footer section
function hide_all() {
	window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate
	$('#home-slides').hide();
	$('#history-page').hide();
	$('#faces-page').hide();
	$('#profile').hide();
	$('#footer-section').hide();
	$('#timeline').hide();
}