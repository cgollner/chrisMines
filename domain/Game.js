
function Game(boardSize) {
	this.STATUS_RUNNING = 0;
	this.STATUS_LOST    = 1;
	this.STATUS_WON     = 2;
	this.STATUS_STANDBY = 3;
	
	this.board  	= new Board(boardSize);
	this.status 	= this.STATUS_STANDBY;
	this.lastStroke = new Point(-1,-1);
	
	this.stroke = stroke;
	this.getBoard = getBoard;
	this.flag = flag;
	this.getLastStoke = getLastStroke;
}

function stroke(x,y)
{
	if ( x > this.board.getBoardSize()-1 || y > this.board.getBoardSize()-1 ) {
		return this.status;
	}
	
	if ( this.lastStroke.x == -1 && this.lastStroke.y == -1 ) {
		this.board.init(x,y);
		if ( this.board.allDiscovered() ) {
			this.status = this.STATUS_WON;
		}
		else {
			this.status = this.STATUS_RUNNING;
		}
	}
	else {
		if ( !this.board.isDiscovered(x,y) && !this.board.getSquareIsFlaged(x,y) ) {
			this.board.setSquareDiscovered(x,y);
			if ( this.board.hasMine(x,y) ) {
				this.status = this.STATUS_LOST;
			}
			else {
				this.board.setSquareDiscovered(x,y);
				if ( this.board.allDiscovered() ) {
					this.status = this.STATUS_WON;
				}
				else {
					this.status = this.STATUS_RUNNING;
				}
			}
		}
	}
	this.lastStroke.x = x;
	this.lastStroke.y = y;

	return this.status;
}

function getBoard()
{
	return this.board;
}


function flag(x,y)
{
	this.board.setSquareFlaged(x,y);
}

function getLastStroke()
{
	return this.lastStroke;
}
