package com.bobfriends.bf.home.controller;

import com.bobfriends.bf.helper.StubData;
import com.bobfriends.bf.home.service.HomeService;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.bobfriends.bf.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.bobfriends.bf.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(HomeController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class HomeControllerTest {

    @MockBean
    private HomeService homeService;

    @MockBean
    private PostMapper mapper;

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("전체 게시글 조회")
    public void getPostsTest() throws Exception{

        // given
        List<Post> posts = StubData.MockPost.getMultiListResultPost();
        List<PostDto.Response> responses = StubData.MockPost.getMultiResponseBody();

        given(homeService.findPosts()).willReturn(posts);
        given(mapper.PostsToPostResponseDtos(Mockito.anyList())).willReturn(responses);

        // when
        ResultActions actions = mockMvc.perform(
                get("/home")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("home-post",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        responseFields(
                                List.of(
                                        fieldWithPath("[]").type(JsonFieldType.ARRAY).description("게시글 목록"),
                                        fieldWithPath("[].postId").type(JsonFieldType.NUMBER).description("게시글의 식별자"),
                                        fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("게시글을 작성한 작성자의 식별자"),
                                        fieldWithPath("[].name").type(JsonFieldType.STRING).description("게시글 작성자의 이름"),
                                        fieldWithPath("[].avgStarRate").type(JsonFieldType.NUMBER).description("작성자의 별점"),
                                        fieldWithPath("[].viewCount").type(JsonFieldType.NUMBER).description("게시글의 조회수"),
                                        fieldWithPath("[].commentCount").type(JsonFieldType.NUMBER).description("게시글의 댓글수"),
                                        fieldWithPath("[].status").type(JsonFieldType.STRING).description("모집 상태: RECRUITING(모집중), COMPLETE(모집완료), END(모임종료)"),
                                        fieldWithPath("[].category").type(JsonFieldType.STRING).description("카테고리: EATING(밥먹기), SHOPPING(장보기)"),
                                        fieldWithPath("[].title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("게시글 생성 날짜"),
                                        fieldWithPath("[].image").type(JsonFieldType.STRING).description("게시글 이미지"),

                                        fieldWithPath("[].postTag.postTagId").type(JsonFieldType.NUMBER).description("질문에서 저장한 태그의 식별자"),
                                        fieldWithPath("[].postTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자"),
                                        fieldWithPath("[].postTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자")
                                )
                        )
                ));
    }
}


