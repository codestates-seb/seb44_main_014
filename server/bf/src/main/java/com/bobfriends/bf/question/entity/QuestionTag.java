package com.bobfriends.bf.question.entity;

import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_tag_id")
    private Long questionTagId;

    @OneToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "FOOD_TAG_ID")
    private FoodTag foodTag;
    @ManyToOne
    @JoinColumn(name = "GENDER_TAG_ID")
    private GenderTag genderTag;

    public QuestionTag(Question question, FoodTag foodTag, GenderTag genderTag) {
        this.question = question;
        this.foodTag = foodTag;
        this.genderTag = genderTag;
    }
}
