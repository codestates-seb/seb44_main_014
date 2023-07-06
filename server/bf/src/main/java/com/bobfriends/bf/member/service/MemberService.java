package com.bobfriends.bf.member.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.member.dto.MemberTagDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.mapper.MemberTagMapper;
import com.bobfriends.bf.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;


    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 회원가입
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());

        return memberRepository.save(member);
    }

    // 회원 정보 수정
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(findMember::setName);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);
        Optional.ofNullable(member.getLocation())
                .ifPresent(findMember::setLocation);

        return memberRepository.save(findMember);
    }

    // 모든 회원 정보 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    // 회원 정보 조회
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    // 회원 정보 삭제
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.deleteById(findMember.getMemberId());
    }

    // 이미 존재하는 회원인지 검증
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 이미 등록된 이메일인지 검증
    public void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public List<MemberTagDto> getMemberTagResponseDto(Member member) {

        return MemberTagMapper.mapToDtoList(member.getMemberTags());
    }
}
