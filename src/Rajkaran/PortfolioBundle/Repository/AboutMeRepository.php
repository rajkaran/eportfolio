<?php

namespace Rajkaran\PortfolioBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * AboutMeRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class AboutMeRepository extends EntityRepository
{
	public function findFirstRowOfAboutMe()
    {
        return $this->getEntityManager()
            ->createQuery( 'SELECT h FROM RajkaranPortfolioBundle:AboutMe h WHERE h.id=:id' )
			->setParameter('id', 1)
            ->getResult();
    }
}