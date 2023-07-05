package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    /** 정렬 **/
    List<Post> findAll(Sort sort);
}
