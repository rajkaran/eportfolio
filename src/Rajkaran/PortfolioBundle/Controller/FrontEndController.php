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

    public function homeAction() {
        $homeContent = $this->getDoctrine()->getRepository('RajkaranPortfolioBundle:Home')->findFirstRowOfHome();

        $aboutMeContent = $this->getDoctrine()->getRepository('RajkaranPortfolioBundle:AboutMe')->findFirstRowOfAboutMe();

        $projectList = $this->get('timeline')->getProjectList();

        return $this->render('RajkaranPortfolioBundle:Default:main.html.twig'
            , array('home'=>$homeContent, 'aboutMe'=>$aboutMeContent, 'projects'=>$projectList
                , 'footerCss' => 'fe-main-footer', 'bodyCss' => ''));
    }

    public function projectAction($project){
        $projectList = $this->get('timeline')->getProjectList();

        $detail = $this->get('timeline')->getProjectDetail($project);

        return $this->render('RajkaranPortfolioBundle:Default:careerTimeline.html.twig'
            , array('list'=>$projectList, 'project' => $project, 'detail' => $detail
                , 'footerCss' => 'navbar-fixed-bottom fe-main-footer', 'bodyCss' => 'fe-timeline'));
    }

    public function enquiryEmailAction(Request $request){
        $result = array('response' => 'Email has sent successfully', 'error' => 200, 'msg' => '');
        $enquiry = $request->request->get('data', array());
        $sendTo = 'rajkaran.chauhan07@gmail.com';

        // $enquiry = array('name'=>'kumar', 'email'=>'pea@gmail.com', 'message'=>'peacoke');

        $subject = 'Portfolio : An enquiry made by '.$enquiry['name'].'.';

        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($enquiry['email'])
            ->setTo($sendTo)
            ->setBody($this->renderView( 'RajkaranPortfolioBundle:Default:mailBody.html.twig',
                array('name' => $enquiry['name'], 'from' => $enquiry['email'], 'message' => $enquiry['message'])
            ), 'text/html');

        $this->get('mailer')->send($message);

        return new JsonResponse($result, $result['error']);

        // return $this->render('RajkaranPortfolioBundle:Default:test.html.twig'
        //     , array('footerCss' => 'navbar', 'bodyCss' => 'fe-test'));
    }


}
