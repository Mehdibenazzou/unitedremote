package com.unitedremoteback.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DislikedShopsRepository extends JpaRepository<DislikedShops, Long> {
	
}
