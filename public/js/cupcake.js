$(function() {
    cupcake1 = new Object();
    cupcake1.nickname = "#fff";
    cupcake1.need = [3,3,3,3];
    cupcake1.done = false;
    cupcake1.location = -1;
    cupcake1.rotate = 10;
    cupcake2 = new Object();
    cupcake2.nickname = "#C35917";
    cupcake2.need = [3,3,3,3];
    cupcake2.done = false;
    cupcake2.location = -1;
    cupcake2.rotate = 60;

    cupcake3 = new Object();
    cupcake3.nickname = "#D5145A";
    cupcake3.need = [3,3,3,3];
    cupcake3.done = false;
    cupcake3.location = -1;
    cupcake3.rotate = 200;
    cupcake4 = new Object();
    cupcake4.nickname = "#13B7A7";
    cupcake4.need = [3,3,3,3];
    cupcake4.done = false;
    cupcake4.location = -1;
    cupcake4.floating = true;
    cupcake4.rotate = 100;




    cupcakes = [];
    cupcakes[0] = cupcake1;
    cupcakes[1] = cupcake2; 
    cupcakes[2] = cupcake3; 
    cupcakes[3] = cupcake4;



    planet1 = new Object();
    planet1.need = "#fff";
    planet1.countdown = 0;

    planet2 = new Object();
    planet2.need = "#13B7A7";
    planet2.countdown = 0;

    planet3 = new Object();
    planet3.need = "#D5145A";
    planet3.countdown = 0;

    planet4 = new Object();
    planet4.need = "#C35917";
    planet4.countdown = 0;

    function getNewColor()
    {
    
    }



    planets = [];
    planets[0] = planet1;
    planets[1] = planet2; 
    planets[2] = planet3; 
    planets[3] = planet4;

    Game = new function() {

    	this.state = {};
	
    	this.init = function() {
    	    Game.main();
            Game.floatInSpace('#cupcake-0');
            Game.floatInSpace('#cupcake-1');
            Game.floatInSpace('#cupcake-2');
            Game.floatInSpace('#cupcake-3');
            $('.planet a').tooltip('show');
        
            $('.face').addClass('face-hungry');
        
        
            $( ".cupcake" ).draggable({
        	        start : function(event, ui) {
        	            $(this).stop();

                    }
                });




                $( "#container-space" ).droppable({
            		drop: function( event, ui ) {
        		   }
            	});

            	$('a').tooltip({'trigger':'manual', 'animation':false});
        }
    
        this.main = function(){                
        
       
           for(index in planets)
           {
                   if(planets[index].countdown > 1)
                   {
                       //planets[index].countdown--;
                     //  $('.planet a').eq(index).attr('data-original-title', "");
                     //  $('.planet a').eq(index).tooltip('hide');
                   }
                   else
                   {
                       var want = "<span style='color:"+planets[index].need+"'>&#10084;</span>";
                       $('.planet a').eq(index).attr('data-original-title', want);
                       //$('.planet a').eq(index).tooltip('hide').tooltip('show');
                   }

           }
            setTimeout("Game.main()",1000); 
        }
    
    
        this.floatInSpace = function(ele) {
            var id = $(ele).attr('id');
    		var f = parseInt(id.replace("cupcake-", ""));
    		cupcakes[f].floating = true;
        
            randTop = Game.getRand();
            randLeft = Game.getRand();
            randTime = (Game.getRand() * 20) + 5000;
            $(ele).animate({
                left: randTop,
                top: randLeft,
            },
            {
                step: function()
                {
                    Game.rotate(id, cupcakes[f].rotate);
                    cupcakes[f].rotate += 0.3;
                },
                complete : function() {
                    Game.floatInSpace(this);
        
                    $(ele).css('-webkit-transform:rotate','90');
                },duration: randTime
            });
      }
  
      this.rotate = function(id, value)
      {
          document.getElementById(id).style.webkitTransform="rotate(" + value + "deg)";
          document.getElementById(id).style.msTransform="rotate(" + value + "deg)";
          document.getElementById(id).style.MozTransform="rotate(" + value + "deg)";
          document.getElementById(id).style.OTransform="rotate(" + value + "deg)";
          document.getElementById(id).style.transform="rotate(" + value + "deg)";      
      }
  
      this.getRand = function()
      {
          var numLow = 0;
          var numHigh = 800;

          var adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;

          var numRand = Math.floor(Math.random()*adjustedHigh) + parseFloat(numLow);
      
          return numRand;
      }
    };
            $('#myModal').modal({'keyboard':false});
    Game.init();
    
    
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
               $('.face', this ).
   			    removeClass('face-hungry, face-angry').addClass('face-happy');
   			    $('a', this )
    			    .tooltip('hide');
           }
           else
           {
               console.log("NO MATCH");
               $('.face', this ).
      			    removeClass('face-hungry, face-happy').addClass('face-angry');
           }
			
		}
	});
});