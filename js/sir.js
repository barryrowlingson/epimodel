
$(document).ready(function() {

	$('#s0').slider({
		slide: function(event, ui) {
		    $('#s0-value').text(ui.value);
		},
		    step: 1,
		    min: 0.0, max: 300,
		    value: 100
		    }); 

	$('#i0').slider({
		slide: function(event, ui) {
		    $('#i0-value').text(ui.value);
		},
		    step: 1,
		    min: 0.0, max: 200,
		    value: 1
		    }); 

	$('#r0').slider({
		slide: function(event, ui) {
		    $('#r0-value').text(ui.value);
		},
		    step: 1,
		    min: 0.0, max: 200,
		    value: 0
		    }); 

	$('#alpha').slider({
		slide: function(event, ui) {
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
		    step: 0.0001,
		    min: 0.0, max: 0.01,
		    value: 0.001
		    }); 	
	$('#time').slider({
		slide: function(event, ui) {
		    $('#time-value').text(ui.value);
		},
		    step: 1,
		    min: 10, max: 1000,
		    value: 100
		    }); 

	var sirplot = new SIRPlot("plot");

$('#run-model').click(function() {
	var S0 = parseInt($("#s0-value").text());
	var I0 = parseInt($("#i0-value").text());
	var R0 = parseInt($("#r0-value").text());

	var beta = parseFloat($("#beta-value").text());
	var alpha = parseFloat($("#alpha-value").text());

	var time = parseInt($("#time-value").text());


with(jstat){
    var SIRsim = SIR(S0,I0,R0,beta,alpha,time);
    sirplot.setModel(SIRsim);
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
