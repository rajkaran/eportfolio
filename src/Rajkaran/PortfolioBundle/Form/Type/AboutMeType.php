<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AboutMeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
		
		$builder->setMethod('PUT');
		
        $builder->add('detail', 'ckeditor');
		
		$builder->add('save', 'submit', array('label' => 'Submit'));
		
    }

    /*public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rajkaran\PortfolioBundle\Entity\AboutMe'
        ));
    }*/

    public function getName()
    {
        return 'aboutMe';
    }
	
	
	
	
}
