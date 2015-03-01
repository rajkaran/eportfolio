<?php

namespace Rajkaran\PortfolioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="careertimeline")
 * @ORM\Entity(repositoryClass="Rajkaran\PortfolioBundle\Repository\CareerTimelineRepository")
 */
class CareerTimeline {
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="projectName", type="string", length=100)
     */
    protected $projectName;
	
	 /**
     * @ORM\Column(name="alias", type="string", length=100)
     */
    protected $alias;

    /**
     * @ORM\Column(name="developedWhen", type="date")
     */
    protected $developedWhen;

    /**
     * @ORM\Column(name="description", type="text")
     */
    protected $description;
	
	/**
     * @ORM\Column(name="feature", type="text")
     */
    protected $feature;
	
	/**
     * @ORM\Column(name="technology", type="text")
     */
    protected $technology;
	
	/**
     * @ORM\Column(name="developmentPeriod", type="text")
     */
    protected $developmentPeriod;
	
	/**
     * @ORM\Column(name="developmentAim", type="string", length=100)
     */
    protected $developmentAim;
	
	/**
     * @ORM\Column(name="developFor", type="string", length=150)
     */
    protected $developFor;
	
	
	
	
	
	
	




    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set projectName
     *
     * @param string $projectName
     * @return CareerTimeline
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;

        return $this;
    }

    /**
     * Get projectName
     *
     * @return string 
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * Set alias
     *
     * @param string $alias
     * @return CareerTimeline
     */
    public function setAlias($alias)
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * Get alias
     *
     * @return string 
     */
    public function getAlias()
    {
        return $this->alias;
    }

    /**
     * Set developedWhen
     *
     * @param \DateTime $developedWhen
     * @return CareerTimeline
     */
    public function setDevelopedWhen($developedWhen)
    {
        $this->developedWhen = $developedWhen;

        return $this;
    }

    /**
     * Get developedWhen
     *
     * @return \DateTime 
     */
    public function getDevelopedWhen()
    {
        return $this->developedWhen;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return CareerTimeline
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set feature
     *
     * @param string $feature
     * @return CareerTimeline
     */
    public function setFeature($feature)
    {
        $this->feature = $feature;

        return $this;
    }

    /**
     * Get feature
     *
     * @return string 
     */
    public function getFeature()
    {
        return $this->feature;
    }

    /**
     * Set technology
     *
     * @param string $technology
     * @return CareerTimeline
     */
    public function setTechnology($technology)
    {
        $this->technology = $technology;

        return $this;
    }

    /**
     * Get technology
     *
     * @return string 
     */
    public function getTechnology()
    {
        return $this->technology;
    }

    /**
     * Set developmentPeriod
     *
     * @param string $developmentPeriod
     * @return CareerTimeline
     */
    public function setDevelopmentPeriod($developmentPeriod)
    {
        $this->developmentPeriod = $developmentPeriod;

        return $this;
    }

    /**
     * Get developmentPeriod
     *
     * @return string 
     */
    public function getDevelopmentPeriod()
    {
        return $this->developmentPeriod;
    }

    /**
     * Set developmentAim
     *
     * @param string $developmentAim
     * @return CareerTimeline
     */
    public function setDevelopmentAim($developmentAim)
    {
        $this->developmentAim = $developmentAim;

        return $this;
    }

    /**
     * Get developmentAim
     *
     * @return string 
     */
    public function getDevelopmentAim()
    {
        return $this->developmentAim;
    }

    /**
     * Set developFor
     *
     * @param string $developFor
     * @return CareerTimeline
     */
    public function setDevelopFor($developFor)
    {
        $this->developFor = $developFor;

        return $this;
    }

    /**
     * Get developFor
     *
     * @return string 
     */
    public function getDevelopFor()
    {
        return $this->developFor;
    }
}
