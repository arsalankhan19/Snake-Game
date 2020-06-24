
//this was a demo..
//initializing func
//everything is called once
function init(){
	canvas = document.getElementById("mycanvas");
	W = canvas.height = 500;
	H = canvas.width = 500;
	game_over = false;
	//canvas is used to draw graphics
	pen = canvas.getContext('2d'); //pen is used to draw to something on canvas

	rect = {
		x: 20,
		y: 20,
		w: 40,
		h: 40,
		speed: 20,
	}
}

function draw(){

	pen.clearRect(0,0,W,H); //as we were getting the continuous screen so we cleared it up at every step
	pen.fillStyle = "Red"; //fills the object with the given color
	pen.fillRect(rect.x,rect.y,rect.w,rect.h); //(x,y,width,height);

}

function update(){

	rect.x += rect.speed;

	if(rect.x > W-rect.w || rect.x < 0){    //as soon as the box hits the boundary
		rect.speed *= -1;
	}
}

//func inside it needs to be called again and again
function gameloop(){

	if(game_over == true){
		clearInterval(f);
	}

	draw();
	update();
}

init();        //we want to call this once
//gameloop();    //we want to call this again and again
//a function in JS named setInterval

var f = setInterval(gameloop,100) //100 is time 100ms