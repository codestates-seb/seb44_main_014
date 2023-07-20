package com.bobfriends.bf.auth.config;

import com.bobfriends.bf.auth.filter.JwtAuthenticationFilter;
import com.bobfriends.bf.auth.filter.JwtVerificationFilter;
import com.bobfriends.bf.auth.handler.*;
import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.auth.repository.RefreshTokenRepository;
import com.bobfriends.bf.auth.utils.CustomAuthorityUtils;
import com.bobfriends.bf.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration  {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()

                .apply(new CustomFilterConfigurer())
                .and()
                // 권한 설정
                .authorizeHttpRequests(authorize -> authorize
                        // 마이페이지 접근은, 회원만 가능
                        //.antMatchers(HttpMethod.GET, "/users/mypage/**").hasRole("USER")
                        // 게시글, 댓글 등록, 모집 인원 신청의 경우, 회원만 가능
                        //.antMatchers(HttpMethod.POST, "/board/posts").hasRole("USER")
                        // 게시물, 댓글 수정의 경우, 회원만 가능
                        //.antMatchers(HttpMethod.PATCH, "/board/posts/**").hasRole("USER")
                        // 게시물, 댓글 삭제의 경우, 회원만 가능
                        //.antMatchers(HttpMethod.DELETE, "/board/posts/**").hasRole("USER")
                        //.antMatchers(HttpMethod.POST, "/*/login").permitAll()
                        //.antMatchers(HttpMethod.POST, "/*/signup").permitAll()
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberRepository, refreshTokenRepository))
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    /** 구체적인 CORS 정책 설정 **/
    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // 모든 출처에 대해 스크립트 기반의 HTTP 통신 허용
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/", "http://localhost:8080/"));

        // 파라미터로 지정한 HTTP Method에 대한 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(Arrays.asList("*"));

        // 응답 헤더에 노출
        configuration.setExposedHeaders(Arrays.asList("*", "Authorization", "RefreshToken", "Location"));

        configuration.setAllowCredentials(true);
        configuration.setMaxAge(86400L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 URL 앞에서 구성한 CORS 정책 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /** Custom Configurer 클래스 **/
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenRepository);

            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(memberRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
