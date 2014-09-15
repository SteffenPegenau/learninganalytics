<?php


require_once "Slim/Slim.php";
require_once '../../../config.php';

$context = context_system::instance();


global $CFG;
\Slim\Slim::registerAutoloader ();

$app = new \Slim\Slim ();
$app->map ( '/getRoleInCourse/:id', 'getRoleInCourse' )->via ( 'GET');
$app->map ( '/echoRole/:id', 'echoRole' )->via ( 'GET' );
$app->map ( '/latestCourseViews/:id', 'latestCourseViews' )->via ( 'GET', 'POST' );
$app->map ( '/latestActivityViews/:id', 'latestActivityViews' )->via ( 'GET', 'POST');
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
	$app = \Slim\Slim::getInstance ();
	global $DB;
	/*
	$oneDayAgo = strtotime("-1 day");
	$twoDaysAgo = strtotime("-2 days");
	$threeDaysAgo = strtotime("-3 days");
	$fourDaysAgo = strtotime("-4 days");
	$fiveDaysAgo = strtotime("-5 days");
	$sixDaysAgo = strtotime("-6 days");
	$sevenDaysAgo = strtotime("-7 days");
	$eightDaysAgo = strtotime("-8 days");
	$today = strtotime("-0 days");
	*/
	
	$students = getPersonsInCourse("Studierende", $courseID);
	$temparray = array();
	
	foreach ($students as $value) {
		//echo "<pre>" . print_r ( $value->userid, true ) . "</pre>";
		array_push($temparray, $value->userid);
	};
	//echo "<pre>" . print_r ( $temparray, true ) . "</pre>";
		
	//echo "<pre>" . print_r ( $students, true ) . "</pre>";
	
	$array = array();
	for ($i = 0; $i < 8; $i++) {
		$temp = $i + 1;
		$temp2 = strtotime("-$i days");
		//echo "<pre>temp2: " . print_r ( $temp2, true ) . "</pre>";
		$temp3 = strtotime("-$temp days");
		//echo "<pre>temp3: " . print_r ( $temp3, true ) . "</pre>";
		$sql = "SELECT
					{log}.id,
    				{log}.time,
					{log}.course,
					{log}.action,
					{log}.module,
					{log}.userid,
				COUNT(*) AS 'How often did this user view the course:'
				FROM
					{log}
				WHERE
					{log}.userid IN (".implode(',',$temparray).") AND
					{log}.action = 'view' AND
					{log}.module = 'course' AND
					{log}.course = $courseID AND
					{log}.time <= $temp2 AND
					{log}.time >= $temp3
				GROUP BY {log}.userid
				";
		$result = $DB->get_records_sql($sql);
		//echo "<pre>" . print_r ( $result, true ) . "</pre>";
		$countobjectsinresult = sizeof($result);
		//echo "<pre>" . print_r ( $result, true ) . "</pre>";
		//$subarray = array("Records" => $countobjectsinresult);
		//array_push($array, $countobjectsinresult);
		$array[$i] = $countobjectsinresult;
		//array_push($array, $subarray);
	}; // Ende der for-Schleife
	
	/*
	$now = new DateTime();
	$now->format('Y-m-d H:i:s');
	$nowTimeStamp = $now->getTimestamp();
	echo "<pre>" . print_r ( $now, true ) . "</pre>";
	echo "<pre>current date timestamp: " . print_r ( $nowTimeStamp, true ) . "</pre>";
	$month = $now->date;
	echo "<pre>current date: " . print_r ( $month, true ) . "</pre>";
	echo "<pre>timestamp one week ago: " . $sevenDaysAgo . "</pre>";
	echo "<pre>timestamp six days ago: " . $sixDaysAgo . "</pre>";
	echo "<pre>timestamp five days ago: " . $fiveDaysAgo . "</pre>";
	echo "<pre>timestamp four days ago: " . $fourDaysAgo . "</pre>";
	echo "<pre>timestamp three days ago: " . $threeDaysAgo . "</pre>";
	echo "<pre>timestamp two days ago: " . $twoDaysAgo . "</pre>";
	echo "<pre>timestamp yesterday: " . $oneDayAgo . "</pre>";
	echo "<pre>timestamp today: " . $today . "</pre>";
	*/
	
	
	//return $array;
	//echo "<pre>" . print_r ( $array, true ) . "</pre>";
	
	array_push($array, sizeof($students));
	
	//echo "<pre>" . print_r ( sizeof($students), true ) . "</pre>";
	echo json_encode( $array );
}


function latestAssignmentViews($courseID) {
	$app = \Slim\Slim::getInstance ();
	global $DB;

	$students = getPersonsInCourse("Studierende", $courseID);
	$temparray = array();

	foreach ($students as $value) {
		//echo "<pre>" . print_r ( $value->userid, true ) . "</pre>";
		array_push($temparray, $value->userid);
	};
	//echo "<pre>" . print_r ( $temparray, true ) . "</pre>";
	//echo "<pre>" . print_r ( $students, true ) . "</pre>";

	$array = array();
	for ($i = 0; $i < 8; $i++) {
		$temp = $i + 1;
		$temp2 = strtotime("-$i days");
		$temp3 = strtotime("-$temp days");
		$sql = "SELECT
					{log}.id,
    				{log}.time,
					{log}.course,
					{log}.action,
					{log}.module,
					{log}.userid,
				COUNT(*) AS 'How often did this user view this activity:'
				FROM
					{log}
				WHERE
					{log}.userid IN (".implode(',',$temparray).") AND
					{log}.action = 'view' AND
					{log}.module = 'assign' AND
					{log}.course = $courseID AND
					{log}.time <= $temp2 AND
					{log}.time >= $temp3 
					GROUP BY {log}.userid
					";
					$result = $DB->get_records_sql($sql);
					//echo "<pre>" . print_r ( $result, true ) . "</pre>";
					$countobjectsinresult = sizeof($result);
					//echo "<pre>" . print_r ( $result, true ) . "</pre>";
					//$subarray = array("Records" => $countobjectsinresult);
					//array_push($array, $countobjectsinresult);
					$array[$i] = $countobjectsinresult;
					//array_push($array, $subarray);
	}; // Ende der for-Schleife


	//return $array;
	//echo "<pre>" . print_r ( $array, true ) . "</pre>";

	array_push($array, sizeof($students));

	//echo "<pre>" . print_r ( sizeof($students), true ) . "</pre>";
	echo json_encode( $array );
}


function getPersonsInCourse($role, $course) {
	global $DB;
	$sql = "SELECT
				{role_assignments}.id,
				{role_assignments}.roleid,
				{role_assignments}.userid,

				{context}.instanceid as course,

				{role}.archetype,

				{user}.firstname,
				{user}.lastname
			FROM
				{role_assignments}, {context}, {role}, {user}
			WHERE
				{role_assignments}.contextid = {context}.id AND
				{context}.instanceid = ".$course." AND
				{role}.id = {role_assignments}.roleid AND
				{user}.id = {role_assignments}.userid AND
				{role}.name LIKE '".$role."'";
	return $DB->get_records_sql($sql);
}

?>