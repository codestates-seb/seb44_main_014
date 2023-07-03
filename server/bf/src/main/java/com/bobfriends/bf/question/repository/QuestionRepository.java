package com.bobfriends.bf.question.repository;

import com.bobfriends.bf.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
