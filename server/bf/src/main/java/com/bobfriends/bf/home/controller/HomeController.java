package com.bobfriends.bf.home.controller;

import com.bobfriends.bf.home.service.HomeService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final PostMapper mapper;

    @GetMapping
    public ResponseEntity getPosts(){
        List<Post> posts = homeService.findPosts();

        return new ResponseEntity<>(mapper.PostsToPostResponseDtos(posts), HttpStatus.OK);
    }
}
