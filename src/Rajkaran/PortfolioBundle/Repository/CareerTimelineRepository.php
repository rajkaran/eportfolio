<?php

namespace Rajkaran\PortfolioBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * CareerTimelineRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CareerTimelineRepository extends EntityRepository
{
	public function findAllProjects(){
		return $this->getEntityManager()
            ->createQuery( 'SELECT h FROM RajkaranPortfolioBundle:CareerTimeline h ORDER BY h.developedWhen DESC' )
            ->getResult();
	}

	public function findProjectByName($project){
		return $this->getEntityManager()
            ->createQuery( 'SELECT c FROM RajkaranPortfolioBundle:CareerTimeline c WHERE c.alias=:alias' )
			->setParameter('alias', $project)
            ->getResult();
	}

	public function findProjectList(){
		return $this->getEntityManager()
            ->createQuery( 'SELECT h.id, h.projectName, h.alias, h.description, h.icon, h.tooltip, h.cssClass
							FROM RajkaranPortfolioBundle:CareerTimeline h
							ORDER BY h.developedWhen DESC' )
            ->getResult();
	}

	public function findProjectDetail($alias){
		return $this->getEntityManager()
            ->createQuery( 'SELECT h.id, h.projectName, h.developedWhen, h.description, h.feature, h.technology
								, h.developmentPeriod, h.developmentAim, h.developFor, h.alias, h.icon, h.tooltip, h.cssClass
							FROM RajkaranPortfolioBundle:CareerTimeline h WHERE h.alias=:alias' )
			->setParameter('alias', $alias)
            ->getResult();
	}

}
