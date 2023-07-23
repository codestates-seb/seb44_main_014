package com.bobfriends.bf.post.service;

import com.bobfriends.bf.post.dto.PostTagDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.entity.PostTag;
import com.bobfriends.bf.post.repository.PostTagRepository;
import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostTagService {

    private final PostTagRepository postTagRepository;

    /** QuestionFoodTag update **/
    public PostTag updatePostFoodTag(Post post, PostTagDto.FoodTagPost requestBody){

        GenderTag genderTag = new GenderTag();
        // 삭제 전 저장
        genderTag.setGenderTagId(post.getPostTag().getGenderTag().getGenderTagId());

        // questionTag 삭제
        postTagRepository.deleteById(post.getPostTag().getPostTagId());

        FoodTag foodTag = new FoodTag();
        foodTag.setFoodTagId(requestBody.getFoodTagId());

        // questionTag 다시 생성
        PostTag postTag = new PostTag(post, foodTag, genderTag);
        postTagRepository.save(postTag);

        return postTag;
    }


    /** QuestionGenderTag update **/
    public PostTag updatePostGenderTag(Post post, PostTagDto.GenderTagPost requestBody){

        // 카테고리가 SHOPPING이면
        if(post.getCategory() == Post.categoryStatus.SHOPPING){

            // questionTag 삭제
            postTagRepository.deleteById(post.getPostTag().getPostTagId());

            GenderTag genderTag = new GenderTag();
            genderTag.setGenderTagId(requestBody.getGenderTagId());

            // questionTag 다시 생성
            PostTag postTag = new PostTag(post, null, genderTag);
            postTagRepository.save(postTag);

            return postTag;
        }else {
            // 카테고리가 EATING이면

            FoodTag foodTag = new FoodTag();
            if(post.getPostTag().getFoodTag() == null){

                // 기본값으로 설정
                foodTag.setFoodTagId(5L);
            }else{

                // 삭제 전 저장
                foodTag.setFoodTagId(post.getPostTag().getFoodTag().getFoodTagId());
            }

            // questionTag 삭제
            postTagRepository.deleteById(post.getPostTag().getPostTagId());

            GenderTag genderTag = new GenderTag();
            genderTag.setGenderTagId(requestBody.getGenderTagId());

            // questionTag 다시 생성
            PostTag postTag = new PostTag(post, foodTag, genderTag);
            postTagRepository.save(postTag);

            return postTag;
        }

    }
}
