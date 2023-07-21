package com.bobfriends.bf.location.repository;


import com.bobfriends.bf.location.entity.Location;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query(value = "SELECT member_Id FROM location WHERE ST_Distance_Sphere(location.point,:point) <= 2000",nativeQuery = true)
    @Transactional
    List <Long> findByNativeQuery(@Param("point") Point point);

}