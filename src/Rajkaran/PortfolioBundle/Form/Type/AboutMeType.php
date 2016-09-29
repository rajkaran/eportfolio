<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Ivory\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AboutMeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

		$builder->setMethod('PUT');

        $builder->add('detail', CKEditorType::class);

		$builder->add('save', SubmitType::class, array('label' => 'Submit'));

    }

    /*public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rajkaran\PortfolioBundle\Entity\AboutMe'
        ));
    }*/





}
