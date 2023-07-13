package com.bobfriends.bf.post.controller;

import com.bobfriends.bf.helper.StubData;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import com.bobfriends.bf.post.service.PostService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static com.bobfriends.bf.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.bobfriends.bf.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class PostControllerTest {

    @MockBean
    private PostService postService;

    @MockBean
    private PostMapper postMapper;

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("게시글 등록 테스트")
    public void postPostTest() throws Exception {

        // given
        PostDto.Post post = (PostDto.Post) StubData.MockPost.getRequestBody(HttpMethod.POST);
        String content = gson.toJson(post);

        // stubbing
        given(postMapper.PostPostToPost(Mockito.any(PostDto.Post.class))).willReturn(new Post());

        Post mockPost = new Post();
        mockPost.setPostId(1L);

        given(postService.createPost(Mockito.any(Post.class))).willReturn(mockPost);

        // when
        ResultActions actions = mockMvc.perform(
                post("/board/posts")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isCreated())
                .andDo(document("post-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("작성자의 식별자"),
                                        fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 본문"),
                                        fieldWithPath("image").type(JsonFieldType.STRING).description("이미지"),

                                        fieldWithPath("genderTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자").optional(),
                                        fieldWithPath("foodTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자").optional(),
                                        fieldWithPath("mate.mateNum").type(JsonFieldType.NUMBER).description("모집 인원수 (작성자 제외)")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }


    @Test
    @DisplayName("게시글 수정 테스트")
    public void patchPostTest() throws Exception {

        // given
        long postId = 1L;

        PostDto.Patch patch = (PostDto.Patch) StubData.MockPost.getRequestBody(HttpMethod.PATCH);
        String content = gson.toJson(patch);
        PostDto.PatchResponse responseDto = StubData.MockPost.getSingleResponseBody();

        given(postService.updatePost(Mockito.anyLong(),Mockito.any(PostDto.Patch.class))).willReturn(new Post());
        given(postMapper.PostToPostPatchResponseDto(Mockito.any(Post.class))).willReturn(responseDto);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/board/posts/{post-id}/edit", postId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("patch-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("post-id").description("게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("postId").type(JsonFieldType.NUMBER).description("게시글의 식별자").ignored(),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("작성자의 식별자").optional(),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)").optional(),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목").optional(),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 본문").optional(),
                                fieldWithPath("image").type(JsonFieldType.STRING).description("이미지").optional(),

                                fieldWithPath("genderTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자").optional(),
                                fieldWithPath("foodTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자").optional(),
                                fieldWithPath("mate.mateNum").type(JsonFieldType.NUMBER).description("모집 인원수 (작성자 제외)").optional(),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("모집 상태: RECRUITING(모집중), COMPLETE(모집완료), END(모임종료)").optional()
                        ),
                        responseFields(
                                fieldWithPath("postId").type(JsonFieldType.NUMBER).description("게시글의 식별자"),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("작성자의 식별자"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 본문"),
                                fieldWithPath("image").type(JsonFieldType.STRING).description("이미지"),

                                fieldWithPath("postTag.postTagId").type(JsonFieldType.NUMBER).description("질문에 등록한 태그의 식별자"),
                                fieldWithPath("postTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자"),
                                fieldWithPath("postTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자"),
                                fieldWithPath("mate.mateNum").type(JsonFieldType.NUMBER).description("모집 인원수 (작성자 제외)"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("모집 상태: RECRUITING(모집중), COMPLETE(모집완료), END(모임종료)")
                        )
                ));
    }


    @Test
    @DisplayName("게시글 상세 조회 테스트")
    public void getPostTest() throws Exception {

        // given
        long postId = 1L;
        PostDto.DetailResponse response = StubData.MockPost.getDetailResponseBody();

        given(postService.findPost(Mockito.anyLong())).willReturn(new Post());
        given(postMapper.PostToPostDetailResponseDto(Mockito.any(Post.class))).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/board/posts/{post-id}", postId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("post-id").description("게시글 식별자")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("게시글 본문"),
                                        fieldWithPath("image").type(JsonFieldType.STRING).description("이미지"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("게시글 생성날짜"),
                                        fieldWithPath("viewCount").type(JsonFieldType.NUMBER).description("게시글 조회수"),
                                        fieldWithPath("commentCount").type(JsonFieldType.NUMBER).description("게시글에 달린 댓글 수"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("모집 상태: RECRUITING(모집중), COMPLETE(모집완료), END(모임종료)"),
                                        fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)"),

                                        fieldWithPath("member.memberId").type(JsonFieldType.NUMBER).description("작성자의 식별자"),
                                        fieldWithPath("member.image").type(JsonFieldType.STRING).description("작성자 프로필 사진"),
                                        fieldWithPath("member.name").type(JsonFieldType.STRING).description("작성자 이름"),
                                        fieldWithPath("member.gender").type(JsonFieldType.STRING).description("성별: FEMALE(여성), MALE(남성)"),
                                        fieldWithPath("member.avgStarRate").type(JsonFieldType.NUMBER).description("작성사 별점"),
                                        fieldWithPath("member.eatStatus").type(JsonFieldType.BOOLEAN).description("조용히 밥만 먹어요 on off"),

                                        fieldWithPath("postTag.postTagId").type(JsonFieldType.NUMBER).description("질문에서 저장한 태그의 식별자"),
                                        fieldWithPath("postTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자"),
                                        fieldWithPath("postTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자"),

                                        fieldWithPath("mate.findNum").type(JsonFieldType.NUMBER).description("현재 구해진 인원 수"),
                                        fieldWithPath("mate.mateNum").type(JsonFieldType.NUMBER).description("모집 인원 수"),

                                        fieldWithPath("mateMembers").type(JsonFieldType.ARRAY).description("구해진 인원의 목록"),
                                        fieldWithPath("mateMembers[].mateMemberId").type(JsonFieldType.NUMBER).description("구해진 인원의 식별자"),
                                        fieldWithPath("mateMembers[].name").type(JsonFieldType.STRING).description("유저의 이름"),

                                        fieldWithPath("comments").type(JsonFieldType.ARRAY).description("댓글 목록"),
                                        fieldWithPath("comments[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("comments[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("comments[].memberId").type(JsonFieldType.NUMBER).description("댓글 작성자의 식별자"),
                                        fieldWithPath("comments[].avgStarRate").type(JsonFieldType.NUMBER).description("댓글 작성자의 별점"),
                                        fieldWithPath("comments[].name").type(JsonFieldType.STRING).description("댓글 작성자의 이름"),
                                        fieldWithPath("comments[].createdAt").type(JsonFieldType.STRING).description("댓글 생성 날짜")
                                )
                        )
                ));
    }


    @Test
    @DisplayName("게시물 검색 테스트")
    public void searchPostTest() throws Exception {

        // given
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("keyword", "제목");

        Page<Post> posts = StubData.MockPost.getMultiPageResultPost();
        List<PostDto.Response> responses = StubData.MockPost.getMultiResponseBody();

        given(postService.searchPosts(Mockito.any(),Mockito.anyString(),Mockito.eq(null),Mockito.eq(null),Mockito.eq(null))).willReturn(posts);
        given(postMapper.PostsToPostResponseDtos(Mockito.anyList())).willReturn(responses);

        // ,Mockito.anyString(),Mockito.anyString(),Mockito.anyLong(),Mockito.anyLong()

        // when
        ResultActions actions = mockMvc.perform(
                get("/board/search")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("search-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호").optional(),
                                parameterWithName("keyword").description("검색어").optional(),
                                parameterWithName("category").description("카테고리: EATING(밥먹기), SHOPPING(장보기)").optional(),
                                parameterWithName("genderTag").description("성별 태그 (1, 2, 3)").optional(),
                                parameterWithName("foodTag").description("음식 태그 (1, 2, 3, 4, 5)").optional()
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("게시글 목록"),
                                        fieldWithPath("data[].postId").type(JsonFieldType.NUMBER).description("게시글의 식별자"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("게시글을 작성한 작성자의 식별자"),
                                        fieldWithPath("data[].name").type(JsonFieldType.STRING).description("게시글 작성자의 이름"),
                                        fieldWithPath("data[].avgStarRate").type(JsonFieldType.NUMBER).description("작성자의 별점"),
                                        fieldWithPath("data[].viewCount").type(JsonFieldType.NUMBER).description("게시글의 조회수"),
                                        fieldWithPath("data[].commentCount").type(JsonFieldType.NUMBER).description("게시글의 댓글수"),
                                        fieldWithPath("data[].status").type(JsonFieldType.STRING).description("모집 상태: RECRUITING(모집중), COMPLETE(모집완료), END(모임종료)"),
                                        fieldWithPath("data[].category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("게시글 생성 날짜"),
                                        fieldWithPath("data[].image").type(JsonFieldType.STRING).description("게시글 이미지"),

                                        fieldWithPath("data[].postTag.postTagId").type(JsonFieldType.NUMBER).description("질문에서 저장한 태그의 식별자"),
                                        fieldWithPath("data[].postTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자"),
                                        fieldWithPath("data[].postTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자"),

                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                )
                        )

                ));
    }


    @Test
    @DisplayName("게시글 삭제 테스트")
    public void deletePostTest() throws Exception {

        // given
        long postId = 1L;

        doNothing().when(postService).deletePost(postId);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/board/posts/{post-id}", postId)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isNoContent())
                .andDo(document("delete-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("post-id").description("게시글 식별자")
                        )
                ));

    }

}
