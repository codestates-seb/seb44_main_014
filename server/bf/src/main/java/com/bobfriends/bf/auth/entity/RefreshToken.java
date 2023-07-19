package com.bobfriends.bf.auth.entity;

import lombok.*;


import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String Jws;

}
