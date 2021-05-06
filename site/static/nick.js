function prepareNickPage() {
	var member = "nick";
	$.ajax({
		url: "/load-profile",
		dataType: "json",
		type: "POST",
		data: {"member": member},
		success: function(result){
			loadNickPage(result);
		}
	});
}

function loadNickPage(result){

	hide_all();
	$('#footer-section').fadeIn('slow');
	$("#profile").html("");
	$("#profile").html(result);
	$("#profile").fadeIn("Slow");
	$('#navbar-home-li').removeClass('active');
	$('#navbar-history-li').removeClass('active');
	$('#navbar-faces-li').removeClass('active');
	$('#navbar-contact-li').addClass('active');


	var company_chart = new CanvasJS.Chart("CompanyPieChartContainer", {
		animationEnabled: true,
		title: {
			text: "Industry Experience"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0\"\" months",
			indexLabel: "{label} {y}",
			dataPoints: [
				{y: 18, label: "GlobalFoundries"},
				{y: 12, label: "Avera Semiconductors"},
				{y: 18, label: "Marvell Semi"},
			]
		}]
	});
	company_chart.render();

	var language_chart = new CanvasJS.Chart("LanguagePieChartContainer", {
		animationEnabled: true,
		title: {
			text: "Daily Language Utilization"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0\"%\"",
			indexLabel: "{label}",
			dataPoints: [
				{y: 30, label: "Python"},
				{y: 20, label: "TCL"},
				{y: 20, label: "SQL"},
				{y: 10, label: "HTML"},
				{y: 10, label: "CSS"},
				{y: 10, label: "Javascript"}
			]
		}]
	});
	language_chart.render();

}