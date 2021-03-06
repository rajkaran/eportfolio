<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Rajkaran\PortfolioBundle\Entity\Home;
use Rajkaran\PortfolioBundle\Entity\CareerTimeline;
use Rajkaran\PortfolioBundle\Entity\AboutMe;
use Symfony\Component\HttpFoundation\Request;
use Rajkaran\PortfolioBundle\Form\Type\HomeType;
use Rajkaran\PortfolioBundle\Form\Type\AboutMeType;
use Rajkaran\PortfolioBundle\Form\Type\CareerTimelineType;

class BackEndController extends Controller {

	public function aboutMeAction(Request $request) {

		//$hash = password_hash('n01d@Indi@', PASSWORD_BCRYPT, array("cost" => 12));
		//echo $hash;

		$projects = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findAllProjects();

		$aboutMeContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:AboutMe')
			->findFirstRowOfAboutMe();

		$aboutMe = new AboutMe();

		if ($aboutMeContent) {
			$aboutMe->setDetail( $aboutMeContent[0]->getDetail() );
		}

        $form = $this->createForm(AboutMeType::class, $aboutMe, array(
		    'action' => $this->generateUrl('admin_about_me'),
		    'method' => 'POST',
		));

		$form->handleRequest($request);

		if ($form->isValid()) {

			$em = $this->getDoctrine()->getManager();
			$rowToUpdate = $em->getRepository('RajkaranPortfolioBundle:AboutMe')->findFirstRowOfAboutMe();

			if ($rowToUpdate) {
				$rowToUpdate[0]->setDetail( $form->get('detail')->getData() );
			}
			else{
				$em = $this->getDoctrine()->getManager();
				$em->persist($aboutMe);
			}

			$em->flush();

			return $this->redirect($this->generateUrl('admin_about_me'));
		}

        return $this->render('RajkaranPortfolioBundle:Admin:aboutMe.html.twig', array(
            'form' => $form->createView(), 'projects'=> $projects, 'pageName' => 'Home')
		);

    }

	public function careerTimelineAction(Request $request) {

		$projects = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findAllProjects();

		$careerTimeline = new CareerTimeline();

        $form = $this->createForm(CareerTimelineType::class, $careerTimeline, array(
		    'action' => $this->generateUrl('admin_career_timeline'),
		    'method' => 'POST',
		));

		$form->handleRequest($request);

		if ($form->isValid()) {

			$em = $this->getDoctrine()->getManager();
			$em->persist($careerTimeline);
			$em->flush();

			return $this->redirect($this->generateUrl('admin_career_timeline'));
		}

		return $this->render('RajkaranPortfolioBundle:Admin:careerTimeline.html.twig', array(
            'form' => $form->createView(), 'projects'=> $projects, 'pageName' => 'Create New Project')
		);
    }

	public function projectAction(Request $request, $project) {

		$projects = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findAllProjects();

			// echo "<pre>";
			// \Doctrine\Common\Util\Debug::dump($project);
			// echo "</pre>";

		$projectContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findProjectByName($project);

		$form = $this->createForm(CareerTimelineType::class, $projectContent[0], array(
		    'action' => $this->generateUrl('project', array('project' => $projectContent[0]->getAlias()) ),
		    'method' => 'POST',
		));

		$form->handleRequest($request);

		if ($form->isValid()) {

			$em = $this->getDoctrine()->getManager();
			$rowToUpdate = $em->getRepository('RajkaranPortfolioBundle:CareerTimeline')->findProjectByName($project);

			if ($rowToUpdate) {
				$rowToUpdate[0]->setProjectName( $form->get('projectName')->getData() );
				$rowToUpdate[0]->setAlias( $form->get('alias')->getData() );
				$rowToUpdate[0]->setDevelopedWhen( $form->get('developedWhen')->getData() );
				$rowToUpdate[0]->setDescription( $form->get('description')->getData() );
				$rowToUpdate[0]->setFeature( $form->get('feature')->getData() );
				$rowToUpdate[0]->setTechnology( $form->get('technology')->getData() );
				$rowToUpdate[0]->setDevelopmentPeriod( $form->get('developmentPeriod')->getData() );
				$rowToUpdate[0]->setDevelopmentAim( $form->get('developmentAim')->getData() );
				$rowToUpdate[0]->setDevelopFor( $form->get('developFor')->getData() );
			}
			else{
				$em = $this->getDoctrine()->getManager();
				$em->persist($home);
			}

			$em->flush();
		}

		return $this->render('RajkaranPortfolioBundle:Admin:careerTimeline.html.twig', array(
            'form' => $form->createView(), 'projects'=> $projects, 'pageName' => 'Project - '.$projectContent[0]->getProjectName())
		);

    }

	public function homeAction(Request $request){

		$projects = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:CareerTimeline')
			->findAllProjects();

		$homeContent = $this->getDoctrine()
			->getRepository('RajkaranPortfolioBundle:Home')
			->findFirstRowOfHome();

		$home = new Home();

		if ($homeContent) {
			$home->setScreenName( $homeContent[0]->getScreenName() );
			$home->setImageName( $homeContent[0]->getImageName() );
			$home->setTagLine( $homeContent[0]->getTagLine() );
		}

        $form = $this->createForm(HomeType::class, $home, array(
		    'action' => $this->generateUrl('admin_home'),
		    'method' => 'POST',
		));

		$form->handleRequest($request);

		if ($form->isValid()) {

			$em = $this->getDoctrine()->getManager();
			$rowToUpdate = $em->getRepository('RajkaranPortfolioBundle:Home')->findFirstRowOfHome();

			if ($rowToUpdate) {
				$rowToUpdate[0]->setScreenName( $form->get('screenName')->getData() );
				$rowToUpdate[0]->setImageName( $form->get('imageName')->getData() );
				$rowToUpdate[0]->setTagLine( $form->get('tagLine')->getData() );
			}
			else{
				$em = $this->getDoctrine()->getManager();
				$em->persist($home);
			}

			$em->flush();

			return $this->redirect($this->generateUrl('admin_home'));
		}

        return $this->render('RajkaranPortfolioBundle:Admin:home.html.twig', array(
            'form' => $form->createView(), 'projects'=> $projects, 'pageName' => 'Home' )
		);
    }



}
