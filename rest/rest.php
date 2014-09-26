<?php


require_once "Slim/Slim.php";
require_once '../../../config.php';
require_once 'observer.php';

$context = context_system::instance();


global $CFG;
\Slim\Slim::registerAutoloader ();

$app = new \Slim\Slim ();
$app->map ( '/uniqueViews/:id', 'uniqueViews' )->via ( 'GET');
$app->run ();

function uniqueViews($courseID) {
	$observer = new observer($courseID);
	echo json_encode($observer -> collectUniqueViews());
}
?>