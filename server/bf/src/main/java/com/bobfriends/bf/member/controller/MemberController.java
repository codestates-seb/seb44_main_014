package com.bobfriends.bf.member.controller;

import com.bobfriends.bf.member.dto.LoginPostDto;
import com.bobfriends.bf.member.dto.LoginResponseDto;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.mapper.MemberMapper;
import com.bobfriends.bf.member.repository.MemberRepository;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.utils.UriCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
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

    @PostMapping("/signup") // 회원가입
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostDtoToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(USER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/login") // 로그인
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(@RequestBody LoginPostDto loginPostDto) {

        // 제공된 이메일과 비밀번호를 사용하여 회원 정보 조회
        String email = loginPostDto.getEmail();
        String password = loginPostDto.getPassword();

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();

            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setMemberId(member.getMemberId());
            loginResponseDto.setName(member.getName());
            loginResponseDto.setEmail(member.getEmail());
            loginResponseDto.setLocation(member.getLocation());
            loginResponseDto.setGender(member.getGender());

            return loginResponseDto;
        } else {
            // 사용자 정보를 찾을 수 없는 경우 빈 객체 반환
            return new LoginResponseDto();
        }
    }

        @GetMapping("/mypage/{member-id}") // 회원 조회
        public ResponseEntity<MemberDto.Response> getMember ( @Positive @PathVariable("member-id") long memberId){
            Member member = memberService.findMember(memberId);

            MemberDto.Response response = memberMapper.memberToMemberResponseDto(member);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }



// 모임종료가 아닌것만 mate에 보내기