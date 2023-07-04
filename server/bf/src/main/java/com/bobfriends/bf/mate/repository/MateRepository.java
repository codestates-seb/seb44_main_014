package com.bobfriends.bf.mate.repository;

import com.bobfriends.bf.mate.entity.Mate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MateRepository extends JpaRepository<Mate, Long> {
}
