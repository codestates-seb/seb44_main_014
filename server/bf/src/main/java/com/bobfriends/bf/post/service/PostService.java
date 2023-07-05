package com.bobfriends.bf.post.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.mate.service.MateService;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.entity.PostTag;
import com.bobfriends.bf.post.repository.PostRepository;
import com.bobfriends.bf.tag.repository.FoodRepository;
import com.bobfriends.bf.tag.repository.GenderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final FoodRepository foodRepository;

    private final GenderRepository genderRepository;

    private final PostTagService postTagService;

    private final MateService mateService;

    /**
     * 게시글 등록
     * - [밥먹기] 성별 태그 / 음식 태그 선택 (default : 상관없음(3), 기타(5))
     * - [장보기] 음식 태그 사용 X
     * - 등록 기본 status : 모집중
     * TODO : 이미지 , 위치
     */
    public Post createPost(Post requestBody){

        // TODO : 회원이 존재하는 회원인지 조회

        return postRepository.save(requestBody);
    }


    /**
     * 게시글 수정
     */
    public Post updatePost(long postId, PostDto.Patch patch){

        // TODO : 로그인한 회원이 작성자인지 확인 (JWT)

        Post findPost = findVerifiedPost(postId);

        if(findPost.getMember().getMemberId() == patch.getMemberId()){

            Optional.ofNullable(patch.getCategory()).ifPresent(category -> findPost.setCategory(category));
            Optional.ofNullable(patch.getTitle()).ifPresent(title -> findPost.setTitle(title));
            Optional.ofNullable(patch.getContent()).ifPresent(content -> findPost.setContent(content));
            Optional.ofNullable(patch.getImage()).ifPresent(image -> findPost.setImage(image));
            Optional.ofNullable(patch.getLocation()).ifPresent(location -> findPost.setLocation(location));
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


    /**
     * 질문 상세 조회
     * - 조회수 1 증가 +
     */
    public Post findPost(long postId){

        Post post = findVerifiedPost(postId);
        post.addViewCount(post.getViewCount());

        return post;
    }

    /**
     * 질문 삭제
     * - 질문 관련 답글, 모임 등 삭제
     */
    public void deletePost(long postId){

        Post findPost = findVerifiedPost(postId);

        // TODO : 로그인한 회원이 작성자인지 확인 (JWT)
        long writerMemberId = findPost.getMember().getMemberId();

        postRepository.delete(findPost);
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
