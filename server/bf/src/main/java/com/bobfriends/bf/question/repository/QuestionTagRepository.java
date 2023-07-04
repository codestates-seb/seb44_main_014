package com.bobfriends.bf.question.repository;

import com.bobfriends.bf.question.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {

}
