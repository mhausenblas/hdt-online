var SERVICE_BASE_URI = window.location.href;
var CONVERT_PATH = "convert";

$(document).ready(function(){
	$("#inputdoc").val(SERVICE_BASE_URI + 'test/mini.nt');
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
				$("#out").html("<p>The converted document is now available at:</p><p style='text-align: center'><a href='" + d.outputlocation +"' target='_blank'>" +d.outputlocation + "</a></p>");
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
