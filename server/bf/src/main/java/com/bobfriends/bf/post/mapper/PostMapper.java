package com.bobfriends.bf.post.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.mapper.CommentMapper;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.mapper.MateMapper;
import com.bobfriends.bf.mate.mapper.MateMemberMapper;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.mapper.MemberMapper;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.dto.PostTagDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.entity.PostTag;
import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    MemberMapper memberMapper = Mappers.getMapper(MemberMapper.class);
    CommentMapper commentMapper = Mappers.getMapper(CommentMapper.class);
    MateMapper mateMapper = Mappers.getMapper(MateMapper.class);
    MateMemberMapper mateMemberMapper = Mappers.getMapper(MateMemberMapper.class);


    default Post PostPostToPost(PostDto.Post requestBody){
        Post post = new Post();
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        post.setCategory(requestBody.getCategory());
        post.setTitle(requestBody.getTitle());
        post.setContent(requestBody.getContent());
        post.setStatus(Post.recruitStatus.RECRUITING);


        // questionTag 생성
        PostTag postTag = new PostTag();
        postTag.setPost(post);

        GenderTag genderTag = new GenderTag();
        if(requestBody.getGenderTag() != null){
            genderTag.setGenderTagId(requestBody.getGenderTag().getGenderTagId());
        }else{
            genderTag.setGenderTagId(3L);
        }

        postTag.setGenderTag(genderTag);

        // 만약 카테고리가 SHOPPING이면 null
        FoodTag foodTag = new FoodTag();
        if(requestBody.getCategory() == Post.categoryStatus.SHOPPING){
            postTag.setFoodTag(null);
        }else {
            if(requestBody.getFoodTag() != null){
                foodTag.setFoodTagId(requestBody.getFoodTag().getFoodTagId());
            }else {
                foodTag.setFoodTagId(5L);
            }
            postTag.setFoodTag(foodTag);
        }

        // Mate 생성
        Mate mate = new Mate();
        mate.setMateNum(requestBody.getMate().getMateNum());
        mate.setPost(post);

        post.setMember(member);
        post.setPostTag(postTag);
        post.setMate(mate);

        return post;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "mate.mateNum", target = "mate.mateNum")
    PostDto.PatchResponse PostToPostPatchResponseDto(Post post);

    @Mapping(source = "foodTag.foodTagId", target = "foodTagId")
    @Mapping(source = "genderTag.genderTagId", target = "genderTagId")
    PostTagDto.Response PostTagToPostTagResponseDto(PostTag postTag);


    default PostDto.DetailResponse PostToPostDetailResponseDto(Post post) {

        PostDto.DetailResponse postResponseDto =
                PostDto.DetailResponse.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .commentCount(post.getComments().size())
                .status(post.getStatus())
                .category(post.getCategory())
                .build();

        if(post.getMember() != null){
            MemberDto.DetailResponse memberDetailResponseDto
                    = memberMapper.memberToMemberDetailResponseDto(post.getMember());
            postResponseDto.setMember(memberDetailResponseDto);
        }

        if(post.getPostTag() != null){
            PostTagDto.Response postTagResponseDto =
                    PostTagToPostTagResponseDto(post.getPostTag());
            postResponseDto.setPostTag(postTagResponseDto);
        }

        if (post.getMate() != null){
            MateDto.DetailResponse mateDetailResponseDto
                    = mateMapper.MateToMateDetailResponseDto(post.getMate());
            postResponseDto.setMate(mateDetailResponseDto);
        }

        if (post.getMate().getMateMembers() != null){
            List<MateMemberDto.DetailResponse> mateMemberDetailResponseDtos
                    = mateMemberMapper.MateMembersToMateMemberDetailResponses(post.getMate().getMateMembers());
            postResponseDto.setMateMembers(mateMemberDetailResponseDtos);
        }

        if (post.getComments() != null){
            List<CommentDto.DetailResponse> commentDetailsResponseDtos
                    = commentMapper.commentsToCommentDetailsResponse(post.getComments());
            postResponseDto.setComments(commentDetailsResponseDtos);
        }

        return postResponseDto;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "member.avgStarRate", target = "avgStarRate")
    @Mapping(target = "commentCount", expression = "java(post.getComments().size())")
    PostDto.Response PostToPostResponseDto(Post post);

    List<PostDto.Response> PostsToPostResponseDtos(List<Post> posts);
}
