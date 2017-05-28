<?php
/*
*/

namespace Rajkaran\PortfolioBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Ivory\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class CareerTimelineType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

    		$builder->setMethod('POST');

    		$builder->add('projectName', TextType::class);

    		$builder->add('alias', TextType::class);

    		$builder->add('developedWhen', DateType::class, array( 'widget' => 'single_text' ));

            $builder->add('description', CKEditorType::class);

    		$builder->add('feature', CKEditorType::class);

    		$builder->add('technology', CKEditorType::class);

    		$builder->add('developmentPeriod', TextType::class);

    		$builder->add('developmentAim', TextType::class);

    		$builder->add('developFor', ChoiceType::class,
    			array(
    				'choices'   => array('Academic' => 'academic', 'Work' => 'work', 'Personnel' => 'personnel'),
    				'required'  => true,
    			)
    		);

            $builder->add('icon', ChoiceType::class,
    			array(
    				'choices'   => array('University' => 'university', 'Innovation' => 'lightbulb-o', 'Work' => 'building-o'),
    				'required'  => true,
    			)
    		);

            $builder->add('tooltip', ChoiceType::class,
    			array(
    				'choices'   => array('Academic builds' => 'Academic builds', 'Creative builds' => 'Creative builds'
                    , 'Commercial builds' => 'Commercial builds'),
    				'required'  => true,
    			)
    		);

            $builder->add('cssClass', ChoiceType::class,
    			array(
    				'choices'   => array('Red' => 'warning', 'Light blue' => 'info', 'Green' => 'success'),
    				'required'  => true,
    			)
    		);

    		$builder->add('save', SubmitType::class, array('label' => 'Submit'));

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
