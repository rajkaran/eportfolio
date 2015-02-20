<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class FrontEndController extends Controller {
    
    public function homeAction(Request $request) {
		$aboutMeContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:AboutMe')
			->findFirstRowOfAboutMe();
			
		$homeContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:Home')
			->findFirstRowOfHome();
		
		$projectContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findProjectByName('ANZO');
		
		
		
		return $this->render('RajkaranPortfolioBundle:Default:home.html.twig', array('aboutMe'=>$aboutMeContent, 'home'=>$homeContent, 'career'=>$projectContent));
    }
	
	public function careerTimelineAction(Request $request) {
		$projects = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findAllProjects();
		
		//print_r($projects);
				
		$serializer = $this->container->get('serializer');
		$project = $serializer->serialize($projects, 'json');
		return new Response($project);		
    }
	
	
	
}
