document.addEventListener('keydown', logKey);

let columns = new Array(4);
let current_score = 0;
let best_score = 0;
let game_over = undefined;
let swipe,direction;

for (var i = 0; i < columns.length; i++) {
 	columns[i] = new Array(4)
 } 
var integer = 0;

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            logKey("left_swipe") 
        } else {
            logKey("right_swipe") 
        }                       
    } else {
        if ( yDiff > 0 ) {
            logKey("up_swipe") 
        } else { 
            logKey("down_swipe") 
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function logKey(move) {
  if (move=="right_swipe") {
    direction = "ArrowRight"
    swipe = true
  }
  if (move=="left_swipe") {
    direction = "ArrowLeft"
    swipe = true
  }
  if (move=="down_swipe") {
    direction = "ArrowDown"
    swipe = true
  }
  if (move=="up_swipe") {
    direction = "ArrowUp"
    swipe = true
  }
  if (!swipe) {
    direction = move.code
  }
  play(direction)
}

function play(direction) {
  //console.log(e)
  if (game_over==true) {
  	return
  }
  if (direction=="ArrowRight") {
  	move_to_right();
  	fuse_to_right();
  	move_to_right();
  	box_generation(1)
  }
  if (direction=="ArrowLeft") {
  	move_to_left();
  	fuse_to_left();
  	move_to_left();
  	box_generation(1)
  }
  if (direction=="ArrowDown") {
  	move_to_down();
  	fuse_to_down();
  	move_to_down();
  	box_generation(1)
  }
  if (direction=="ArrowUp") {
  	move_to_up();
  	fuse_to_up();
  	move_to_up();
  	box_generation(1)
  }
}

function move_to_right() {
  	for (var i = columns.length - 1; i >= 0; i--) {
  		for (var j = 0; j < columns[i].length; j++) {
  			//console.log("We are at column ",i+1," and row number ",j+1)
  			//console.log("The value of this box is",columns[i][j])
  			if (i+1<columns.length) {
  				//console.log("We can start the verification")
  				if ((columns[i][j]!=undefined)&&(columns[i+1][j]==undefined)) {
  					//console.log("Movement check")
  					while (i+integer+1<columns.length) {
  						if (columns[i+integer+1][j]==undefined) {
	  						//console.log("integer is at ",integer)
	  						//console.log("Here, BoxA = ",columns[i+integer][j]," and BoxB = ",columns[i+integer+1][j])
	  						columns[i+integer+1][j] = columns[i+integer][j];
	  						columns[i+integer][j] = undefined;
	  						integer++;
	  						//console.log("integer is at ",integer)
	  						////console.log("Here, BoxA = ",columns[i-integer-1][j]," and BoxB = ",columns[i-integer][j])
  						} else {
	  						integer++;
  						}
  					}
  					//console.log("debug: ", i,integer,columns.length)
  				//console.log("Integer stopped at ", integer)
  				integer = 0;
  				}
  			}
  			//console.log(" ")
  		}
  	}
  html_update()
}

function fuse_to_right() {
  	for (var i = columns.length - 1; i > 0; i--) {
  		for (var j = 0; j < columns[i].length; j++) {
  			fuse_boxes(i,j,i-1,j)
  		}
  	}
  //console.log(columns)
}


function move_to_left() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = 0; j < columns[i].length; j++) {
  			//console.log("We are at column ",i+1," and row number ",j+1)
  			//console.log("The value of this box is",columns[i][j])
  			if (columns[i-1]!=undefined) {
  				//console.log("We can start the verification")
  				if ((columns[i][j]!=undefined)&&(columns[i-1][j]==undefined)) {
  					//console.log("Movement check")
  					while (i-integer-1>=0) {
  						if (columns[i-integer-1][j]==undefined) {
	  						//console.log("integer is at ",integer)
	  						//console.log("Here, BoxA = ",columns[i-integer-1][j]," and BoxB = ",columns[i-integer][j])
	  						columns[i-integer-1][j] = columns[i-integer][j];
	  						columns[i-integer][j] = undefined;
	  						integer++;
	  						//console.log("integer is at ",integer)
	  						////console.log("Here, BoxA = ",columns[i-integer-1][j]," and BoxB = ",columns[i-integer][j])
  						} else {
	  						integer++;
  						}
  					}
  				//console.log("Integer stopped at ", integer)
  				integer = 0;
  				}
  			}
  			//console.log(" ")
  		}
  	}
  //console.log(columns)
  html_update()
}

function fuse_to_left() {
	for (var i = 1; i < columns.length; i++) {
  		for (var j = 0; j < columns[i].length; j++) {
  			fuse_boxes(i-1,j,i,j)
  		}
  	}
}

