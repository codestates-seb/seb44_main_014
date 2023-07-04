package com.bobfriends.bf.question.repository;

import com.bobfriends.bf.question.entity.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    /** 정렬 **/
    List<Question> findAll(Sort sort);
}
