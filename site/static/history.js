function prepareHistoryPage() {
	var page = "History";
	$.ajax({
		url: "/load-page",
		dataType: "json",
		type: "POST",
		data: {"page": page},
		success: function(result){
			loadHistoryPage(result);
		}
	});
}

function loadHistoryPage(result){

	$("#history-page").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#history-page").fadeIn("Slow");
	$('#timeline').fadeIn(2200);
	$('#footer-section').fadeIn('slow');

}