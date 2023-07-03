package com.bobfriends.bf.tag.entity;

import com.bobfriends.bf.member.entity.MemberTag;
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
@Table(name = "FOODTAG")
public class FoodTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_tag_id")
    private Long foodTagId;
    @Column(nullable = false)
    private String name;
    @OneToMany(mappedBy = "foodTag")
    private List<MemberTag> memberTags = new ArrayList<>();
    @OneToMany(mappedBy = "foodTag")
    private List<QuestionTag> questionTags = new ArrayList<>();
}
