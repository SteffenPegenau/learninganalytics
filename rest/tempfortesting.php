<?php

require_once '../../../config.php';
$timestamp = strtotime("11-12-10");
$format = "d.m.Y H:i:s";

$date = date($format, $timestamp);
echoData($date);

function echoData($data) {
	echo "<pre>".print_r($data, true)."</pre>";
}



?>
