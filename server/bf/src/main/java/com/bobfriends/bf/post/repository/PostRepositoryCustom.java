package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {
    Page<Post> findBySearchOption(Pageable pageable, String keyword, String category, Long genderTag, Long foodTag, String recruit);
    List<Post> findBySearchOptionNoPage(String keyword, String category, Long genderTag, Long foodTag, String recruit);
}
