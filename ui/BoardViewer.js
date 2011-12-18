
var mineReady = false;
var brokenMineReady = false;
var flagReady = false;
var crossedFlagReady = false;
var numberReady = new Array(false,false,false,false,false,false,false,false);

/**
 * BoardViewer
 * 
 */
function BoardViewer(board,w,s,ctx) {
	this.FILL       = "rgb(185,185,185)";
	this.DISCOVERED = "rgb(230,230,230)";
	this.TOP        = "rgb(232,232,232)";
	this.LEFT       = "rgb(211,211,211)";
	this.RIGHT      = "rgb(141,141,141)";
	this.BOTTOM     = "rgb(62,62,62)";

	this.ctx = ctx;

	this.board = board;
	this.size = w;
	this.squareSize = w/this.board.getBoardSize();
	this.size = (this.size/this.squareSize)*this.squareSize;
	this.border = 0.1*this.squareSize;			
	this.drawBoard = drawBoard;
	this.getX = getX;
	this.getY = getY;
	this.canvasGrid = document.createElement('canvas');
	this.canvasGrid.width =  document.getElementById('chrisMines').width;
	this.canvasGrid.height = document.getElementById('chrisMines').height;
	this.canvasGridCtx = this.canvasGrid.getContext('2d');

	this.setBoard = setBoard;
	this.drawGrid = drawGrid;
	this.drawGrid();	
	this.mine = new Image();
	this.mine.onload = function () {
		mineReady = true;
	};
	this.mine.src="data/mine.png";

	this.brokenMine = new Image();
	this.brokenMine.onload = function () {
		brokenMineReady = true;
	};
	this.brokenMine.src="data/brokenMine.png";
	
	this.flag = new Image();
	this.flag.onload = function () {
		flagReady = true;
	};
	this.flag.src="data/flag.png";
	
	this.crossedFlag = new Image();
	this.crossedFlag.onload = function () {
		crossedFlagReady = true;
	};	
	this.crossedFlag.src="data/crossedFlag.png";
	
	this.numbers = new Array(8);

	this.numbers[0] = new Image();
	this.numbers[0].onload = function() {
		numberReady[0] = true;
	};
	this.numbers[0].src = "data/1.png";

	this.numbers[1] = new Image();
	this.numbers[1].onload = function() {
		numberReady[1] = true;
	};
	this.numbers[1].src = "data/2.png";

	this.numbers[2] = new Image();
	this.numbers[2].onload = function() {
		numberReady[2] = true;
	};
	this.numbers[2].src = "data/3.png";

	this.numbers[3] = new Image();
	this.numbers[3].onload = function() {
		numberReady[3] = true;
	};
	this.numbers[3].src = "data/4.png";

	this.numbers[4] = new Image();
	this.numbers[4].onload = function() {
		numberReady[4] = true;
	};
	this.numbers[4].src = "data/5.png";

	this.numbers[5] = new Image();
	this.numbers[5].onload = function() {
		numberReady[5] = true;
	};
	this.numbers[5].src = "data/6.png";

	this.numbers[6] = new Image();
	this.numbers[6].onload = function() {
		numberReady[6] = true;
	};
	this.numbers[6].src = "data/7.png";

	this.numbers[7] = new Image();
	this.numbers[7].onload = function() {
		numberReady[7] = true;
	};
	this.numbers[7].src = "data/8.png";
}

function setBoard ( board ) {
	this.board = board;
}

function drawGrid() {
	var i,j;
	for ( i = 0; i < this.size; i += this.squareSize ) {
		for ( j = 0; j < this.size; j+= this.squareSize ) {
			this.canvasGridCtx.fillStyle=this.FILL;
			this.canvasGridCtx.fillRect(j,i, this.squareSize, this.squareSize);

			this.canvasGridCtx.fillStyle = this.TOP;
			this.canvasGridCtx.fillRect(j,i, this.squareSize, this.border);

			this.canvasGridCtx.fillStyle=this.LEFT;
			this.canvasGridCtx.fillRect(j, i, this.border, this.squareSize);

			this.canvasGridCtx.fillStyle=this.BOTTOM;
			this.canvasGridCtx.fillRect(j, i+this.squareSize-this.border, this.squareSize, this.border);

			this.canvasGridCtx.fillStyle=this.RIGHT;
			this.canvasGridCtx.fillRect(j+this.squareSize-this.border, i, this.border, this.squareSize);

			this.canvasGridCtx.fillStyle=this.LEFT;
			this.canvasGridCtx.beginPath();
			this.canvasGridCtx.moveTo(j,i+this.squareSize-this.border);
			this.canvasGridCtx.lineTo(j+this.border,i+this.squareSize-this.border);
			this.canvasGridCtx.lineTo(j,i+this.squareSize);
			this.canvasGridCtx.closePath();
			this.canvasGridCtx.fill();

			this.canvasGridCtx.fillStyle=this.BOTTOM;
			this.canvasGridCtx.beginPath();
			this.canvasGridCtx.moveTo(j+this.squareSize,i+this.squareSize);

			this.canvasGridCtx.lineTo(j+this.squareSize-this.border,i+this.squareSize);
			this.canvasGridCtx.lineTo(j+this.squareSize-this.border,i+this.squareSize-this.border);
			this.canvasGridCtx.closePath();
			this.canvasGridCtx.fill();

			this.canvasGridCtx.fillStyle=this.TOP;
			this.canvasGridCtx.beginPath();
			this.canvasGridCtx.moveTo(j+this.squareSize-this.border,i);
			this.canvasGridCtx.lineTo(j+this.squareSize,i);
			this.canvasGridCtx.lineTo(j+this.squareSize-this.border,i+this.border);
			this.canvasGridCtx.closePath();
			this.canvasGridCtx.fill();

			this.canvasGridCtx.fillStyle=this.TOP;
			this.canvasGridCtx.beginPath();
			this.canvasGridCtx.moveTo(j,i);
			this.canvasGridCtx.lineTo(j+this.border,i);
			this.canvasGridCtx.lineTo(j+this.border,i+this.border);
			this.canvasGridCtx.closePath();
			this.canvasGridCtx.fill();
		}
	}
}

