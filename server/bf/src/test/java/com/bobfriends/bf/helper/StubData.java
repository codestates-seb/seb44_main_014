package com.bobfriends.bf.helper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.dto.PostTagDto;
import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

        public static List<Post> getMultiListResultPost() {
            Post post1 = new Post(Post.categoryStatus.EATING, "제목1", "본문1", "이미지1", Post.recruitStatus.RECRUITING, 3);

            Post post2 = new Post(Post.categoryStatus.SHOPPING, "제목2", "본문2", "이미지2", Post.recruitStatus.RECRUITING, 8);

            return new ArrayList<>(List.of(post1,post2));
        }


        public static Page<Post> getMultiPageResultPost() {
            Post post1 = new Post(Post.categoryStatus.EATING, "제목1", "본문1", "이미지1", Post.recruitStatus.RECRUITING, 3);

            Post post2 = new Post(Post.categoryStatus.SHOPPING, "제목2", "본문2", "이미지2", Post.recruitStatus.RECRUITING, 8);

            return new PageImpl<>(List.of(post1, post2),
                    PageRequest.of(0, 10, Sort.by("createdAt").descending()),
                    2);
        }

        public static List<PostDto.Response> getMultiResponseBody() {
            return List.of(
                    new PostDto.Response(
                            1L,
                            1L,
                            "kimcoding",
                            3.0F,
                            3,
                            0,
                            Post.recruitStatus.RECRUITING,
                            Post.categoryStatus.EATING,
                            "제목1",
                            LocalDateTime.now(),
                            "이미지1",
                            new PostTagDto.Response(1L, 4L, 2L)
                    ),
                    new PostDto.Response(
                            2L,
                            2L,
                            "yooncoding",
                            5.0F,
                            8,
                            2,
                            Post.recruitStatus.RECRUITING,
                            Post.categoryStatus.EATING,
                            "제목2",
                            LocalDateTime.now(),
                            "이미지2",
                            new PostTagDto.Response(2L, 3L, 3L)
                    )
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
