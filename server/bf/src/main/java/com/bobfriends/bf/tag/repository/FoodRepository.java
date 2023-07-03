package com.bobfriends.bf.tag.repository;

import com.bobfriends.bf.tag.entity.FoodTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<FoodTag,Long> {

}
