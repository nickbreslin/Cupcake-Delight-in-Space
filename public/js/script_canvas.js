var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init() {
    //init data
    
    var json = [  
      {
        "adjacencies": [],
        'children':[],  
        "data": {  
          "$type": "planet",
          "$planet_class": "1"  
        },   
        "id": "Planet 1",   
        "name": "Homeworld"  
      }
    ];

var json2 =
{  
    'id': 'prime',  
    'name': 'Homeworld',  
    "data": {  
        "$type" : "planet",
        "$planet_class": "3"  
}, 
'children': [  
{  
    'id':'planet_0',  
    'name': 'Rock World',  
    'data': {  
        '$angularWidth': 0,  
          "$type": "planet",
          "$planet_class": "1"  
    },  
    'children': [  
        {  
            'id':'planet_00',  
            'name': 'Rock Moon I',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "6"
            },  
            'children': []  

        },  
        {  
            'id':'planet_01',  
            'name': 'Rock Moon II',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "6"
            },  
            'children': []  

        },  
        {  
            'id':'planet_02',  
            'name': 'Rock Moon III',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "6" 
            },  
            'children': []  

        }  
    ]  
},  
{  
    'id':'planet_1',  
    'name': 'Water World',  
    'data': {  
        '$angularWidth': 120,  
        "$type": "planet",
        "$planet_class": "5" 
    },  
    'children': [  
        {  
            'id':'planet_10',  
            'name': 'Water Moon I',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "2"
            },  
            'children': []  

        },  
        {  
            'id':'planet_11',  
            'name': 'Water Moon II',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "2"
            },  
            'children': []  

        }  
    ]  
},  
{  
    'id':'planet_2',  
    'name': 'Gas Planet',  
    'data': {  
        '$angularWidth': 120,  
        "$type": "planet",
        "$planet_class": "4" 
    },  
    'children': [  
        {  
            'id':'planet_20',  
            'name': 'Gas Moon',  
            'data': {  
                '$angularWidth': 30,  
                "$type": "planet",
                "$planet_class": "7"
            },  
            'children': []  

        }  
    ]  
}  
]
};
        


    //init rgraph
    var rgraph = new $jit.RGraph({

        'injectInto': 'infovis',
        'type':'2D',


        Node: {
           overridable: true,
        },
        Edge: {
            overridable: true,  
            color: '#772277',
        },
        
        'background': {
          CanvasStyles: {
           strokeStyle: '#555'
          }
        },
        
        
        Events: {  
            enable: true,  
            onClick: function(node, eventInfo, e) {  
              if(node)
              {
                  rgraph.onClick(node.id, {
                        hideLabels: false
                    });
              }
            } 
          },
            /*
          Tips: {  
              enable: true,  
              type: 'Native',  
              offsetX: 10,  
              offsetY: 10,  
              onShow: function(tip, node) {  
                tip.innerHTML = node.name;  
              }  
            },
            */

        //Parent-children distance
        levelDistance: 60,
        //Duration
        duration: 1500,
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
            style.cursor = "pointer";
            domElement.onclick = function() {
              rgraph.onClick(node.id, {
                  hideLabels: false
              });
            };
        },
        
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
            style.display = '';
        }
    });
    //load graph.
    rgraph.loadJSON(json2);
    rgraph.compute();
    rgraph.refresh();
    timeout = setTimeout(function () {
          rgraph.refresh();
        }, 500)
    //end
}