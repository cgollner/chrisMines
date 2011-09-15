<?php

$conn = mysql_connect("localhost", "cgollner", "B1o517Sj") or
			die ('Error connecting to mysql');
		
		mysql_select_db("cgollner_teste") or die('Error, query failed'.$query);

$statement = sprintf("INSERT INTO scores (name,score,date,time,size) VALUES('%s','%f',UTC_DATE(),UTC_TIME(),%d)",
                $_GET['player'],
                $_GET['score'],
                $_GET['size']);

mysql_query($statement,$conn) or 
			die('Mysql query failed: ' .$statement . '<br>' . mysql_error());
?>
