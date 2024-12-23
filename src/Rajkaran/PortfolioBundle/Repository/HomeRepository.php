<?php

namespace Rajkaran\PortfolioBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * HomeRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class HomeRepository extends EntityRepository
{
	public function findFirstRowOfHome()
    {
        return $this->getEntityManager()
            ->createQuery( 'SELECT h FROM RajkaranPortfolioBundle:Home h WHERE h.id=:id' )
			->setParameter('id', 1)
            ->getResult();
    }
}
