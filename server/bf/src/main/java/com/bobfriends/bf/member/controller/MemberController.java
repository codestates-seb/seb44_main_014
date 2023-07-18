package com.bobfriends.bf.member.controller;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.mapper.MemberMapper;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/users")
@Validated
public class MemberController {

    public final static String USER_DEFAULT_URL = "/users";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    /** 회원 가입 **/
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post) {

        Member member = memberService.createMember(post);
        URI location = UriCreator.createUri(USER_DEFAULT_URL, member.getMemberId());

        return ResponseEntity.created(location).build();
    }

    /** 최초 회원 정보 등록 **/
    @PatchMapping("/userInfo/{member-id}")
    public ResponseEntity memberInfo (@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody MemberDto.PatchInfo patchInfo) {

        patchInfo.addMemberId(memberId);
        Member updateInfo = memberService.updateInfo(patchInfo);

        return new ResponseEntity<>(memberMapper.memberToMemberPatchInfoResponse(updateInfo), HttpStatus.OK);
    }


    /** 회원 마이페이지 조회 **/
    @GetMapping("/mypage/{member-id}")
    public ResponseEntity getMember (@Positive @PathVariable("member-id") long memberId){

        Member member = memberService.findMember(memberId);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }


    /** 회원 정보 수정 **/
    @PatchMapping("/mypage/{member-id}/edit")
    public ResponseEntity patchMember (@PathVariable("member-id") @Positive long memberId,
                                       @RequestBody MemberDto.Patch patch) {

        patch.addMemberId(memberId);
        Member updateMember = memberService.updateMember(memberId, patch);

        return new ResponseEntity<>(memberMapper.memberToMemberPatchResponseDto(updateMember),HttpStatus.OK);
    }


    /** 회원 탈퇴 **/
    @DeleteMapping("/mypage/{member-id}/edit")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {

        memberService.deleteMember(memberId);
        return ResponseEntity.noContent().build();
    }


    /** 작성한 게시물 조회 **/
    @GetMapping("/mypage/{member-id}/posts")
    public ResponseEntity getMyPost(@PathVariable("member-id") @Positive long memberId) {

        List<Post> memberPosts = memberService.findMyPosts(memberId);

        return new ResponseEntity<>(memberMapper.memberPostResponseDtos(memberPosts), HttpStatus.OK);
    }


    /** 작성한 댓글들 조회 **/
    @GetMapping("/mypage/{member-id}/comments")
    public ResponseEntity getMyComment(@PathVariable("member-id") @Positive long memberId) {

        List<Comment> memberComments = memberService.findMyComments(memberId);

        return new ResponseEntity<>(memberMapper.memberToMemberCommentResponses(memberComments), HttpStatus.OK);
    }


    /** eatStatus 수정 **/
    @PatchMapping("/mypage/{member-id}")
    public ResponseEntity<?> updateEatStatus(@PathVariable ("member-id") long memberId,
                                             @RequestParam boolean eatStatus) {

        Member member = memberService.updateEatStatus(memberId, eatStatus);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

}