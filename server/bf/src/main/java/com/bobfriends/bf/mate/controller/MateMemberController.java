package com.bobfriends.bf.mate.controller;

import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.mapper.MateMemberMapper;
import com.bobfriends.bf.mate.service.MateMemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Validated
public class MateMemberController {
    private final MateMemberMapper mapper;
    private final MateMemberService service;
    private final PostService postService;

    /** 모집 인원 신청 **/
    @PostMapping("/board/posts/{post-id}/mate")
    public ResponseEntity postMateMember(@PathVariable("post-id") @Positive Long postId,
                                   @Valid @RequestBody MateMemberDto.PostMateMember requestbody){

        requestbody.addPostId(postId);
        MateMember mateMember = mapper.MateMemberPostToMateMember(requestbody);
        MateMember response = service.createMateMember(mateMember,requestbody);

        return new ResponseEntity<>(mapper.MateMemberToMateMemberResponse(response), HttpStatus.CREATED);
    }

    /** mate 팀원 전체 조회 **/
    @GetMapping("/posts/{post-id}/mate")
    public ResponseEntity getMateMember(@PathVariable("post-id")@Positive Long postId){

        Post post = postService.findVerifiedPost(postId);
        List<MateMember> mateMembers = service.getMateMembers(postId);

        return new ResponseEntity<>(mapper.MateMemberToMateMemberGetResponses(post, mateMembers),HttpStatus.OK);
    }
}
