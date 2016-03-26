//tile object
function tile_box(){
  this.tile_type;
  this.addToScene = function(id){
    document.getElementById('container').innerHTML += '<span href="#" id="'+id+'" data-type="'+this.tile_type+'" class="tile_box"><i class="fa fa-question"></i></span>';
  }
}

//variables
var number_of_tiles = 20;
var tiles_per_row = 5;
var openings = 0;
var tries = 0;
var tiles = new Array();
var tile = new tile_box();
var picked_tiles = new Array();
var can_pick = true;
var pictures = ['<img src="http://melodyofdream.1apps.com/mmst/mmst36.gif" /</span>',
                '<img src="http://www.varshow.com/wp-content/uploads/2015/07/Running_man_header-45x45.jpg" /</span>',
                '<img src="http://cdn-obs.line-apps.com/line/r/lineq/p/3929c629-9910-4b37-aff2-45073c16b96d4f1e1et02220637/50x50.rf" /</span>',
                '<img src="http://a.deviantart.net/avatars/k/a/kawaiiusagix3.gif?3" /</span>',
                '<img src="http://a.deviantart.net/avatars/c/h/charmmykittyplz.gif?1" /</span>',
                '<img src="http://pixeljoint.com/files/icons/star_wars_stormtrooper_01_avatar.png" /</span>',
                '<img src="https://pbs.twimg.com/profile_images/646781250217181185/iEdr9Wf6_normal.jpg" /</span>',
                '<img src="http://a.deviantart.net/avatars/d/a/dancing-fruit.gif?10" /</span>',
                '<img src="http://preloaders.net/preloaders/473/Pear%20animated.gif" /</span>', 
                '<img src="http://previewcf.turbosquid.com/Preview/2014/07/11__08_05_42/strawberry3_01.png0a7620a9-e4b7-48ef-9aa5-cfca133d1692Small.jpg"</span>', ]; 
function givePic(i){
  return pictures[i];
}

//tiles creation loop
for(var i=0; i<number_of_tiles; i++){
  tiles.push(Math.floor(i/2));
}

//shuffling loop
var swap,tmp;
for(var i=number_of_tiles-1; i>0; i--){
  swap = Math.floor(Math.random()*i);
  tmp = tiles[i];
  tiles[i] = tiles[swap];
  tiles[swap] = tmp;
}

//tile placing loop
for(var i=0; i<number_of_tiles; i++){
  tile = new tile_box;
  var id = Math.floor(Math.random()*300);
  tile.tile_type = tiles[i];
  tile.addToScene(id);
}

function resetGame(){
  alert("Congratulations! You have tried "+tries+" times.");
}

//tile click function
function clicked(){
  if(can_pick){
    var picked = this;
    if(picked_tiles.indexOf(picked) == -1){
      picked_tiles.push(picked);
      picked.innerHTML = givePic(picked.dataset['type']);
    }
    
    if(picked_tiles.length == 2){
      tries++;
      can_pick = false;
      if(picked_tiles[0].dataset['type'] == picked_tiles[1].dataset['type']){
        setTimeout(function(){
          picked_tiles[0].removeEventListener('click',clicked,false);
          picked_tiles[1].removeEventListener('click',clicked,false);
          picked_tiles[0].innerHTML = "";
          picked_tiles[1].innerHTML = "";
          picked_tiles[0].className = picked_tiles[0].className + " removed";
          picked_tiles[1].className = picked_tiles[1].className + " removed";
          picked_tiles = new Array();
          can_pick = true;
          openings++;
          if(openings == (number_of_tiles/2)){
            resetGame();
          }
        },1000);
      } else {
        setTimeout(function(){
          picked_tiles[0].innerHTML = '<i class="fa fa-question"></i>';
          picked_tiles[1].innerHTML = '<i class="fa fa-question"></i>'; 
          picked_tiles = new Array();
          can_pick = true;
        },1000);
      }
    }
  }
}

//add event listeners to tiles
var elements = document.getElementsByTagName("span");
for(var i=0; i<elements.length; i++){
  elements[i].addEventListener('click',clicked);
}