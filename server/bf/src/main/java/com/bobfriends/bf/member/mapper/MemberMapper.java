package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.dto.MemberTagDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import com.bobfriends.bf.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    default Member memberPostDtoToMember(MemberDto.Post requestBody) {
        if (requestBody == null) {
            return null;
        }

        Member member = new Member();

        member.setName(requestBody.getName());
        member.setEmail(requestBody.getEmail());
        member.setPassword(requestBody.getPassword());

        return member;
    }

    default MemberDto.PatchResponse memberToMemberPatchResponseDto(Member member){
        MemberDto.PatchResponse patchResponse = new MemberDto.PatchResponse();

        patchResponse.setLocation(member.getLocation());
        patchResponse.setName(member.getName());
        patchResponse.setMemberId(member.getMemberId());
        patchResponse.setPassword(member.getPassword());
        patchResponse.setImage(member.getImage());
        patchResponse.setMemberTag(memberTagToMemberTagResponseDto(member.getMemberTag()));

        return patchResponse;
    }

    default MemberDto.PatchInfoResponse memberToMemberPatchInfoResponse(Member member){
        MemberDto.PatchInfoResponse patchInfoResponse = new MemberDto.PatchInfoResponse();

        patchInfoResponse.setImage(member.getImage());
        patchInfoResponse.setMemberId(member.getMemberId());
        patchInfoResponse.setLocation(member.getLocation());
        patchInfoResponse.setGender(member.getGender());
        patchInfoResponse.setMemberTag(memberTagToMemberTagResponseDto(member.getMemberTag()));
        patchInfoResponse.setName(member.getName());

        return patchInfoResponse;
    }

    @Mapping(source = "foodTag.foodTagId", target = "foodTagId")
    MemberTagDto.Response memberTagToMemberTagResponseDto(MemberTag memberTag);

    MemberDto.Response memberToMemberResponseDto(Member member);

    @Mapping(source = "post.postId", target = "postId")
    List<MemberDto.MemberPostResponseDto> memberPostResponseDtos(List<Post> memberPosts);

    @Mapping(source = "comment.commentId", target = "commentId")
    @Mapping(source = "post.title", target = "title")
    @Mapping(source = "member.memberId", target = "memberId")
    List<MemberDto.MemberCommentResponseDto> memberCommentResponseDtos(List<Comment> memberComments);

    MemberDto.DetailResponse memberToMemberDetailResponseDto(Member member);

}