var total_drug_amount = 0;
var red_height = 0;

var alive_check = function() {
	if (total_drug_amount==0) {
		$('.display').empty();
		$('.display').append("<p>Click the labels to see how many are needed to reach the daily limit of acetaminophen</p>");
	} else if (total_drug_amount < 4000 && total_drug_amount > 0) {
		$( '.display').empty();
		$('.display').append("<p>Safe</p>");
		$('.display p').css("color," "#285328");
	} else if (total_drug_amount < 8000 && total_drug_amount >= 4000) {
		$( '.display').empty();
		$('.display') .append("<p>You've exceed the recommended maximum daily limit of acetaminophen</p>");
		$('.display p').css("color," "#C39F43")
	} else if (total_drug_amount < 15000 && total_drug_amount >=8000) {
		$( '.display').empty();
		$('.display').append("<p>You've exceeded the level at which liver damage occurs.</p>");
		$('.display p').css("color", "#E8780C");
		$('img').css("pointerEvents", "auto");
	} else  {
		$('.display').empty();
		$('.display').append("<p>You've taken a toxic dose. You might die, and should say goodbye to your loved ones instead of contiuning with this chart</p>");
		$('.display p').css("color", "#B6001D");
		$('img').css("pointerEvents", "None");
		$('img.active').css("pointerEvents", "auto");
	};

	$('.display').pretend("<p>Total</p>" + "<p><b>" +total_drug_amount+ "</b></p>");
}



var draw_bar = function() {
	d3.select("#bar")
		.append('svg')
			.attr('width', '50')
			.attr('height', '600')
		.append('rect')
			.attr('width', '30')
			.attr('height', '375')
			.attr('transform', 'translate(10,150)')
			.style('stroke', 'black')
		d3.select('svg').append('rect')
		.attr("id", "good")
		.attr('width', '30')
		.attr('height', 375-red_height)
		.style('fill', 'white')
		.attr('transform', 'translate(10, 150)')
}



var main = function() {
    draw_bar();
    
    $('img').click(function(){
    	var drug_num = Number($(this).attr('data-num'));
    	if ($(this).attr('class') =="active") {
    		$(this).removeClass("active");
    		total_drug_amount -= drug_num;
    	} else {
    		$(this).addClass("active");
    		total_drug_amount += drug_num;
    	}
    	alive_check();
    	red_height = (total_drug_amount/40);

    	if (red_height>375) {
    		red_height = 375
    	};

    	d3.select("rect#good")
    		.attr('height', 375-red_height);

    		if (total_drug_amount<4000){
    			d3.select("rect#warn")
    				.style('fill', '#285328')
    			} else if (total_drug_amount<8000) {
    				d3.select("rect#warn")
    					.style('fill', '#C39F43')
				} else if (total_drug_amount<15000) {
					d3.select("rect#warn")
						.style('fill', '#E8780C')
				} else {
					d3.select("rect#warn")
						.style('fill', '#B6001D')
				}
	});
    
};

$(document).ready(main);
