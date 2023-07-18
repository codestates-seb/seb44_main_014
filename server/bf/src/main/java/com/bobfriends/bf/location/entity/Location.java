package com.bobfriends.bf.location.entity;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false, columnDefinition = "Point")
    private Point point;
    private String address;
    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
