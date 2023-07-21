package com.bobfriends.bf.location.controller;

import com.bobfriends.bf.location.dto.LocationDto;
import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.location.mapper.LocationMapper;
import com.bobfriends.bf.location.service.LocationService;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class LocationController {
    private final LocationMapper locationMapper;
    private final LocationService locationService;
    private final MemberService memberService;
    private final PostMapper postMapper;

    /** 위치 등록 **/

    @PostMapping("/users/mypage/{member-id}/location/create")
    public ResponseEntity postLocation(@RequestBody LocationDto.Post requestbody,
                                       @PathVariable("member-id")@Positive Long memberId){
        requestbody.addMemberId(memberId);
        Member verifiedMember = memberService.findVerifiedMember(memberId);

        Location location =locationMapper.LocationPostToLocation(requestbody);
        location.setMember(verifiedMember);
        Location response = locationService.createLocation(location);

        return new ResponseEntity<>(locationMapper.LocationToLocationResponse(response), HttpStatus.OK);
    }

    /** 위치 수정 **/

    @PatchMapping("/users/mypage/{member-id}/location/{location-id}")
    public ResponseEntity updateLocation(@RequestBody LocationDto.Patch requestbody,
                                         @PathVariable("member-id")@Positive Long memberId,
                                         @PathVariable("location-id")@Positive Long locationId){
        requestbody.addMemberId(memberId);
        requestbody.addLocationId(locationId);
        Member verifiedMember = memberService.findVerifiedMember(memberId);

        Location location = locationMapper.LocationPatchToLocation(requestbody);
        location.setMember(verifiedMember);
        Location response = locationService.updateLocation(location,requestbody);

        return new ResponseEntity<>(locationMapper.LocationToLocationResponse(response), HttpStatus.OK);
    }

    // TODO : URI 변경 예정

    /** 위치 기반 게시글 조회 (Home) **/

    @GetMapping("/home/location")
    @Transactional
    public ResponseEntity getPostByLocation(@RequestHeader("authorization") String token){

        List<Post> posts = locationService.getPostByLocation(token);

        return new ResponseEntity<>(postMapper.PostsToPostResponseDtos(posts), HttpStatus.OK);
    }
}