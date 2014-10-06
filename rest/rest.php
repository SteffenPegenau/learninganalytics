<?php


require_once "Slim/Slim.php";
require_once '../../../config.php';
require_once 'observer.php';
require_once 'lib.php';

$context = context_system::instance();


global $CFG;
\Slim\Slim::registerAutoloader ();

$app = new \Slim\Slim ();
$app->map ( '/uniqueViews/:id', 'uniqueViews' )->via ( 'GET');
$app->map ('/detailedModView/:course/:modName(/:instance)', 'detailedModView')->via ('GET');
$app->run ();

function uniqueViews($courseID) {
	$observer = new observer($courseID);
	echo json_encode($observer -> collectUniqueViews());
}

/*
 * Gives stats about this module in the course or - if given - about a special mod instance
 */
function detailedModView($courseID, $modName, $instance = -1) {
	$name = localizedNameToModName($modName, $courseID);
	//echo "<pre>".print_r($name, true)."</pre>";
        $observer = new observer($courseID);
        
        if($instance < 0) {
            echo json_encode($observer->getModStatsInCourse($name));
        }
        else {
            // It's about this mod in this course
        }
}

?>