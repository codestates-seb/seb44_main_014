package com.bobfriends.bf.location.mapper;

import com.bobfriends.bf.location.dto.LocationDto;
import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.member.entity.Member;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;

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
    default LocationDto.Response LocationToLocationResponse(LocationDto.Post post){

       LocationDto.Response response = new LocationDto.Response();

       response.setAddress(post.getAddress());
       response.setLongitude(post.getLongitude());
       response.setLatitude(post.getLatitude());
       response.setMemberId(post.getMemberId());

       return response;
    }
}
