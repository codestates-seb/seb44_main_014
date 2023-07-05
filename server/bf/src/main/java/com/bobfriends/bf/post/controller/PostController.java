package com.bobfriends.bf.post.controller;

import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import com.bobfriends.bf.post.service.PostService;
import com.bobfriends.bf.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Slf4j
@RequestMapping("/board")
public class PostController {

    public final static String POST_DEFAULT_URL = "/board";

    public final PostService postService;

    public final PostMapper postMapper;

    public PostController(PostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }

    /** 질문 등록 **/
    @PostMapping("/posts")
    public ResponseEntity postPost(@RequestBody PostDto.Post requestBody){

        Post post = postService.createPost(postMapper.PostPostToPost(requestBody));

        URI location = UriCreator.createUri(POST_DEFAULT_URL, post.getPostId());

        return ResponseEntity.created(location).build();
    }


    /** 질문 수정 **/
    @PatchMapping("/posts/{post-id}/edit")
    public ResponseEntity patchPost(@Positive @PathVariable("post-id") long postId,
                                    @RequestBody PostDto.Patch patch){

        patch.addPostId(postId);

        Post updatePost = postService.updatePost(postId, patch);

        return new ResponseEntity<>(postMapper.PostToPostPatchResponseDto(updatePost), HttpStatus.OK);
    }


    /** 질문 상세 조회 **/
    @GetMapping("/posts/{post-id}")
    public ResponseEntity getPost(@Positive @PathVariable("post-id") long postId){

        Post post = postService.findPost(postId);

        return new ResponseEntity<>(postMapper.PostToPostDetailResponseDto(post), HttpStatus.OK);
    }



    /** 질문 삭제 **/
    @DeleteMapping("/posts/{post-id}")
    public ResponseEntity deletePost(@Positive @PathVariable("post-id") long postId){

        postService.deletePost(postId);

        return ResponseEntity.noContent().build();
    }


}