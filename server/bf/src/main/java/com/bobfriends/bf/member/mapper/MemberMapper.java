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

    default MemberDto.PatchResponse memberToMemberPatchResponseDto(Member member){
        MemberDto.PatchResponse patchResponse = new MemberDto.PatchResponse();

        patchResponse.setImage(member.getImage());
        patchResponse.setName(member.getName());
        patchResponse.setEmail(member.getEmail());
        patchResponse.setGender(member.getGender());
        patchResponse.setLocation(member.getLocation());

        patchResponse.setFoodTag(memberTagToMemberFoodTagResponseDto(member.getMemberTag()));

        return patchResponse;
    }

    @Mapping(source = "foodTag.foodTagId", target = "foodTagId")
    MemberTagDto.FoodTagResponse memberTagToMemberFoodTagResponseDto (MemberTag memberTag);

    default MemberDto.PatchInfoResponse memberToMemberPatchInfoResponse(Member member){
        MemberDto.PatchInfoResponse patchInfoResponse = new MemberDto.PatchInfoResponse();

        patchInfoResponse.setImage(member.getImage());
        patchInfoResponse.setEmail(member.getEmail());
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