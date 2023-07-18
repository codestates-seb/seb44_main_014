package com.bobfriends.bf.location.repository;


import com.bobfriends.bf.location.entity.Location;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List <Location> findByPointWithin(Point center, double radius);
}
