<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;

use Rajkaran\PortfolioBundle\Form\Type\RegistrationType;
use Rajkaran\PortfolioBundle\Form\Model\Registration;

use Symfony\Component\HttpFoundation\Request;

class AccountController extends Controller
{
    public function registerAction()
    {
        $registration = new Registration();
        $form = $this->createForm(new RegistrationType(), $registration, array(
            'action' => $this->generateUrl('account_create'),
        ));

        return $this->render(
            'RajkaranPortfolioBundle:Account:register.html.twig',
            array('form' => $form->createView())
        );
    }
	
	public function createAction(Request $request)
	{
		$em = $this->getDoctrine()->getManager();

		$form = $this->createForm(new RegistrationType(), new Registration());

		$form->handleRequest($request);

		if ($form->isValid()) {
			$registration = $form->getData();

			$em->persist($registration->getUser());
			$em->flush();

			//return $this->redirect($this->generateUrl('test_security'));
		}

		return $this->render(
			'RajkaranPortfolioBundle:Account:register.html.twig',
			array('form' => $form->createView())
		);
	}
	
	
	
	
	
}
