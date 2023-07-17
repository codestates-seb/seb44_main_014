package com.bobfriends.bf.member.controller;

import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.mapper.MemberMapper;
import com.bobfriends.bf.member.repository.MemberRepository;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.utils.UriCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;


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

    @Autowired
    private MemberRepository memberRepository;

    /** 최초 회원 정보 등록 **/
    @PatchMapping("/userInfo/{member-id}")
    public ResponseEntity memberInfo (@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody MemberDto.PatchInfo patchInfo) {

        patchInfo.addMemberId(memberId);
        Member updateInfo = memberService.updateInfo(patchInfo);

        return new ResponseEntity<>(memberMapper.memberToMemberPatchInfoResponse(updateInfo), HttpStatus.OK);
    }

    @GetMapping("/mypage/{member-id}") // 회원 조회
    public ResponseEntity<MemberDto.Response> getMember (@Positive @PathVariable("member-id") long memberId){

        Member member = memberService.findMember(memberId);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @PatchMapping("/mypage/{member-id}/edit") // 회원 수정
    public ResponseEntity patchMember (@PathVariable("member-id") @Positive long memberId,
                                       @RequestBody MemberDto.Patch patch) {
        patch.addMemberId(memberId);

        Member updateMemer = memberService.updateMember(memberId, patch);

        return new ResponseEntity<>(memberMapper.memberToMemberPatchResponseDto(updateMemer),HttpStatus.OK);

    }

    @DeleteMapping("/mypage/{member-id}/edit") // 회원 삭제
    public ResponseEntity deleteMember (@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/mypage/{member-id}/posts") // 작성한 게시물 조회
    public ResponseEntity getMyPost () {
        List<Post> memberPosts = memberService.findMyPosts();
        List<MemberDto.MemberPostResponseDto> memberPostResponseDtoList = memberMapper.memberPostResponseDtos(memberPosts);

        return new ResponseEntity<>(memberPostResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/mypage/{member-id}/comments") // 작성한 댓글 조회
    public ResponseEntity<List<MemberDto.MemberCommentResponseDto>> getMyComment(@PathVariable("member-id") long memberId) {
        List<MemberDto.MemberCommentResponseDto> memberCommentResponseDtoList = memberService.findMyComments();
        return ResponseEntity.ok(memberCommentResponseDtoList);
    }
    @PatchMapping("/mypage/{member-id}") // eatStatus 수정
    public ResponseEntity<?> updateEatStatus(@PathVariable ("member-id") long memberId,
                                             @RequestParam boolean eatStatus) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Member member = optionalMember.get();
        member.setEatStatus(eatStatus);
        memberRepository.save(member);

        return ResponseEntity.ok().build();
    }

}