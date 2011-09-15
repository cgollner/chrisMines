<?php

$conn = mysql_connect("localhost", "cgollner", "B1o517Sj") or
			die ('Error connecting to mysql');
		
		mysql_select_db("cgollner_teste") or die('Error, query failed'.$query);
		
		$order = "score";
		if ( isset($_GET['order']) ) {
			$order = "id DESC";
		}
		$result = mysql_query("SELECT * FROM scores WHERE size = " . $_GET['size'] . " ORDER BY ". $order);
		$rows = mysql_num_rows($result);
		if ( $rows == 0 ) {
			echo 'No results yet.';
		}
		else {
		$i = 1;

		while ( ($row = mysql_fetch_array($result)) && $i <= 10 ) {
			echo $i . ': ' . $row['name'] . ' - ' . $row['score'].' seconds<br>';
			$i++;
		} 
		}

?>
