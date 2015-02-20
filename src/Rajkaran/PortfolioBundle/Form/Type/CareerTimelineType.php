<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CareerTimelineType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
		
		$builder->setMethod('POST');
		
		$builder->add('projectName', 'text');
		
		$builder->add('alias', 'text');
		
		$builder->add('developedWhen', 'date',
			array(
				'widget' => 'single_text'
			)
		);
		
        $builder->add('description', 'ckeditor');
		
		$builder->add('feature', 'ckeditor');
		
		$builder->add('technology', 'ckeditor');
		
		$builder->add('developmentPeriod', 'text');
		
		$builder->add('developmentAim', 'text');
		
		$builder->add('developFor', 'choice', 
			array(
				'choices'   => array('academic' => 'Academic', 'work' => 'Work', 'personnel' => 'Personnel'),
				'required'  => true,
			)
		);
		
		$builder->add('save', 'submit', array('label' => 'Submit'));
		
    }

    /*public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rajkaran\PortfolioBundle\Entity\Home'
        ));
    }*/

    public function getName()
    {
        return 'careerTimeline';
    }
	
	
	
	
}
