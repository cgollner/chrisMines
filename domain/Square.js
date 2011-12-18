
/**
 * Class representing a Square from the Minesweeper game. 
 * @author Christian Göllner
 */
function Square () {
	this.isMine         = false;
	this.isFlaged       = false;
	this.isDiscovered   = false;
	this.nMinesAround   = 0;
	
	this.getIsMine          = getIsMine;
	this.setMine            = setMine;
	this.getIsDiscovered    = getIsDiscovered;
	this.setDiscovered      = setDiscovered;
	this.getIsFlaged        = getIsFlaged;
	this.setFlaged          = setFlaged;
	this.getnMinesAround    = getnMinesAround;
	this.setnMinesAround    = setnMinesAround;
}

/**
 * Checks wheter the current square is a mine.
 * @return true if yes, false otherwise.
 */
function getIsMine() {
	return this.isMine;
}

/**
 * Sets the current square as being (or not) a mine.
 * @param value .The boolean value to set.
 */
function setMine(value) {
	this.isMine = value;
}

/**
 * Checks if the square was already discovered in the game.
 * @return true if yes, false otherwise.
 */
function getIsDiscovered() {
	return this.isDiscovered;
}

/**
 * Sets the current square as being (or not) discovered in the game.
 * @param value . The boolean value to set.
 */
function setDiscovered(value) {
	this.isDiscovered = value;
}

/**
 * Checks wheter the square is currently "flagged" in the game.
 * @return true if yes, false otherwise.
 */
function getIsFlaged() {
	return this.isFlaged;
}

/**
 * Sets the current square as being(or not) "flagged" in the game.
 * @param value . The boolean value to set.
 */
function setFlaged(value) {
	this.isFlaged = value;
}

/**
 * Returns the number of squares adjacent to the current square, which are a mine.
 */
function getnMinesAround() {
	return this.nMinesAround;
}

/**
 * Sets the number of squares adjacent to the current square, which are a mine.
 * @param value . A non negative integer in a range from 0 to 8.
 */
function setnMinesAround(value) {
	this.nMinesAround = value;
}
