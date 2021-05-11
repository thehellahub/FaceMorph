function prepareResourcesPage() {
	var page = "Resources";
	$.ajax({
		url: "/load-page",
		dataType: "json",
		type: "POST",
		data: {"page": page},
		success: function(result){
			loadResourcesPage(result);
		}
	});
}

function loadResourcesPage(result){

	$("#resources-page").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#resources-page").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');

}