package com.bobfriends.bf.location.service;

import com.bobfriends.bf.home.service.HomeService;
import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.location.repository.LocationRepository;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.repository.PostRepository;
import com.bobfriends.bf.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final MemberService memberService;
    private  final HomeService homeService;
    private final PostRepository postRepository;

    /** 위치 등록 **/
    public Location createLocation(Location location){

        return locationRepository.save(location);
    }

    /** 위치 기반 게시글 조회  **/

    public List <Post> getPostByLocation(Long memberId){
/*        Todo : 1. memberId로 쿼리를 써서 근방 2km 내에 있는 memberId를 받음
                    -> memberId로 해당하는 Point를 추출
                 2. 근방에 있는 memberId가 3개이상이면 해당하는 post List로 return
                 3. 근방에 있는 memberId가 2개이하면 게시글 전체를 return

 */
        List<Post> posts = new ArrayList<>();
        Member member = memberService.findVerifiedMember(memberId);
        Point point = member.getLocations().getPoint();
//      Todo : 쿼리를 써서 memberId를 구해야함
        List <Location> locationList = locationRepository.findByPointWithin(point,2.0);

        // lcationList에서 memberList를 추출
        List <Member> memberList = locationList.stream()
                                                .map(Location::getMember)
                                                .collect(Collectors.toList());

        // memberList를 이용해서 각 member에 해당하는 각 post를 찾아 postList에 담음
        for (Member member1 : memberList){
            posts = postRepository.findByMember(member1.getMemberId());
            posts.addAll(posts);
        }

        if(locationList.size()<3) return homeService.findPosts();
        else return posts;
    }
}
