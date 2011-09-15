
function Square () {
	this.isMine 		= false;
	this.isFlaged 		= false;
	this.isDiscovered 	= false;
	this.nMinesAround 	= 0;
	
	this.getIsMine 		 = getIsMine;
	this.setMine 		 = setMine;
	this.getIsDiscovered = getIsDiscovered;
	this.setDiscovered   = setDiscovered;
	this.getIsFlaged 	 = getIsFlaged;
	this.setFlaged 		 = setFlaged;
	this.getnMinesAround = getnMinesAround;
	this.setnMinesAround = setnMinesAround;
}

function getIsMine() {
	return this.isMine;
}

function setMine(value) {
	this.isMine = value;
}

function getIsDiscovered() {
	return this.isDiscovered;
}

function setDiscovered(value) {
	this.isDiscovered = value;
}

function getIsFlaged() {
	return this.isFlaged;
}

function setFlaged(value) {
	this.isFlaged = value;
}

function getnMinesAround() {
	return this.nMinesAround;
}

function setnMinesAround(value) {
	this.nMinesAround = value;
}