function move_to_down() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = columns.length - 1; j >= 0; j--) {
  			if ((columns[i][j-1]!=undefined)&&(columns[i][j]==undefined)) {
  				//console.log("Go down!")
  				while ((columns[i][j+integer]==undefined)&&(j+integer<columns[i].length)) {
  					columns[i][j+integer] = columns[i][j+integer-1];
  					columns[i][j+integer-1] = undefined;
  					integer++
  				}
  				integer = 0;
  				fuse_boxes(i,j+integer-1,i,j+integer)
  			}
  		}
  	}
  //console.log(columns)
  html_update()
}

function fuse_to_down() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = columns.length - 1; j >= 0; j--) {
  			fuse_boxes(i,j,i,j-1)
  		}
  	}
}

function move_to_up() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = 1; j < columns[i].length; j++) {
  				if ((columns[i][j]!=undefined)&&(columns[i][j-1]==undefined)) {
  				//console.log("Go up!")
  				while ((columns[i][j-integer-1]==undefined)&&(j-integer>0)) {
  					columns[i][j-integer-1] = columns[i][j-integer];
  					columns[i][j-integer] = undefined;
  					integer++;
  				}
  			integer = 0;
  			}
  		}
  	}
  //console.log(columns)
  html_update()
}

function fuse_to_up() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = 0; j < columns[i].length; j++) {
  			fuse_boxes(i,j,i,j+1)
  		}
  	}
}

function html_update() {
	for (var i = 0; i < columns.length; i++) {
  		for (var j = 0; j < columns[i].length; j++) {
  			if (columns[i][j]!=undefined) {
  				document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].innerText = columns[i][j]
  				// change text colors
  				if (columns[i][j]>=8) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.color = "white"
  				} else {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.color = "black"
  				}
  				// change background color
  				if (columns[i][j]==2) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#EEE4DA"
  				}
  				if (columns[i][j]==4) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#EDE0C6"
  				}
  				if (columns[i][j]==8) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#F2B179"
  				}
  				if (columns[i][j]==16) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#F59563"
  				}
  				if (columns[i][j]==32) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#F67C5F"
  				}
  				if (columns[i][j]==64) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#F65E3B"
  				}
  				if (columns[i][j]>=128) {
  					document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#EDCF72"
  				}
  			} else {
  				document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].innerText = " "
  				document.getElementsByClassName('column')[i].getElementsByClassName("box")[j].style.backgroundColor = "#CDC1B4"
  			}
  		}
  	}
  	document.getElementById('current_score').innerText = "Current score: " + current_score
  	document.getElementById('best_score').innerText = "Best score: " + best_score
}

function fuse_boxes(columnA,rowA,columnB,rowB) {
	if ((columns[columnA][rowA]==columns[columnB][rowB])&&(columns[columnA][rowA]!=undefined)) {
		//console.log("Let's fuse!")
		columns[columnA][rowA] += columns[columnB][rowB]
		columns[columnB][rowB] = undefined;
		current_score+= columns[columnA][rowA]
		if (current_score>best_score) {
			best_score = current_score
		}
	} else {
		//console.log("I can't fuse!")
		//console.log("BoxA = ",columns[columnA][rowA]," BoxB = ",columns[columnB][rowB])
	}
}

function new_game() {
	current_score = 0;
	for (var i = 0; i < columns.length; i++) {
 		columns[i] = new Array(4)
 	} 
 	game_over = false
 	document.getElementById("game_over").style.visibility = "hidden"
 	box_generation(2)
}

function box_generation(amount_of_new_boxes) {
	i = 0;
	board_filled = true;
	for (var i = 0; i < columns.length; i++) {
		  for (var j = 0; j < columns[i].length; j++) {
		  	if (columns[i][j]==undefined) {
		  		board_filled = false
		  	}
		}
	}
	if (board_filled==true) {
		// Check if game over
		game_over = true
		for (var i = 0; i < columns.length; i++) {
			  for (var j = 0; j < columns[i].length; j++) {
			  	if (columns[i+1]!=undefined) {
				  	if ((columns[i][j]==columns[i][j+1])||(columns[i][j]==columns[i][j-1])||(columns[i][j]==columns[i+1][j])) {
				  		game_over = false
				  	}
			  	} else {
				  	if ((columns[i][j]==columns[i][j+1])||(columns[i][j]==columns[i][j-1])) {
				  		game_over = false
				  	}
			  	}
			}
		}
		if (game_over==true) {
			alert("Game over!")
			document.getElementById("game_over").style.visibility = "visible"
			return
		}
	} else {
		while (amount_of_new_boxes>0) {
			i = Math.floor(Math.random() * columns.length);
			j = Math.floor(Math.random() * columns[i].length);
			while (columns[i][j]!=undefined) {
				i = Math.floor(Math.random() * columns.length);
				j = Math.floor(Math.random() * columns[i].length);
			}
			columns[i][j] = 2
			amount_of_new_boxes--
			html_update()
		}
	}
}