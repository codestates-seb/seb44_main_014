package com.bobfriends.bf.comment.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
    default Comment CommentPostToComment(CommentDto.Post post){
        Comment comment = new Comment();

        Member member = new Member();
        member.setMemberId(post.getMemberId());

        Post post1 = new Post();
        post1.setPostId(post.getPostId());

        comment.setMember(member);
        comment.setPost(post1);
        comment.setContent( post.getContent() );

        return comment;
    }
    default Comment CommentPatchToComment(CommentDto.Patch patch){
        Comment comment = new Comment();

        Member member = new Member();
        member.setMemberId(patch.getMemberId());

        Post post1 = new Post();
        patch.setPostId(post1.getPostId());

        comment.setMember(member);
        comment.setPost(post1);
        comment.setCommentId(patch.getCommentId());
        comment.setContent( patch.getContent() );

        return comment;
    }
    @Mapping(source = "post.postId", target = "postId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "member.avgStarRate", target = "avgStarRate")
    CommentDto.Response commentToCommentResponse(Comment comment);

}
