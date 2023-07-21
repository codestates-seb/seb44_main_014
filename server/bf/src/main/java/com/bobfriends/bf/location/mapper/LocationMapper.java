package com.bobfriends.bf.location.mapper;

import com.bobfriends.bf.location.dto.LocationDto;
import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.member.entity.Member;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LocationMapper {
    final GeometryFactory geometryFactory = new GeometryFactory();

    default Location LocationPostToLocation(LocationDto.Post post){

        Point location = geometryFactory.createPoint(new Coordinate(post.getLongitude(), post.getLatitude()));

        Location location1 = new Location();
        location1.setPoint(location);

        Member member = new Member();
        member.setMemberId(post.getMemberId());
        location1.setMember(member);
        location1.setAddress(post.getAddress());

        return location1;

    }
    default Location LocationPatchToLocation(LocationDto.Patch patch){

        Point location = geometryFactory.createPoint(new Coordinate(patch.getLongitude(), patch.getLatitude()));

        Location location1 = new Location();
        location1.setPoint(location);

        Member member = new Member();
        member.setMemberId(patch.getMemberId());
        location1.setMember(member);
        location1.setAddress(patch.getAddress());
        location1.setLocationId(patch.getLocationId());

        return location1;

    }
    @Mapping(source = "point.y",target = "latitude")
    @Mapping(source = "point.x", target = "longitude")
    @Mapping(source = "member.memberId", target = "memberId")
    LocationDto.Response LocationToLocationResponse(Location location);
}