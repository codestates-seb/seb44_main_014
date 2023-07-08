package com.bobfriends.bf.helper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.dto.PostTagDto;
import com.bobfriends.bf.post.entity.Post;
import org.springframework.http.HttpMethod;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StubData {

    /** Post **/
    public static class MockPost {
        private static Map<HttpMethod, Object> stubRequestBody;
        static {
            stubRequestBody = new HashMap<>();
            stubRequestBody.put(HttpMethod.POST, new PostDto.Post(1L, Post.categoryStatus.EATING, "제목", "본문", "이미지", new PostTagDto.GenderTagPost(1L), new PostTagDto.FoodTagPost(2L),
                    new MateDto.Post(3)));
            stubRequestBody.put(HttpMethod.PATCH, new PostDto.Patch(1L, 1L, Post.categoryStatus.EATING, "제목", "본문", "이미지", new PostTagDto.GenderTagPost(1L), new PostTagDto.FoodTagPost(2L),
                    new MateDto.Post(3), Post.recruitStatus.RECRUITING));
        }

        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static PostDto.PatchResponse getSingleResponseBody() {
            return new PostDto.PatchResponse(1L,
                    1L,
                    Post.categoryStatus.EATING,
                    "제목",
                    "본문",
                    "이미지",
                    new PostTagDto.Response(1L, 2L, 1L),
                    new MateDto.PatchResponse(3),
                    Post.recruitStatus.RECRUITING);
        }

        public static PostDto.DetailResponse getDetailResponseBody() {

            List<MateMemberDto.DetailResponse> mateMembers = new ArrayList<>();
            mateMembers.add(new MateMemberDto.DetailResponse(2L, "yooncoding"));

            List<CommentDto.DetailResponse> comments = new ArrayList<>();
            comments.add(new CommentDto.DetailResponse(1L, "답변", 2L, 4.0F, "yooncoding", LocalDateTime.now()));

            return new PostDto.DetailResponse(
                    "제목",
                    "본문",
                    "이미지",
                    LocalDateTime.now(),
                    3,
                    1,
                    Post.recruitStatus.RECRUITING,
                    Post.categoryStatus.SHOPPING,
                    new MemberDto.DetailResponse(1L, "이미지", "이름", Member.genderStatus.FEMALE, 3.0F, false),
                    new PostTagDto.Response(1L, 0, 1L),
                    new MateDto.DetailResponse(1, 2),
                    mateMembers,
                    comments
            );
        }
    }


    /** PostTag **/
    public static class MockPostTag {
        private static Map<String,Object> stubRequestBody;
        static {
            stubRequestBody = new HashMap<>();
            stubRequestBody.put("foodTagPost", new PostTagDto.FoodTagPost(1));
            stubRequestBody.put("genderTagPost", new PostTagDto.GenderTagPost(2));
        }

        public static Object getRequestBody(String name) {
            return stubRequestBody.get(name);
        }
    }


    /** Mate **/
    public static class MockMate {
        private static Map<String,Object> stubRequestBody;

        static {
            stubRequestBody = new HashMap<>();
            stubRequestBody.put("post", new MateDto.Post(3));
        }

        public static Object getRequestBody(String name) {
            return stubRequestBody.get(name);
        }
    }

}
