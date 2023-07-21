package com.bobfriends.bf.location.service;

import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.home.service.HomeService;
import com.bobfriends.bf.location.dto.LocationDto;
import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.location.repository.LocationRepository;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final MemberService memberService;
    private final HomeService homeService;
    private final PostRepository postRepository;
    private final JwtTokenizer jwtTokenizer;

    /*** 위치 등록 **/

    public Location createLocation(Location location) {

        return locationRepository.save(location);
    }

    /** 위치 수정 **/

    public Location updateLocation(Location location, LocationDto.Patch patch) {

        Location verifiedLocation = findVerifiedLocation(location.getLocationId());

        // 위치 등록한 본인인지 검증
        if(!Objects.equals(verifiedLocation.getMember().getMemberId(), patch.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_LOCATION);
        }

        Optional.ofNullable(location.getPoint())
                .ifPresent(point -> verifiedLocation.setPoint(point));

        Optional.ofNullable(location.getAddress())
                .ifPresent(address->verifiedLocation.setAddress(address));

        return locationRepository.save(verifiedLocation);

    }

    /** 위치 기반 게시글 조회 (Home) **/

    public List<Post> getPostByLocation(String token) {

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        long loginId = jwtTokenizer.getMemberIdFromToken(token, base64EncodedSecretKey);

        List<Post> posts = new ArrayList<>();

        Point point = locationRegisteredMember(loginId).getPoint();

        List<Long> memberIdList = locationRepository.findByNativeQuery(point);

        List<Post> postsByMemberId = memberIdList.stream()
                .flatMap(id -> postRepository.findAllByMemberId(id).stream())
                .collect(Collectors.toList());

        Collections.sort(postsByMemberId, (post1, post2) -> post2.getCreatedAt().compareTo(post1.getCreatedAt()));

        if (memberIdList.size() < 3)
            return homeService.findPosts();
        else
            return postsByMemberId;
    }
    /** 위치 등록한 회원인지 검증 **/

    public Location locationRegisteredMember(Long memberId) {
        Optional<Location> optionalMember = Optional.ofNullable(memberService.findVerifiedMember(memberId).getLocations());

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));
    }

    /** 등록된 위치인지 검증 **/

    public Location findVerifiedLocation(long locationId) {
        Optional<Location> optionalLocation =
                locationRepository.findById(locationId);
        Location findLocation =
                optionalLocation.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));
        return findLocation;
    }

}