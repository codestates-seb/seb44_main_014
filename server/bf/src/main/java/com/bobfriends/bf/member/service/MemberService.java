package com.bobfriends.bf.member.service;

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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final MemberTagService memberTagService;


    public MemberService(MemberRepository memberRepository, PostRepository postRepository, CommentRepository commentRepository, MemberTagService memberTagService) {
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.memberTagService = memberTagService;
    }

    // 회원가입
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());

        return memberRepository.save(member);
    }

    // 회원 정보 수정
    public Member updateMember(long memberId, MemberDto.Patch patch) {
        Member findMember = findVerifiedMember(memberId);

        Optional.ofNullable(patch.getName()).ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(patch.getPassword()).ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(patch.getLocation()).ifPresent(location -> findMember.setLocation(location));
        Optional.ofNullable(patch.getImage()).ifPresent(image -> findMember.setImage(image));

        if (patch.getFoodTag() != null) {
            MemberTag memberTag = memberTagService.updateMemberFoodTag(findMember, patch.getFoodTag());
            findMember.setMemberTag(memberTag);
        }

        return memberRepository.save(findMember);
    }

    @Transactional
    public Member updateInfo(MemberDto.PatchInfo requestBody) {

        Member findMember = findVerifiedMember(requestBody.getMemberId());

        findMember.setName(requestBody.getName());
        findMember.setGender(requestBody.getGender());
        findMember.setLocation(requestBody.getLocation());
        findMember.setImage(requestBody.getImage());

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

    public List<Post> findMyPosts() {
        return postRepository.findAll();
    }

    public List<MemberDto.MemberCommentResponseDto> findMyComments() {
        List<Comment> comments = commentRepository.findAll();
        List<MemberDto.MemberCommentResponseDto> commentResponseDtoList = new ArrayList<>();

        for (Comment comment : comments) {
            MemberDto.MemberCommentResponseDto memberCommentResponseDto = new MemberDto.MemberCommentResponseDto();

            memberCommentResponseDto.setMemberId(comment.getMember().getMemberId());
            memberCommentResponseDto.setCommentId(comment.getCommentId());
            memberCommentResponseDto.setContent(comment.getContent());
            memberCommentResponseDto.setPostTitle(comment.getPost().getTitle());
            commentResponseDtoList.add(memberCommentResponseDto);
        }

        return commentResponseDtoList;
    }

}