function drawBoard( showAll, mouseDown, downX, downY ) {		
	var i,j;
	this.ctx.drawImage(this.canvasGrid,0,0);
	for ( i = 0; i < this.size; i += this.squareSize ) {
		for ( j = 0; j < this.size; j+= this.squareSize ) {

			x = Math.floor(j/this.squareSize);
			y = Math.floor(i/this.squareSize);

			if ( x >= this.board.getBoardSize() || y >= this.board.getBoardSize() ) {
				continue;
			}
			
			/* Just mouse down */
			if ( mouseDown && x == downX && y == downY && !this.board.isDiscovered(x,y) && !this.board.getSquareIsFlaged(x,y)) {
				this.ctx.fillStyle=this.DISCOVERED;
				this.ctx.fillRect(j, i, this.squareSize, this.squareSize);
				this.ctx.lineWidth = 0.5;
				this.ctx.strokeStyle=this.FILL;
				this.ctx.strokeRect(j, i, this.squareSize, this.squareSize);	
			}
			
			/* game lost */
			else if ( showAll ) {
					if ( this.board.hasMine(x,y) ) {
						if ( this.board.isDiscovered(x,y) ) {
							while(!brokenMineReady);
							this.ctx.drawImage(this.brokenMine,j+this.border,i+this.border,this.squareSize-(this.border*2),this.squareSize-(this.border*2));
						}
						else {
						
							while(!mineReady);
							this.ctx.drawImage(this.mine,j+this.border,i+this.border,this.squareSize-(this.border*2),this.squareSize-(this.border*2));
						}
					}
					else {
						if ( this.board.getSquareIsFlaged(x,y) ) {
							if ( !this.board.hasMine(x,y) ) {
								while ( !crossedFlagReady );
								this.ctx.drawImage(this.crossedFlag,j+this.border,i+this.border,this.squareSize-(this.border*2),this.squareSize-(this.border*2));
							}
						}
					
						else if ( this.board.isDiscovered(x,y) ) {
							this.ctx.fillStyle=this.DISCOVERED;
							this.ctx.fillRect(j, i, this.squareSize, this.squareSize);
							this.ctx.lineWidth = 0.5;
							this.ctx.strokeStyle=this.FILL;
							this.ctx.strokeRect(j, i, this.squareSize, this.squareSize);
							if ( this.board.nMinesAround(x,y) > 0 && !this.board.hasMine(x,y) ) {
								while(!numberReady[this.board.nMinesAround(x,y)-1]);
								this.ctx.drawImage(this.numbers[this.board.nMinesAround(x,y)-1],j,i,this.squareSize,this.squareSize);
							}
						}
					}
			}
			else {
				if ( this.board.getSquareIsFlaged(x,y) ) {
					while ( !flagReady );
					this.ctx.drawImage(this.flag,j+this.border,i+this.border,this.squareSize-(this.border*2),this.squareSize-(this.border*2));		
				}
				else if ( this.board.isDiscovered(x,y) ) {
					this.ctx.fillStyle=this.DISCOVERED;
					this.ctx.fillRect(j, i, this.squareSize, this.squareSize);
					this.ctx.lineWidth = 0.5;
					this.ctx.strokeStyle=this.FILL;
					this.ctx.strokeRect(j, i, this.squareSize, this.squareSize);
					if ( this.board.nMinesAround(x,y) > 0 && !this.board.hasMine(x,y) ) {
						while(!numberReady[this.board.nMinesAround(x,y)-1]);
						this.ctx.drawImage(this.numbers[this.board.nMinesAround(x,y)-1],j,i,this.squareSize,this.squareSize);
					}
				}
			}
		}
	}
}

function getY(i)
{
	return i/this.squareSize;
}

function getX(i)
{
	return i/this.squareSize;
}
