var x = -1;
var y = -1;
var timePassed = 0.0;
//var timesPlayed = 0;
var timeCount = false;
var started = -1;

function incTime() {
	if ( timeCount ) {
		timePassed = (new Date().getTime()-started)/1000.0;
		document.getElementById("timeStats").innerHTML = "Time: " + timePassed.toFixed(3);
	}
}

function Framework(size,res) {
	this.size = size;
	this.res  = res;
	this.canvas = document.getElementById("chrisMines");
	this.ctx    = this.canvas.getContext("2d");
	this.down = false;
	this.canvas.width = this.res;
	this.canvas.height=this.res;
	this.ctx.fillStyle = "red";
	this.ctx.fillText("Loading board...", 200,200);	
	this.game = new Game(this.size);
	this.status = this.game.STATUS_STANDBY;
	this.bv = new BoardViewer(this.game.getBoard(),this.res,this.ctx);
	this.reset = reset;
	this.paint = paint;
	this.canvas.addEventListener("mousemove",mouseMove,false);
	document.addEventListener("mouseup",mouseUp,false);
	document.addEventListener("mousedown",mouseDown,false);
	this.explosion = document.createElement('audio');
	if ( "" !== this.explosion.canPlayType('audio/wav')) {
        this.explosion.setAttribute('src','data/explosion.wav');
    }
	else if ( "" !== this.explosion.canPlayType('audio/mp3')) {
		this.explosion.setAttribute('src','data/explosion.mp3');
	}
	this.explosion.load();
	this.clicked = clicked;
	this.getCursorPosition = getCursorPosition;
	this.paint();
	setInterval(incTime, 1);
	document.getElementById("flagStats").innerHTML = "Flags: " + this.game.getBoard().getnFlagsUsed() + "/" + this.game.getBoard().getnMines();
}

function reset() {
	this.status = this.game.STATUS_STANDBY;
	started = -1;
	timeCount = false;
	timePassed = 0.000;
	this.game = new Game(this.size);
	this.bv.setBoard(this.game.getBoard());
	document.getElementById("flagStats").innerHTML = "Flags: " + this.game.getBoard().getnFlagsUsed() + "/" + this.game.getBoard().getnMines();
	document.getElementById("timeStats").innerHTML = "Time: 0.000";
}

function paint() {
	if ( this.down === true ) {
		this.bv.drawBoard(false,true,x,y);
	}
	else if ( this.status == this.game.STATUS_LOST ) {
		this.bv.drawBoard(true,false,0,0);
	}
	else {
		this.bv.drawBoard(false,false,0,0);
	}	
}

function getCursorPosition(e) {
	var canvas = document.getElementById("chrisMines");
    var tmpX;
    var tmpY;
    if (e.pageX && e.pageY ) {
        tmpX = e.pageX;
        tmpY = e.pageY;
    }
    else {
	    tmpX = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
	    tmpY = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    tmpX -= canvas.offsetLeft;
    tmpY -= canvas.offsetTop;

    x = Math.floor(fw.bv.getX(tmpX));
    y = Math.floor(fw.bv.getY(tmpY));
}    

function getRandomMessage() {
	var random_text = new Array (
			"You lost :(",
			"I pwned you.",
			"Yes I cheated to win, any problems?",
			"Try again next time, I promise to be fair.",
			"You just exploded an atomic bomb in your browser!!",
			"You're just a plain noob, sorry.",
			"Newsflash, you suck.");
	
	var i = Math.floor(7*Math.random());
	return random_text[i];
}

function clicked() {
	var prevStat = this.status;
	this.down = false;
	
    if ( x >= 0 && y >= 0 && x < this.game.board.boardSize && y < this.game.board.boardSize ) {
		if ( this.button != "right" ) {
			this.status = this.game.stroke(x,y);
			if ( this.status == this.game.STATUS_LOST ) {
				timeCount = false;
				this.explosion.play();
				this.paint();
				alert(getRandomMessage());
				this.reset();
			}
			else if ( this.status == this.game.STATUS_WON ) {
				this.paint();
				if ( started < 0 ) {
					alert("You were too lucky! This score doesn't count :)");
				}
				else {
					timeCount = false;
					var player=prompt("You won the game in " + timePassed.toFixed(3) + " seconds! :)\nPlease insert your name!");
					if (player && player!== "") {
					    sendScore(player,timePassed.toFixed(3),this.size);
                    }
				}
				this.reset();
			}
			else if ( prevStat == this.game.STATUS_STANDBY && this.status == this.game.STATUS_RUNNING ) {
				started = new Date().getTime();
				timePassed = 0.0;
				timeCount = true;
			}
		}
		else {
			this.game.flag(x, y);
			document.getElementById("flagStats").innerHTML = "Flags: " + this.game.getBoard().getnFlagsUsed() + "/" + this.game.getBoard().getnMines();
		}
	}
	this.paint();	

}

function mouseDown(ev) {
	fw.down = true;
	getCursorPosition(ev);
	fw.paint();
}

function mouseUp(ev) {
	mouseClicked(ev);
}

function mouseOut() {
	fw.down = false;
	fw.paint();
}
function mouseMove(ev) {
	getCursorPosition(ev);
	fw.paint();
}

function mouseClicked(ev) {
	fw.down = false;
	getCursorPosition(ev);
	fw.clicked();
}
