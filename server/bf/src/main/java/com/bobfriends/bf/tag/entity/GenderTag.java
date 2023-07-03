package com.bobfriends.bf.tag.entity;

import com.bobfriends.bf.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "GENDERTAG")
public class GenderTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gender_tag_id")
    private Long genderTagId;
    @Column(nullable = false)
    private String name;
    @OneToMany(mappedBy = "genderTag")
    private List<QuestionTag> questionTags = new ArrayList<>();
}
