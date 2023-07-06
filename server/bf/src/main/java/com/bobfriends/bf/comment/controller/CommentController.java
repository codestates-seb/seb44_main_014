package com.bobfriends.bf.comment.controller;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.mapper.CommentMapper;
import com.bobfriends.bf.comment.service.CommentService;
import com.bobfriends.bf.dto.SingleResponseDto;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/board/posts/{post-id}/comments")
@Validated
public class CommentController {
    public final static String COMMENT_DEFAULT_URL = "/board/posts/{post-id}/comments";
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final PostService postService;
    private final MemberService memberService;

    public CommentController(CommentService commentService,CommentMapper commentMapper,PostService postService,MemberService memberService){
        this.commentService=commentService;
        this.commentMapper=commentMapper;
        this.postService=postService;
        this.memberService=memberService;
    }

    /** 댓글 생성 **/
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post post,
                                      @PathVariable("post-id") @Positive Long postId){
        post.addPostId(postId);

        Comment comment = commentMapper.CommentPostToComment(post);
        comment.setPost(postService.findVerifiedPost(postId));
        comment.setMember(memberService.findVerifiedMember(post.getMemberId()));

        Comment createdComment = commentService.createComment(comment);
        
        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL)
                .buildAndExpand(postId)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    /** 댓글 수정 **/
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch patch,
                                       @PathVariable("post-id")@Positive Long postId,
                                       @PathVariable("comment-id")@Positive Long commentId){
        patch.addPostId(postId);
        patch.addCommentId(commentId);

        Comment comment = commentMapper.CommentPatchToComment(patch);
        
        // 존재하는 게시글인지 검증
        comment.setPost(postService.findVerifiedPost(postId));

        // 존재하는 회원인지 검증
        comment.setMember(memberService.findVerifiedMember(patch.getMemberId()));

        Comment response = commentService.updateComment(comment,patch);

        return new ResponseEntity<>(commentMapper.commentToCommentResponse(response), HttpStatus.OK);
    }

    /** 댓글 조회 **/
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("post-id")@Positive Long postId,
                                        @PathVariable("comment-id")@Positive Long commentId){
        Comment response = commentService.findComment(commentId);
        return new ResponseEntity<>(new SingleResponseDto<>(commentMapper.commentToCommentResponse(response)),HttpStatus.OK);
    }

    /** 댓글 삭제 **/
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("post-id")@Positive Long postId,
                                        @PathVariable("comment-id")@Positive Long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
