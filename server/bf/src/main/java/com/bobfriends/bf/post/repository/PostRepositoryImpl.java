package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.Post;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.bobfriends.bf.post.entity.QPost.post;

public class PostRepositoryImpl extends QuerydslRepositorySupport implements PostRepositoryCustom {

    private JPAQueryFactory queryFactory;

    public PostRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Post.class);
        this.queryFactory = jpaQueryFactory;
    }


    @Override
    public Page<Post> findBySearchOption(Pageable pageable, String keyword, String category, Long genderTag, Long foodTag) {
        JPQLQuery<Post> query = queryFactory.selectFrom(post)
                .where(eqCategory(category), containTitleOrContent(keyword), eqGenderTag(genderTag), eqFoodTag(foodTag));

        // page 처리 구현체 (페이징)
        List<Post> posts = this.getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<Post>(posts, pageable, query.fetchCount());
    }

    @Override
    public List<Post> findBySearchOptionNoPage(String keyword, String category, Long genderTag, Long foodTag) {
        JPQLQuery<Post> query = queryFactory.selectFrom(post)
                .where(eqCategory(category), containTitleOrContent(keyword), eqGenderTag(genderTag), eqFoodTag(foodTag));

        // 페이징 x
        List<Post> posts = query.fetch();

        return posts;
    }
    private BooleanExpression eqCategory(String category){
        if (category == null || category.isEmpty()) {
            // 디폴트 값인 EATING
            return post.category.eq(Post.categoryStatus.EATING);
        }
        return post.category.eq(Post.categoryStatus.valueOf(category));
    }

    /** title 이나 content 에 해당 keyword 가 포함되어있으면 **/
    private BooleanExpression containTitleOrContent(String keyword){
        if (keyword == null || keyword.isEmpty()) {
            return null;
        }
        return post.title.containsIgnoreCase(keyword)
                .or(post.content.containsIgnoreCase(keyword));
    }

    private BooleanExpression eqGenderTag(Long genderTag) {
        if (genderTag == null || genderTag == 0L) {
            return null;
        }
        return post.postTag.genderTag.genderTagId.eq(genderTag);
    }

    private BooleanExpression eqFoodTag(Long foodTag) {
        if (foodTag == null || foodTag == 0L) {
            return null;
        }
        return post.postTag.foodTag.foodTagId.eq(foodTag);
    }
}
