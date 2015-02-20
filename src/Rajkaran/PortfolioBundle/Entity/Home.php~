<?php

namespace Rajkaran\PortfolioBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="home")
 * @ORM\Entity(repositoryClass="Rajkaran\PortfolioBundle\Repository\HomeRepository")
 */
class Home {
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="screenName", type="string", length=100)
     */
    protected $screenName;

    /**
     * @ORM\Column(name="imageName", type="string", length=100)
     */
    protected $imageName;

    /**
     * @ORM\Column(name="tagLine", type="text")
     */
    protected $tagLine;
	



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
     * Set screenName
     *
     * @param string $screenName
     * @return Home
     */
    public function setScreenName($screenName)
    {
        $this->screenName = $screenName;

        return $this;
    }

    /**
     * Get screenName
     *
     * @return string 
     */
    public function getScreenName()
    {
        return $this->screenName;
    }

    /**
     * Set imageName
     *
     * @param string $imageName
     * @return Home
     */
    public function setImageName($imageName)
    {
        $this->imageName = $imageName;

        return $this;
    }

    /**
     * Get imageName
     *
     * @return string 
     */
    public function getImageName()
    {
        return $this->imageName;
    }

    /**
     * Set tagLine
     *
     * @param string $tagLine
     * @return Home
     */
    public function setTagLine($tagLine)
    {
        $this->tagLine = $tagLine;

        return $this;
    }

    /**
     * Get tagLine
     *
     * @return string 
     */
    public function getTagLine()
    {
        return $this->tagLine;
    }
}
