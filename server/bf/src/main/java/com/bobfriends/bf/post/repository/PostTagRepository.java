package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

}
