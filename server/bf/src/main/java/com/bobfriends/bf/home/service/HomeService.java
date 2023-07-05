package com.bobfriends.bf.home.service;

import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class HomeService {

    private final PostRepository postRepository;

    /**
     * 홈화면 전체 게시글 조회 (최신 순)
     * **/
    public List<Post> findPosts(){

        // 최신순 정렬
        List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC,"createdAt"));

        return posts;
    }
}
