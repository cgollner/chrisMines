
function Board(boardSize) {
	this.boardSize = boardSize;
	this.nMines = Math.floor(0.15625*(boardSize*boardSize));
	this.nFlagsUsed = 0;
	this.nDiscovered = 0;
	this.squares = new Array(boardSize);
	var i,j;
	for (i = 0; i < boardSize; i++) {
		this.squares[i] = new Array(boardSize);
		for (j = 0; j < boardSize; j++) {
			this.squares[i][j] = new Square();
		}
	}	
	this.adjacents = new Array(
			new Point(-1,-1),
			new Point( 0,-1),
			new Point( 1,-1),
			new Point(-1, 0),
			new Point( 1, 0),
			new Point(-1, 1),
			new Point( 0, 1),
			new Point( 1, 1)
		);
	
	this.getBoardSize        = getBoardSize;
	this.getnMines           = getnMines;
	this.getnFlagsUsed       = getnFlagsUsed;
	this.getnDiscovered      = getnDiscovered;
	this.setnDiscovered      = setnDiscovered;
	this.isDiscovered        = isDiscovered;
	this.assignMines         = assignMines;
	this.countMines          = countMines;
	this.discoverAllAround   = discoverAllAround;
	this.setSquareDiscovered = setSquareDiscovered;
	this.allDiscovered       = allDiscovered;
	this.setSquareFlaged     = setSquareFlaged;
	this.getSquareIsFlaged   = getSquareIsFlaged;
	this.init                = init;
	this.getCountingMatrix   = getCountingMatrix;
	this.hasMine             = hasMine;
	this.nMinesAround        = nMinesAround;
}

function getBoardSize() {
	return this.boardSize;
}

function getnMines() {
	return this.nMines;
}

function getnFlagsUsed() {
	return this.nFlagsUsed;
}

function getnDiscovered() {
	return this.nDiscovered;
}

function setnDiscovered(nDiscovered) {
	this.nDiscovered = nDiscovered;
}

function isDiscovered(x,y) {
	return this.squares[y][x].getIsDiscovered();
}

function init(x,y) {
	this.assignMines(x,y);
	this.countMines();
	this.setSquareDiscovered(x,y);
}

function assignMines( x, y ){
	nMinesAssigned = 0;
	while ( nMinesAssigned < this.nMines ) {
		i = Math.floor(Math.random()*this.boardSize);
		j = Math.floor(Math.random()*this.boardSize);
		if ( !this.squares[i][j].getIsMine() && i != y && j != x ) {
			res = Math.floor(Math.random()*2);
			if ( res == 0  ) {
				this.squares[i][j].setMine(true);
				nMinesAssigned++;
			}
		}
	}
}

function countMines() {
	var matrix = this.getCountingMatrix();
	var i,j;
	for ( i = 0; i < this.boardSize; i++ ) {
		for ( j = 0; j < this.boardSize; j++ ) {
			this.squares[i][j].setnMinesAround(matrix[i][j]);
		}
	}
}

function discoverAllAround(x,y) {
	this.squares[y][x].setDiscovered(true);
	this.nDiscovered++;
	if ( this.squares[y][x].getIsFlaged() ) {
		this.setSquareFlaged(x,y);
	}

	var a;
	if ( this.squares[y][x].getnMinesAround() == 0 ) {
		for ( a = 0; a < 8; a++ ) {
			nx = x + this.adjacents[a].x;
			ny = y + this.adjacents[a].y;
			if ( nx >= 0 && ny >= 0 && nx < this.boardSize && ny < this.boardSize ) {
				if ( !this.squares[ny][nx].getIsDiscovered() ) {
					this.discoverAllAround(nx,ny);
				}
			}
		}
	}
}

function setSquareDiscovered(x,y) {
	if ( !this.squares[y][x].getIsDiscovered() ) {
		if ( this.squares[y][x].getnMinesAround() == 0 && !this.squares[y][x].getIsMine() ) {
			this.discoverAllAround(x,y);
		}
		else {
			this.squares[y][x].setDiscovered(true);
			this.nDiscovered++;
		}
	}
}

function allDiscovered() {
	return ((this.boardSize*this.boardSize)-this.nMines) == this.nDiscovered;
}

function setSquareFlaged( x, y) {
	if ( !this.squares[y][x].getIsFlaged() && !this.squares[y][x].getIsDiscovered() && this.nFlagsUsed < this.nMines ) {
		this.squares[y][x].setFlaged(true);
		this.nFlagsUsed++;
	}
	else if ( this.squares[y][x].getIsFlaged() ) {
		this.squares[y][x].setFlaged(false);
		this.nFlagsUsed--;
	}
}

function getSquareIsFlaged(x,y) {
	return this.squares[y][x].getIsFlaged();
}

function getCountingMatrix() {
	matrix = new Array(this.boardSize);
	var i,j,a;
	for ( i = 0; i < this.boardSize; i++ ) {
		matrix[i] = new Array(this.boardSize);
		for ( j = 0; j < this.boardSize; j++ ) {
			matrix[i][j] = 0;
			for ( a = 0; a < 8; a++ ) {
				x = j + this.adjacents[a].x;
				y = i + this.adjacents[a].y;

				if ( x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize ) {
					if ( this.squares[y][x].getIsMine() ) {
						matrix[i][j]++;
					}
				}
			}
		}
	}
	return matrix;
}

function hasMine(x,y) {
	return this.squares[y][x].getIsMine();
}

function nMinesAround(x,y) {
	return this.squares[y][x].getnMinesAround();
}
