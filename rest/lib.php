<?php


/**
 * Translates the localized ModName to the real Mod-Name. Example: File => resource 
 * 
 * @param string $localizedModName For example 'File'
 * @return string example: resource
 */
function localizedNameToModName($localizedModName, $courseID) {
	GLOBAL $USER;

	$course = get_course($courseID, false);
	$course_modinfo = new course_modinfo($course,$USER->id);
	$moduleNames = $course_modinfo->get_used_module_names();
	
	foreach ($moduleNames as $modName => $localizedName) {
		if($localizedName == $localizedModName) {
			return $modName;
		}
	}
	return "Unknown";
}

?>