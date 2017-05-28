<?php

namespace Rajkaran\PortfolioBundle\Services;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Rajkaran\PortfolioBundle\Services\HelperService;

class CareerTimelineService{

	protected $helper;

	public function __construct(Registry $doctrine, HelperService $helper){
		$this->doctrine = $doctrine;
		$this->helper = $helper;
	}

	public function getProjectList(){
        $result = array();
		$em = $this->doctrine->getManager();
        $characterLimit = 100;

		$timeline = $em->getRepository('RajkaranPortfolioBundle:CareerTimeline')->findProjectList();

        for($i = 0, $len = sizeOf($timeline); $i < $len; $i++){
            $description = '';

            if(isset($timeline[$i]['description'])){
                $description = strip_tags($timeline[$i]['description']);
            }

            $project = $this->createProjectArray($timeline[$i]);
            $project['description'] = substr($description, 0, $characterLimit).'.....';
            array_push($result, $project);
        }

		return $result;
	}

    private function createProjectArray($timeline){
        return array('id' => $timeline['id'], 'name' => $timeline['projectName'], 'alias' => $timeline['alias']
                   , 'icon' => $timeline['icon'], 'tooltip' => $timeline['tooltip'], 'cssClass' => $timeline['cssClass'], 'description' => '');
    }

	public function getProjectDetail($alias){
		$result = array();
		$em = $this->doctrine->getManager();

		$detail = $em->getRepository('RajkaranPortfolioBundle:CareerTimeline')->findProjectDetail($alias);

        for($i = 0, $len = sizeOf($detail); $i < $len; $i++){
            $result = $detail[0];
        }

		return $result;
	}




}
