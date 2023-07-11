package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
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

    MemberDto.PatchResponse memberPatchDtoToMember(Member member);

    MemberDto.PatchInfoResponse memberPatchInfoToMember(Member member);


    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.MemberPostResponseDto> memberPostResponseDtos(List<Post> memberPosts);

    List<MemberDto.MemberCommentResponseDto> memberCommentResponseDtos(List<Comment> memberComments);

    MemberDto.DetailResponse memberToMemberDetailResponseDto(Member member);

}