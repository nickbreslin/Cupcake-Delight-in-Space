$(function() {

    var cupcakes = [];
    cupcakes.push({ flavour : "#FFFFFF", rotation : 10  });
    cupcakes.push({ flavour : "#C35917", rotation : 60  });
    cupcakes.push({ flavour : "#D5145A", rotation : 200 });
    cupcakes.push({ flavour : "#13B7A7", rotation : 100 });


    var planets = [];
    planets.push({ flavour : "#D5145A", countdown : 0 });
    planets.push({ flavour : "#13B7A7", countdown : 0 });
    planets.push({ flavour : "#C35917", countdown : 0 });
    planets.push({ flavour : "#FFFFFF", countdown : 0 });


    Game = new function() {
	
    	this.init = function() {
    	    Game.main();
            Game.floatInSpace('#cupcake-0');
            Game.floatInSpace('#cupcake-1');
            Game.floatInSpace('#cupcake-2');
            Game.floatInSpace('#cupcake-3');
        
            $('.face').addClass('face-hungry');
        
        
            $( ".cupcake" ).draggable({
        	    start : function(event, ui) {
        	        $(this).stop();
                },
                stop : function(event, ui) {
        	        Game.floatInSpace(this);
                },
            });


            $('.planet a').tooltip({'trigger':'manual', 'animation':false}).tooltip('show');
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
                       var want = "<span style='color:"+planets[index].flavour+"'>&#10084;</span>";
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
                    Game.rotate(id, cupcakes[f].rotation);
                    cupcakes[f].rotation += 0.3;
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
           planets[pf].countdown=10;
           
           if(planets[pf].flavour == cupcakes[f].flavour)
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