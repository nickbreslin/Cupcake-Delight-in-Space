$(function() {
	
	$( ".planet" ).droppable({
		drop: function( event, ui ) {
		   var id = $(ui.draggable).attr('id');
		   var f = parseInt(id.replace("cupcake-", ""));
		   $(ui.draggable).remove();
		   var pid = $(this).attr('id');
   		   var pf = parseInt(pid.replace("planet-", ""));
		   cupcakes[f].location = pf;
           planets[pf].countdown=10;
           
           console.log(planets[pf].need+":"+cupcakes[f].nickname);
           if(planets[pf].need == cupcakes[f].nickname)
           {
               console.log("MATCH");
               $('.planet-face', this ).
   			    removeClass('planet-hungry, planet-angry').addClass('planet-happy');
   			    $('a', this )
    			    .tooltip('hide');
           }
           else
           {
               console.log("NO MATCH");
               $('.planet-face', this ).
      			    removeClass('planet-hungry, planet-happy').addClass('planet-angry');
           }
			
		}
	});
});

