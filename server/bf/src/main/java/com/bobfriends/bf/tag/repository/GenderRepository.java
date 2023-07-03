package com.bobfriends.bf.tag.repository;

import com.bobfriends.bf.tag.entity.GenderTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderRepository extends JpaRepository<GenderTag, Long> {
}
