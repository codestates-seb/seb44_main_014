package com.bobfriends.bf.mate.controller;

import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.mapper.MateMemberMapper;
import com.bobfriends.bf.mate.service.MateMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
@RequiredArgsConstructor
@RestController
@Validated
public class MateMemberController {
    private final MateMemberMapper mapper;
    private final MateMemberService service;
    /** 모집 인원 신청 **/
    @PostMapping("/board/posts/{post-id}/mate")
    public ResponseEntity postMate(@PathVariable("post-id") @Positive Long postId,
                                   @Valid @RequestBody MateMemberDto.PostMateMember requestbody){
        requestbody.addPostId(postId);
        MateMember mateMember = mapper.MateMemberPostToMateMember(requestbody);
        MateMember response = service.createMateMember(mateMember,requestbody);

        return new ResponseEntity<>(mapper.MateMemberToMateMemberResponse(response), HttpStatus.CREATED);
    }
}
