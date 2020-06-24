
function init(){
	canvas = document.getElementById("mycanvas");
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66; //cell size
	food = getRandomFood();
	game_over = false;
	score = 5;

	food_img = new Image();    //food image
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});    //0th index-->x:5,y:0,1st-->x:4,y:0.....4th--> x:1,y:0
			}

			// for(var i=1;i<=this.init_len;i--){
			// 	this.cells.push({x:i,y:0});
			// } we could have also written in this way

		},

		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;           //x:5,y:0 --> head bana snake ka.
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);	
			}//iski wajah se snake kabhi bhi 0,0 se start nahi hoga kyuki humne x=1,y=0 me 50 multiply kiya hai.
		},

		updateSnake:function(){
			//this.cells.pop();     //x:1,y:0 this got popped
			headX = this.cells[0].x;
			headY = this.cells[0].y;

			//collision with food
			if(headX == food.x && headY == food.y){
				food = getRandomFood();
				score++;
			}

			else{
				this.cells.pop();
			}

			var nextX,nextY;

			if(this.direction == "right"){
				nextX = headX + 1;
				nextY = headY; 
			}

			else if(this.direction == "left"){
				nextX = headX - 1;
				nextY = headY; 
			} 

			else if(this.direction == "down"){
				nextX = headX;
				nextY = headY + 1; 
			}

			else if(this.direction == "up"){
				nextX = headX;
				nextY = headY - 1; 
			} 

			this.cells.unshift({x:nextX,y:nextY});

			//to check the collision with boundaries
			//var lastX = Math.round(W/cs);
			//var lastY = Math.round(H/cs);

			if(this.cells[0].x*cs > (W-cs) || this.cells[0].x < 0 || this.cells[0].y*cs > (H-cs) || this.cells[0].y < 0){
				game_over = true;
			}
		}
	};

	snake.createSnake();

	function keyPressed(e){

		if(e.key == "ArrowRight"){
			snake.direction = "right";
		}

		else if(e.key == "ArrowDown"){
			snake.direction = "down";
		}

		else if(e.key == "ArrowLeft"){
			snake.direction = "left";
		}

		else if(e.key == "ArrowUp"){
			snake.direction = "up";
		}
	}

	document.addEventListener('keydown',keyPressed);
}

function draw(){

	//erase the old screen
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto";
	pen.fillText(score,45,50);
}

function update(){

	snake.updateSnake();
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x: foodX,
		y: foodY,
		color: "red"
	}

	return food;
}

function gameloop(){

	if(game_over == true){
		clearInterval(f);       //this must be called inside gameloop
		alert("GAME OVER");
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,100);