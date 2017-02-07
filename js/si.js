
$(document).ready(function() {

$(".updown").click(function(){
    var b = $(this);
    var sid = b.data("slider");
    var step = $(sid).slider("option","step");
    if(b.data("step") == "up"){
	$(sid).slider("value", $(sid).slider("value")+step);
    };
    if(b.data("step") == "down"){
	$(sid).slider("value", $(sid).slider("value")-step);
    };
});


	$('#s0').slider({
	    change: function(event, ui) {
		$('#s0-value').text(ui.value);
	    },
	    slide: function(event, ui) {
		$('#s0-value').text(ui.value);
	    },
	    step: 1,
	    min: 0.0, max: 200,
	    value: 100
	}); 

	$('#i0').slider({
		slide: function(event, ui) {
		    $('#i0-value').text(ui.value);
		},
	    change: function(event, ui) {
		    $('#i0-value').text(ui.value);
		},
		    step: 1,
		    min: 0.0, max: 200,
		    value: 10
		    }); 

	$('#alpha').slider({
		slide: function(event, ui) {
		    $('#alpha-value').text(ui.value);
		},
		change: function(event, ui) {
		    $('#alpha-value').text(ui.value);
		},
		    step: 0.001,
		    min: 0.0, max: 0.3,
		    value: 0
		    });
 
	$('#beta').slider({
		slide: function(event, ui) {
		    $('#beta-value').text(ui.value);
		},
	    change: function(event, ui) {
		    $('#beta-value').text(ui.value);
		},
		    step: 0.0001,
		    min: 0.0, max: 0.01,
		    value: 0.001
		    }); 	
	$('#time').slider({
		slide: function(event, ui) {
		    $('#time-value').text(ui.value);
		},
	    change: function(event, ui) {
		    $('#time-value').text(ui.value);
		},
		    step: 1,
		    min: 10, max: 1000,
		    value: 100
		    }); 

	var siplot = new SIPlot("plot");

$('#run-model').click(function() {
	var S0 = parseInt($("#s0-value").text());
	var I0 = parseInt($("#i0-value").text());

	var beta = parseFloat($("#beta-value").text());
	var alpha = parseFloat($("#alpha-value").text());

	var time = parseInt($("#time-value").text());
	var random = $("#randombox").attr("checked");

with(jstat){
    var SIsim = SI(S0,I0,beta,alpha,time,random);
    siplot.setModel(SIsim);
};
}); 

$.plot("#plot",[[0,0],[500,100]]);

    });

function LoadMyJs(scriptName) {
var docHeadObj = document.getElementsByTagName("head")[0];
var dynamicScript = document.createElement("script");
dynamicScript.type = "text/javascript";
dynamicScript.src = scriptName;
docHeadObj.appendChild(dynamicScript);
}
