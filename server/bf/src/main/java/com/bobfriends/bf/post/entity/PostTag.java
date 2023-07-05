package com.bobfriends.bf.post.entity;

import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PostTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_tag_id")
    private Long postTagId;

    @OneToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "FOOD_TAG_ID")
    private FoodTag foodTag;

    @ManyToOne
    @JoinColumn(name = "GENDER_TAG_ID")
    private GenderTag genderTag;

    public PostTag(Post post, FoodTag foodTag, GenderTag genderTag) {
        this.post = post;
        this.foodTag = foodTag;
        this.genderTag = genderTag;
    }
}
