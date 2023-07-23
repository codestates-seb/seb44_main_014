package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.mapper.CommentMapper;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.mapper.MateMapper;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.dto.MemberTagDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    PostMapper postMapper = Mappers.getMapper(PostMapper.class);
    CommentMapper commentMapper = Mappers.getMapper(CommentMapper.class);

    MateMapper mateMapper = Mappers.getMapper(MateMapper.class);

    default MemberDto.PatchResponse memberToMemberPatchResponseDto(Member member){
        MemberDto.PatchResponse patchResponse = new MemberDto.PatchResponse();

        patchResponse.setImage(member.getImage());
        patchResponse.setName(member.getName());
        patchResponse.setEmail(member.getEmail());
        patchResponse.setGender(member.getGender());
        patchResponse.setLocation(member.getLocation().getAddress());

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
        patchInfoResponse.setGender(member.getGender());
        patchInfoResponse.setMemberTag(memberTagToMemberTagResponseDto(member.getMemberTag()));
        patchInfoResponse.setName(member.getName());
        return patchInfoResponse;
    }

    @Mapping(source = "foodTag.foodTagId", target = "foodTagId")
    MemberTagDto.Response memberTagToMemberTagResponseDto(MemberTag memberTag);


    /** 마이페이지 정보 **/
    default MemberDto.Response memberToMemberResponseDto(Member member){

        MemberDto.Response memberResponseDto =
                MemberDto.Response.builder()
                        .image(member.getImage())
                        .name(member.getName())
                        .email(member.getEmail())
                        .avgStarRate(member.getAvgStarRate())
                        .eatStatus(member.isEatStatus())
                        .build();

        if (member.getMemberTag() != null){
            MemberTagDto.FoodTagResponse foodTagResponse
                    = memberTagToMemberFoodTagResponseDto(member.getMemberTag());
            memberResponseDto.setFoodTag(foodTagResponse);
        }

        if (member.getPosts() != null){
            List<PostDto.myPageResponse> postMyPageResponses = postMapper.PostsToMyPageResponseDtos(
                    member.getPosts().stream()
                    .sorted(Comparator.comparing(Post::getCreatedAt).reversed()) // 최신순 정렬
                    .limit(3) // 3개
                    .collect(Collectors.toList()));

            List<MateDto.myPageResponse> mateMyPageResponses = mateMapper.MatesToMateMyPageResponseDtos(
                    member.getPosts().stream()
                            .map(Post::getMate)
                            .collect(Collectors.toList()));

            memberResponseDto.setPosts(postMyPageResponses);
            memberResponseDto.setPostMates(mateMyPageResponses);
        }

        if (member.getComments() != null) {
            List<CommentDto.myPageResponse> commentMyPageResponses = commentMapper.commentsToCommentMyResponses(
                    member.getComments().stream()
                            .sorted(Comparator.comparing(Comment::getCreatedAt).reversed())
                            .limit(3)
                            .collect(Collectors.toList()));

            memberResponseDto.setComments(commentMyPageResponses);
        }

        if (member.getMateMembers() != null){
            List<MateDto.myPageResponse> mateMyPageResponses = mateMapper.MatesToMateMyPageResponseDtos(
                    member.getMateMembers().stream()
                            .map(MateMember::getMate)
                            .collect(Collectors.toList()));

            memberResponseDto.setMates(mateMyPageResponses);
        }

        return memberResponseDto;
    }


    MemberDto.MemberPostResponseDto memberToMemberPostResponse(Post post);

    List<MemberDto.MemberPostResponseDto> memberPostResponseDtos(List<Post> posts);

    @Mapping(source = "post.postId", target = "postId")
    @Mapping(source = "post.title", target = "title")
    MemberDto.MemberCommentResponseDto memberToMemberCommentResponse(Comment comment);

    List<MemberDto.MemberCommentResponseDto> memberToMemberCommentResponses(List<Comment> comments);

    MemberDto.DetailResponse memberToMemberDetailResponseDto(Member member);

}