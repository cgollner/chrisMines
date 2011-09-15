var x = -1;
var y = -1;
var timesPlayed = 0;

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
	this.started = -1;
	this.bv = new BoardViewer(this.game.getBoard(),this.res,this.res,this.ctx);
	this.reset = reset;
	this.paint = paint;
	this.canvas.addEventListener("mousemove",mouseMove,false);
	document.addEventListener("mouseup",mouseUp,false);
	document.addEventListener("mousedown",mouseDown,false);
	this.explosion = document.createElement('audio');
	if ( "" != this.explosion.canPlayType('audio/wav')) {
        this.explosion.setAttribute('src','data/explosion.wav');
    }
	else if ( "" != this.explosion.canPlayType('audio/mp3')) {
		this.explosion.setAttribute('src','data/explosion.mp3');
	}
	this.explosion.load();
	this.clicked = clicked;
	this.getCursorPosition = getCursorPosition;
	this.paint();
}

function reset() {
	this.status = this.game.STATUS_STANDBY;
	this.started = -1;
	this.game = new Game(this.size);
	this.bv.setBoard(this.game.getBoard());
}

function paint() {
	if ( this.down == true ) {
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
	canvas = document.getElementById("chrisMines");
    var tmpX;
    var tmpY;
    if (e.pageX != undefined && e.pageY != undefined) {
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

function clicked() {
	prevStat = this.status;
	this.down = false;
    if ( x >= 0 && y >= 0 && x < this.game.board.boardSize && y < this.game.board.boardSize ) {
		if ( this.button != "right" ) {
			this.status = this.game.stroke(x,y);
			if ( this.status == this.game.STATUS_LOST ) {	
				this.explosion.play();
				this.paint();
				alert("You lost :(");
				this.reset();
			}
			else if ( this.status == this.game.STATUS_WON ) {
				this.paint();
				if ( this.started < 0 ) {
					alert("You were too lucky! This score doesn't count :)");
				}
				else {
					var d=new Date();			
					var now = (d.getTime()-this.started)/1000.0;
					var player=prompt("You won the game in " + now + " seconds! :)\nPlease insert your name!");
					if (player!=null && player!="") {
						sendScore(player,now,this.size);
	  				}
				}
				this.reset();
			}
			else if ( prevStat == this.game.STATUS_STANDBY && this.status == this.game.STATUS_RUNNING ) {
				var d=new Date();			
				this.started = d.getTime();
			}
		}
		else {
			this.game.flag(x, y);
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

function mouseOut(ev) {
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
