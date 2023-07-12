package com.bobfriends.bf.mate.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.repository.MateMemberRepository;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.bobfriends.bf.post.entity.Post.recruitStatus.COMPLETE;
@Service
@RequiredArgsConstructor
public class MateMemberService {
    private final MemberService memberService;
    private final MateMemberRepository mateMemberRepository;
    private final PostService postService;
    private final MateService mateService;

    /** Mate create **/
    public MateMember createMateMember(MateMember mateMember, MateMemberDto.PostMateMember post){
        // TODO : 같은 멤버는 다시 못 들어오게 해야함!!!!
        // 존재하는 회원인지 검증
        Member findMember = memberService.findVerifiedMember(post.getMemberId());

        Post post1 = postService.findVerifiedPost(mateMember.getMate().getPost().getPostId());
        mateMember.setMate(post1.getMate());

        Mate mate = mateService.findVerifiedPost(mateMember.getMate().getMateId());

        if(findMember.getMemberId()== ;){
            throw new BusinessLogicException(ExceptionCode.CANNOT_CREATE_MATEMEMBER);
        }
        // TODO : postId로 등록한 mateId를 찾음
        // TODO : mateId에 mateMember를 등록함
        // findVerifiedpost를 찾고(여기서 return post를해주니까) 이 post를 mate에 넣고
        // 구한 mateId를 memberMember에 넣으면 됨

//        Mate mate = new Mate();
//        Post post1 = postService.findVerifiedPost(mate.getPost().getPostId());
//        mate.setPost(post1);
//        mateMember.setMate(mate);

//         Todo : findNum은 matememebers size로 하면 됨
        //mate뽑아서 mate.matemembers로 가서 size구함
        int findNum = mate.getMateMembers().size()+1;

//         todo : findNum==mateNum이면 recruitStatus를 COMPLETE로 변경
//         todo : findNum>mateNum일 떄 예외코드를 등록하고 비즈니스 exception 발생시킴
        if(mate.getMateNum()==findNum) post1.setStatus(COMPLETE);
        if(mate.getMateNum()<findNum){
            throw new BusinessLogicException(ExceptionCode.CANNOT_CREATE_MATEMEMBER);
        }
        return mateMemberRepository.save(mateMember);
    }
}
