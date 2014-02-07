
$(document).ready(function() {


	$('#n0').slider({
		slide: function(event, ui) {
		    $('#n0-value').text(ui.value);
		},
		    step: 1,
		    min: 0.0, max: 200,
		    value: 1
		    }); 

	$('#rho').slider({
		slide: function(event, ui) {
		    $('#rho-value').text(ui.value);
		},
		    step: 0.001,
		    min: 0.8, max: 1.2,
		    value: 1.0
		    }); 	
	$('#time').slider({
		slide: function(event, ui) {
		    $('#time-value').text(ui.value);
		},
		    step: 1,
		    min: 10, max: 1000,
		    value: 100
		    }); 

	var expplot = new EXPPlot("plot");

$('#run-model').click(function() {

	var N0 = parseInt($("#n0-value").text());

	var rho = parseFloat($("#rho-value").text());

	var time = parseInt($("#time-value").text());
	var random = $("#randombox").attr("checked");

with(jstat){
    var EXPsim = EXP(N0,rho,time,random);
    expplot.setModel(EXPsim);
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
