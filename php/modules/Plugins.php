<?php

###
# @name			Plugins Module
# @copyright	2015 by Tobias Reich
###

if (!defined('LYCHEE')) exit('Error: Direct access is not allowed!');

class Plugins implements \SplSubject {

	private $files		= array();
	private $observers	= array();

	public $action	= null;
	public $args	= null;

	public function __construct($files, $database, $settings) {

		if (!isset($files)) return false;

		# Init vars
		$plugins		= $this;
		$this->files	= $files;

		# Load plugins
		foreach ($this->files as $file) {

			if ($file==='') continue;

			$file = LYCHEE_PLUGINS . $file;

			if (file_exists($file)===false) {
				Log::warning($database, __METHOD__, __LINE__, 'Could not include plugin. File does not exist (' . $file . ').');
				continue;
			}

			include($file);

		}

		return true;

	}

	public function attach(\SplObserver $observer) {

		if (!isset($observer)) return false;

		$className = get_class ($observer);
		# Add observer
		$this->observers[$className] = $observer;

		return true;

	}

	public function detach(\SplObserver $observer) {

		if (!isset($observer)) return false;

		$className = get_class ($observer);

		# Remove observer
		if (in_array($className, $this->observers)) unset($this->observers[$className]);

		return true;

	}

	public function notify() {

		# Notify each observer
		foreach ($this->observers as $value) $value->update($this);

		return true;

	}

	public function activate($action, $args, $return) {

		if (!isset($action, $args)) return false;

		# Save vars
		$this->action	= $action;
		$this->args		= $args;
		$this->return	= $return;

		# Notify observers
		$this->notify();

		return true;

	}

	public function check($fn) {
		try {
			$reflectionMethod = new ReflectionMethod($fn);
		}
		catch(ReflectionException $e)
		{
			exit('Error: Called function not found!');
		}

		list($className, $functionName) = explode('::', $fn);
		if(!array_key_exists($className, $this->observers)) {
			exit('Error: Called function not found!');
		}
		echo json_encode($reflectionMethod->invoke($this->observers[$className]));
		return true;
	}

}

?>