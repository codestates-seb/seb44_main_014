package com.bobfriends.bf.home.controller;

import com.bobfriends.bf.auth.config.SecurityConfiguration;
import com.bobfriends.bf.helper.StubData;
import com.bobfriends.bf.post.dto.PostDto;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.mapper.PostMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
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

/*
@WebMvcTest(
        controllers = {HomeController.class}, // 테스트 하고자 하는 Controller를 지정한다.
        excludeAutoConfiguration = SecurityAutoConfiguration.class,// Spring Security의 자동 구성을 사용하지 않도록 한다.
        excludeFilters = {      // 테스트 수행 시, 사용하지 않을 필터를 지정한다. 여기서는 SecurityConfiguration에서 설정하는 필터를 제외한다.
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
                        classes = SecurityConfiguration.class)
        }
)
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

                                        fieldWithPath("[].postTag.postTagId").type(JsonFieldType.NUMBER).description("질문에서 저장한 태그의 식별자"),
                                        fieldWithPath("[].postTag.foodTagId").type(JsonFieldType.NUMBER).description("음식 태그의 식별자"),
                                        fieldWithPath("[].postTag.genderTagId").type(JsonFieldType.NUMBER).description("성별 태그의 식별자")
                                )
                        )
                ));
    }
}
 */


