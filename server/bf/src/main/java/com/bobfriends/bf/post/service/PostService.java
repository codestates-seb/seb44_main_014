package com.bobfriends.bf.post.service;

import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.location.repository.LocationRepository;
import com.bobfriends.bf.location.service.LocationService;
import com.bobfriends.bf.mate.service.MateService;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.entity.PostTag;
import com.bobfriends.bf.post.repository.PostRepository;
import com.bobfriends.bf.tag.repository.FoodRepository;
import com.bobfriends.bf.tag.repository.GenderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final FoodRepository foodRepository;

    private final GenderRepository genderRepository;
    private final LocationRepository locationRepository;

    private final PostTagService postTagService;

    private final MemberService memberService;

    private final MateService mateService;
    private final LocationService locationService;

    private final JwtTokenizer jwtTokenizer;

    /**
     * 게시글 등록
     * - [밥먹기] 성별 태그 / 음식 태그 선택 (default : 남녀노소(3), 기타(5))
     * - [장보기] 음식 태그 사용 X
     */
    public Post createPost(Post requestBody){

        memberService.findVerifiedMember(requestBody.getMember().getMemberId());

        return postRepository.save(requestBody);
    }


    /** 게시글 수정 **/
    public Post updatePost(long postId, PostDto.Patch patch){

        Post findPost = findVerifiedPost(postId);

        if(findPost.getMember().getMemberId() == patch.getMemberId()){

            Optional.ofNullable(patch.getCategory()).ifPresent(category -> findPost.setCategory(category));
            Optional.ofNullable(patch.getTitle()).ifPresent(title -> findPost.setTitle(title));
            Optional.ofNullable(patch.getContent()).ifPresent(content -> findPost.setContent(content));
            Optional.ofNullable(patch.getStatus()).ifPresent(status -> findPost.setStatus(status));

            if(patch.getGenderTag() != null){
                PostTag postTag2 = postTagService.updatePostGenderTag(findPost, patch.getGenderTag());
                findPost.setPostTag(postTag2);
            }

            if(patch.getFoodTag() != null){
                PostTag postTag1 = postTagService.updatePostFoodTag(findPost, patch.getFoodTag());
                findPost.setPostTag(postTag1);
            }

            if(patch.getMate() != null){
                mateService.updateMate(findPost, patch.getMate());
            }

            return postRepository.save(findPost);

        }else {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_POST);
        }
    }


    /** 질문 상세 조회 **/
    public Post findPost(long postId){

        Post post = findVerifiedPost(postId);
        post.addViewCount(post.getViewCount());

        return post;
    }


    /** 전체 질문 검색 **/
    public Page<Post> searchPosts(Pageable pageable, String keyword, String category, Long genderTag, Long foodTag){
//    public Page<Post> searchPosts(Pageable pageable, String keyword, String category, Long genderTag, Long foodTag, String token){
///*      Todo : 위치 적용
//             1. memberId를 파라미터로 받아옴
//             2. memberId로 LocationService에 있는 위치 쿼리 적용
//                -> 근방에 있는 member가 2명 이하일 때, 2명 이상일 때로 나눔
//                   1) 2명 이하 -> 그대로 전체 뿌려줌
//                   2) 3명 이상 -> 위치 적용까지 되도록
//             3. 위치 쿼리로 return 받은 memberId를 통해 post의 list를 구함
//             4. postList에 태그, 키워드 적용하는 post로 return해줌
//
// */
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        long memberId = jwtTokenizer.getMemberIdFromToken(token, base64EncodedSecretKey);
//
//        // 현재 사용자의 위치를 가져옴
//        Point point = locationService.locationRegisteredMember(memberId).getPoint();
//
//        List<Long> memberIdList = locationRepository.findByNativeQuery(point);
//
//        List<Post> postsByMemberId = memberIdList.stream()
//                .flatMap(id -> postRepository.findAllByMemberId(id).stream())
//                .collect(Collectors.toList());
//
//        /** 여기까지가 위치로 뽑은 근방에 있는 member의 postList**/
//
//        /* Todo : 조건으로 나눠서 이제 파라미터로 받은 것들 적용시켜야 됨. . . .
//        *         방법 1 ) 전체 Post에서 필터링 하는게 아니라 영역을 postList에서 필터링하는 식으로
//        *         방법 2 ) postList와 필터링된 post의 List를 비교해서 일치하는 것만 return
//                  방법 3 ) 필터링된 post들(pagenation 적용 안한)에서 memberId를 뽑아내서 위치에서 추출한 memberId와 비교 ?
//                  * ->필터링된 post들(pagenation 적용 안한)를 다시 repository에 넣어서 2km 근방에 있는지 확인하는 쿼리를 씀,,,
//                  * 1. 필터링과 pagenation을 분리
//                  * 2. 필터링된 postList들에서 memberId가 일치하는 것만 List에 담음
//                  * 3. List에 담
//         */
//        List <Post> filteredPosts = postRepository.findBySearchOptionNoPage(keyword, category, genderTag, foodTag);
//
//        List<Post> commonPosts = postsByMemberId.stream()
//                .filter(filteredPosts::contains)
//                .collect(Collectors.toList());
//
//        if (memberIdList.size() < 3)
//            return postRepository.findBySearchOption(pageable, keyword, category, genderTag, foodTag);
//        else
//            return new PageImpl<Post>(commonPosts, pageable, commonPosts.size());
        return postRepository.findBySearchOption(pageable, keyword, category, genderTag, foodTag);
    }


    /** 질문 삭제 **/
    public void deletePost(long postId, String token){

        Post findPost = findVerifiedPost(postId);

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        long loginId = jwtTokenizer.getMemberIdFromToken(token, base64EncodedSecretKey);

        long writerMemberId = findPost.getMember().getMemberId();

        // 로그인 한 회원이 작성자이면
        if(loginId == writerMemberId){
            postRepository.delete(findPost);
        }else {
            throw new RuntimeException("등록한 작성자가 아닙니다");
        }
    }


    /** 등록된 태그가 존재하는지 확인 **/
    private void verifyTag(Post requestBody){

        // 음식 태그가 존재하지 않으면
        if(foodRepository.findById(requestBody.getPostTag().getFoodTag().getFoodTagId()) == null){
            throw new BusinessLogicException(ExceptionCode.FOODTAG_NOT_FOUND);
            // 성별 태그가 존재하지 않으면
        }else if(genderRepository.findById(requestBody.getPostTag().getGenderTag().getGenderTagId()) == null){
            throw new BusinessLogicException(ExceptionCode.GENDERTAG_NOT_FOUND);
        }
    }


    /** 질문이 등록된 질문인지 확인 **/
    public Post findVerifiedPost(long postId){

        Optional<Post> findPost = postRepository.findById(postId);

        Post post = findPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return post;
    }

}
