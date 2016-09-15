function callback(event) {
  event.preventDefault();
  	
    var addressInfo = $(event.currentTarget).serializeArray();
 	var address = addressInfo[0].value
 	 address = encodeURI(address);
 	var city = addressInfo[1].value
 		city= encodeURI(city);
 	var state = addressInfo[2].value
 		state = encodeURI(state);
 	var zip = addressInfo[3].value

		
		$(".people").empty()
 		
 		var lat 
 		var lng

		function latLong(result){
			lat = result.results[0].geometry.location.lat
			lng = result.results[0].geometry.location.lng
			console.log(result)
  $.ajax({
    url: 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+ lat + '&longitude='+ lng +
    '&apikey=dbcc5517d9b24a60a8bf3252cedd6916',
    success: findCongress
  })
		}


  function findCongress(congressPerson) {
  	for(var i = 0; i < congressPerson.results.length; i++){
  	var name = congressPerson.results[i].first_name
  	var office = congressPerson.results[i].office
  	var phone = congressPerson.results[i].phone
  	console.log(name,office,phone)

   $(".people").append('<h1>Name of CongressPerson: '+ name + '</h1>')
   $(".people").append('<p>Office Address: ' + office + '</p>')
   $('.people').append('<p>Phone Number: ' + phone + '</p>')
 }

  
    console.log(congressPerson)
  }

  $.ajax({
  	url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +','+ city +','+ state + '&key=AIzaSyDeok5RLK3LDPP5cJ_A37dHcEfPNyei9UA', success:latLong 
  })
}
    

$(document).ready(
  function(){
    $("#congress").on("submit", callback)
})

