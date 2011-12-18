
function getXmlHttpObject() {
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp = new XMLHttpRequest();
  	}
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

function getScores(size,order) {
	var xmlhttp = getXmlHttpObject();
	
	xmlhttp.onreadystatechange=function() {

		if (xmlhttp.readyState < 4 ) {
			document.getElementById((order === true?"latestScores":"scores")).innerHTML='Loading scores <img src="data/load2.gif">';
		}
		else if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById((order === true?"latestScores":"scores")).innerHTML=xmlhttp.responseText;
		}
	};
	
	xmlhttp.open("GET","http://www.chrismines.cgollner.x10.mx/html5/scoreScripts/getScores.php?size="+size+(order === true ?"&order=true":""),true);
	xmlhttp.send();
}

function sendScore(player,score,size) {
	var xmlhttp = getXmlHttpObject();
	xmlhttp.onreadystatechange=function() {

		if (xmlhttp.readyState < 4 ) {
			document.getElementById("scores").innerHTML="Updating scores...";
		}
		else if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById("scores").innerHTML=xmlhttp.responseText;
			getScores(size,false);
			getScores(size,true);
		}
	};
	xmlhttp.open("GET","http://www.chrismines.cgollner.x10.mx/html5/scoreScripts/sendScore.php?player="+player+"&score="+score+"&size="+size,true);
	xmlhttp.send();
}

function getAllScores(size) {
	getScores(size,false);
	getScores(size,true);
}
