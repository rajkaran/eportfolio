<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ContactMeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
		
		$builder->setMethod('POST');
		
        $builder->add('name', 'text');
		$builder->add('email', 'text');
		$builder->add('message', 'textarea');
		
		$builder->add('save', 'submit', array('label' => 'Send'));
		
    }

    public function getName()
    {
        return 'contactMe';
    }
	
	
	
	
}
