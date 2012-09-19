var SERVICE_BASE_URI = window.location.href;
var CONVERT_PATH = "convert";

$(document).ready(function(){
	
	$("#convert").click(function(event){
		convert();
	});
});

// converts HDT <-> other RDF formats
function convert() {
	var data =  { inputdoc : '', from : '', to : '' };
	
	// some input validation
	if($("#inputdoc").val().substring(0, "http://".length) == "http://") {
		data.inputdoc = $("#inputdoc").val();
		data.from = $("#inputformat option:selected").val();
		data.to = $("#outputformat option:selected").val();
		console.log(data);
	}
	else {
		alert("Hey, you haven't provided valid input - input must be a valid HTTP URI.");
		return;
	}
	
	$.ajax({
		type: "POST",
		url: SERVICE_BASE_URI + CONVERT_PATH,
		data: data,
		dataType : "json",
		success: function(d){
			if(d) {
				$("#out").html("<p>The converted document is now available at:</p>");
				$("#out").append("<p style='text-align: center; font-size: 120%;'><a href='" + d.outputlocation +"' target='_blank'><img src='img/hdt-logo.png' alt='HDT' /></a></p>");
				$("#out").append("<p>Note: if you want to explore an HDT file, you might want to download one of the HDT <a href='http://www.rdfhdt.org/download/' target='_blank'>GUI desktop tools</a>.</p>");
				console.log(d);
				$("#results").slideDown('200');
			}
		},
		error:  function(msg){
			$("#out").html("<p>There was a problem converting the input:</p><code>" + msg.responseText + "</code>");
			$("#results").slideDown('200');
		} 
	});
}
