package com.bobfriends.bf.mate.entity;

import com.bobfriends.bf.post.entity.Post;
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
public class Mate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mate_id")
    private Long mateId;
    private int mateNum;
    @OneToMany(mappedBy = "mate", cascade = CascadeType.REMOVE)
    private List<MateMember> mateMembers = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "POST_ID")
    private Post post;
}
