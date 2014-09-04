<?php


require_once "Slim/Slim.php";
require_once '../../../config.php';

global $CFG;
\Slim\Slim::registerAutoloader ();

$app = new \Slim\Slim ();
$app->map ( '/getRoleInCourse/:id', 'getRoleInCourse' )->via ( 'GET');
$app->run ();


function getRoleInCourse($courseID) {
	global $USER;
	echo $USER->id . ": " . $USER->firstname . " " . $USER->lastname . "<br />";
	$context = context_course::instance($courseID);
	if ($roles = get_user_roles($context, $USER->id)) {
		foreach ($roles as $role) {
			echo $role->roleid.' => '.$role->name.'<br />';
			// Die erste der Rollen ist die maechtigste => Abbruch
			return;
		}
	}
	
}

function echoData($data) {
	echo "<pre>".print_r($data, true)."</pre>";
}

?>