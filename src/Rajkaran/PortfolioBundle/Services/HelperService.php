<?php

namespace Rajkaran\PortfolioBundle\Services;

use Doctrine\Bundle\DoctrineBundle\Registry;

class HelperService{

	public function __construct(Registry $doctrine){
		$this->doctrine = $doctrine;
	}



	//Get the todays date
	public function getTodayDate(){
		date_default_timezone_set ( "America/Toronto" );
		return date('Y-m-d');
	}

	//Get the time at the moment it is requested
	public function getCurrentTime(){
		date_default_timezone_set ( "America/Toronto" );
		return date('H:i:s');
	}

	//Get the hand (hour, minute, second ) of the time
	public function getTimeHand($time, $hand){
		$timeArray = explode(":", $time);

		$result = $result = $timeArray[0];

		switch( strtolower($hand) ){
			case "minute":
				$result = $timeArray[1];
			case "second":
				$result = $timeArray[2];
		}

		return $result;
	}

	//Get a date before number of specific days
	public function subtractDays($date, $days){
		$date = new \DateTime($date);
		$date->sub(new \DateInterval('P'.$days.'D'));
		return $date->format('Y-m-d');
	}

	//Get a date before number of specific days
	public function addDays($date, $days){
		$date = new \DateTime($date);
		$date->add(new \DateInterval('P'.$days.'D'));
		return $date->format('Y-m-d');
	}

	/* Converts number into doubled digit string
	 * for example - accepts 1 or 45 and returns 01 or 45 respectively
	 */
	public function doubleDigitString($number){
		$result = (string)$number;

		if(strlen((string)$number) < 2){
			$result = "0".$result;
		}

		return $result;
	}

	/* This method breaks the time in seconds recursively into days, hours, minutes, seconds format.
	 * Accepts an associative array like array("day"=>0, "hour"=>0, "minute"=>0, "second"=>172300).
	 * Returns the break down like array ( [day] => 1 [hour] => 23 [minute] => 51 [second] => 40 ).
	 */
	public function breakTimeintoDays($array){

		if( $array['second'] > 86399 && isset($array['day']) ){

			$array['day'] = floor($array['second'] / 86400);
			$array['second'] = $array['second'] % 86400;

			$array = $this->breakTimeintoDays($array);
		}
		else if( $array['second'] > 3599 && isset($array['hour']) ){

			$array['hour'] = floor($array['second'] / 3600);
			$array['second'] = $array['second'] % 3600;

			$array = $this->breakTimeintoDays($array);
		}
		else if( $array['second'] > 59 && isset($array['minute']) ){

			$array['minute'] = floor($array['second'] / 60);
			$array['second'] = $array['second'] % 60;

			$array = $this->breakTimeintoDays($array);
		}

		return $array;
	}

	/* This method accepts the string to search and an 2D array
	 * Method is the implementation of in_array() function but for 2D array
	 * Returns array with a specific element
	 */
	public function getArray($needle, $haystack){
		$len = sizeOf($haystack);

		$result = false;

		for($i=0; $i<$len; $i++){
			if(in_array($needle, $haystack[$i]) == true){
				$result = $haystack[$i];
				$i = $len;
			}
		}

		return $result;
	}

	/* This method accepts the string to search and an 2D array
	 * Method is the implementation of in_array() function but for 2D array
	 * Returns index if needle found
	 */
	public function getIndex($needle, $haystack){
		$len = sizeOf($haystack);

		$result = false;

		for($i=0; $i<$len; $i++){
			if(in_array($needle, $haystack[$i]) == true){
				$result = $i;
				$i = $len;
			}
		}

		return $result;
	}




}
