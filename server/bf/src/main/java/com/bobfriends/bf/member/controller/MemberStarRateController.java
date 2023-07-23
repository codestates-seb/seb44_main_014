package com.bobfriends.bf.member.controller;

import com.bobfriends.bf.member.dto.MemberStarRateDto;
import com.bobfriends.bf.member.entity.MemberStarRate;
import com.bobfriends.bf.member.mapper.MemberStarRateMapper;
import com.bobfriends.bf.member.service.MemberStarRateService;
import com.bobfriends.bf.post.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
public class MemberStarRateController {
    private final PostService postService;
    private final MemberStarRateMapper mapper;
    private final MemberStarRateService service;

    public MemberStarRateController(PostService postService, MemberStarRateMapper mapper,MemberStarRateService service){
        this.postService = postService;
        this.mapper = mapper;
        this.service = service;
    }

    /** 별점 등록 **/
    @PostMapping("/posts/{post-id}/mate/userRate")
    public ResponseEntity postStarRate(@Valid @RequestBody MemberStarRateDto.Post post,
                                       @PathVariable("post-id") @Positive Long postId) {
        post.addPostId(postId);
        MemberStarRate memberStarRate = mapper.MemberStarRatePostToMemberStarRate(post);

        // 존재하는 게시글인지 검증
        memberStarRate.setPost(postService.findVerifiedPost(postId));
        MemberStarRate createdStarRate = service.createMemberStarRate(memberStarRate);

        return new ResponseEntity<>(mapper.MemberStarRateToMemberStarRateResponse(createdStarRate), HttpStatus.OK);
    }
}
