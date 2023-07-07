package com.bobfriends.bf.post.controller;

import com.bobfriends.bf.helper.StubData;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import com.bobfriends.bf.post.service.PostService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.bobfriends.bf.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.bobfriends.bf.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
