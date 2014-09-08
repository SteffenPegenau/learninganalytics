<?php


require_once "Slim/Slim.php";
require_once '../../../config.php';

$context = context_system::instance();


global $CFG;
\Slim\Slim::registerAutoloader ();

$app = new \Slim\Slim ();
$app->map ( '/getRoleInCourse/:id', 'getRoleInCourse' )->via ( 'GET');
$app->map ( '/echoRole/:id', 'echoRole' )->via ( 'GET' );
$app->map ( '/latestCourseViews/:id', 'latestCourseViews' )->via ( 'GET' );
$app->run ();


function echoRole($courseID) {
	$context = context_course::instance($courseID);
	$testTeacher = has_capability('mod/learninganalytics:teacherView', $context);
	$testStudent = has_capability('mod/learninganalytics:studentView', $context);
	echo "<pre>".print_r($testTeacher , true)."</pre>";
	echo "<pre>".print_r($testStudent , true)."</pre>";
}

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

function latestCourseViews($courseID) {
	GLOBAL $DB;
	$sql = "SELECT
				{log}.id,
    			{log}.time,
				{log}.course,
				{log}.action,
				{log}.module,
				{log}.time
			FROM
				{log}
			WHERE
				{log}.action = 'view' AND
				{log}.module = 'course' AND
				{log}.course = $courseID
			";

	$result = $DB->get_records_sql($sql);
	$array = array("Result" => "OK", "Records" => $result );
	
	$now = new DateTime();
	$now->format('Y-m-d H:i:s');
	$nowTimeStamp = $now->getTimestamp();
	echo "<pre>" . print_r ( $now, true ) . "</pre>";
	echo "<pre>current date timestamp: " . print_r ( $nowTimeStamp, true ) . "</pre>";
	
	$month = $now->date;
	echo "<pre>" . print_r ( $month, true ) . "</pre>";
	
	$sevendaysago = mktime(15,07,50, 09, 08, 2014);
	echo "<pre>" . print_r ( $sevendaysago, true ) . "</pre>";
	
	echo "<pre>" . print_r ( $array, true ) . "</pre>";
}

?>