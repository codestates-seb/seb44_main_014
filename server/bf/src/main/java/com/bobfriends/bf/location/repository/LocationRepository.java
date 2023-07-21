package com.bobfriends.bf.location.repository;


import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.post.entity.Post;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query(value = "SELECT member_Id FROM location WHERE ST_Distance_Sphere(location.point,:point) <= 2000",nativeQuery = true)
    @Transactional
    List <Long> findByNativeQuery(@Param("point") Point point);


    @Transactional
    @Query("SELECT l FROM Location l WHERE l.member.id = :memberId")
    Optional<Location> findByMemberId(@Param("memberId") Long memberId);
}