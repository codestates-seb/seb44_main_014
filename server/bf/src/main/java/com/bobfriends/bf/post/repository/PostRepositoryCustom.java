package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {
    Page<Post> findBySearchOption(Pageable pageable, String keyword, String category);
}
