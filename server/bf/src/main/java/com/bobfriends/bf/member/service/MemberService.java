package com.bobfriends.bf.member.service;

import com.bobfriends.bf.auth.utils.CustomAuthorityUtils;
import com.bobfriends.bf.auth.utils.GetAuthUserUtils;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.repository.CommentRepository;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import com.bobfriends.bf.member.repository.MemberRepository;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.repository.PostRepository;
import com.bobfriends.bf.tag.entity.FoodTag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final MemberTagService memberTagService;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    /** 회원 가입 **/
    public Member createMember(MemberDto.Post post) {

        verifyExistEmail(post.getEmail());

        Member member = new Member();

        member.setEmail(post.getEmail());

        if(!post.getPassword().equals(post.getSamePassword())){

            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_SAME);

        }else {

            // 비밀번호 암호화
            String encryptedPassword = passwordEncoder.encode(post.getPassword());
            member.setPassword(encryptedPassword);

            // Role 부여
            List<String> roles = authorityUtils.createRoles(member.getEmail());
            member.setRoles(roles);

        }

        return memberRepository.save(member);
    }

    /** 회원 정보 수정 **/
    @Transactional
    public Member updateMember(long memberId, MemberDto.Patch patch) {
        Member findMember = findVerifiedMember(memberId);

        Optional.ofNullable(patch.getImage()).ifPresent(image -> findMember.setImage(image));

        if (patch.getFoodTag() != null) {
            MemberTag memberTag = memberTagService.updateMemberFoodTag(findMember, patch.getFoodTag());
            findMember.setMemberTag(memberTag);
        }

        return memberRepository.save(findMember);
    }


    /** 최소 회원 정보 등록 **/
    @Transactional
    public Member updateInfo(MemberDto.PatchInfo requestBody) {
        Member findMember = findVerifiedMember(requestBody.getMemberId());

        findMember.setName(requestBody.getName());

        if(requestBody.getImage() == null) {
            findMember.setImage("https://bobimage.s3.ap-northeast-2.amazonaws.com/member/defaultProfile.png");
        } else {
            findMember.setImage(requestBody.getImage());
        }
        findMember.setGender(requestBody.getGender());

        if (requestBody.getFoodTag() != null) {
            FoodTag foodTag = new FoodTag();
            foodTag.setFoodTagId(requestBody.getFoodTag().getFoodTagId());
            MemberTag memberTag = new MemberTag();
            memberTag.setFoodTag(foodTag);
            memberTag.setMember(findMember);
            findMember.setMemberTag(memberTag);
        }
        return memberRepository.save(findMember);
    }



    /** eatStatus 수정 **/
    @Transactional
    public Member updateEatStatus(long memberId, boolean eatStatus){

        Member findMember = findVerifiedMember(memberId);
        findMember.setEatStatus(eatStatus);

        return memberRepository.save(findMember);
    }


    /** 회원 마이페이지 정보 조회 **/
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }


    /** 회원 탈퇴 **/
    @Transactional
    public void deleteMember(long memberId) {

        Member findMember = findVerifiedMember(memberId);
        memberRepository.deleteById(findMember.getMemberId());
    }


    /** 이미 존재하는 회원인지 검증 **/
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    /** 이미 등록된 이메일인지 검증 **/
    public void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }


    /** 작성한 게시글들 조회 **/
    public List<Post> findMyPosts(long memberId) {
        return postRepository.findAllByMemberId(memberId);
    }


    /** 작성한 댓글들 조회 **/
    public List<Comment> findMyComments(long memberId) {
        return commentRepository.findAllByMemberId(memberId);
    }

}
