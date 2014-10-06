<?php
require_once '../../../config.php';

$courseid = 2364;

$coursecontext = context_course::instance($courseid);
$capability = 'mod/learninganalytics:teacherview';

$bool = has_capability($capability, $coursecontext);

echoData($bool);

function echoData($data) {
	echo "<pre>".print_r($data, true)."</pre>";
}

?>