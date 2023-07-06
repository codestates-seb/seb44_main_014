 -- 테이블명: genderTag (3)
INSERT INTO genderTag (name)
VALUES
    ('여자만'),
    ('남자만'),
    ('상관없음');

 -- 테이블명: foodTag (5)
INSERT INTO foodTag (name)
VALUES
    ('한식'),
    ('중식'),
    ('양식'),
    ('일식'),
    ('기타');

 -- 테이블명: member (5)
INSERT INTO member (image,name,email,password,gender,location,avg_star_rate,eat_status,created_at,modified_at)
VALUES
    ('이미지1','John Doe', 'john@example.com', 'password123!', 'FEMALE','서울','0','false','2022-04-15 10:30:00', '2022-06-18 10:35:00'),
    ('이미지2','홍길동', 'sdfsg@example.com', 'password111!', 'FEMALE','경기','4','false','2022-05-15 10:30:00', '2022-07-18 10:35:00'),
    ('이미지3','김코딩', 'sgd44@example.com', 'password222!', 'MALE','부산','0','true','2022-06-15 10:30:00', '2022-08-18 10:35:00'),
    ('이미지4','박해커', 'bfhf3@example.com', 'password333!', 'MALE','울산','0','true','2022-07-15 10:30:00', '2022-09-18 10:35:00'),
    ('이미지5','김이름', 'sggg66@example.com', 'password444!', 'FEMALE','대구','3','false','2022-08-15 10:30:00', '2022-10-18 10:35:00');

 -- 테이블명: member_tag (5)
INSERT INTO member_tag (member_id,food_tag_id)
VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,5);

 -- 테이블명: post (5)
INSERT INTO post (member_id,category,title,content,image,status,created_at,modified_at,view_count,comment_count)
VALUES
    (1,'EATING','제목1','내용1','이미지1','END','2022-04-16 10:30:00', '2022-06-19 10:35:00',3,0),
    (2,'EATING','제목2','내용2','이미지2','RECRUITING','2022-06-15 10:30:00', '2022-08-18 10:35:00',5,2),
    (3,'SHOPPING','제목3','내용3','이미지3','RECRUITING','2022-07-15 10:30:00', '2022-09-18 10:35:00',77,1),
    (4,'SHOPPING','제목4','내용4','이미지4','END','2022-08-15 10:30:00', '2022-10-18 10:35:00',4,1),
    (5,'EATING','제목5','내용5','이미지5','COMPLETE','2022-09-15 10:30:00', '2022-11-18 10:35:00',33,1);

 -- 테이블명: comment (5)
INSERT INTO comment (member_id,post_id,content,created_at,modified_at)
VALUES
    (1,2,'댓글1','2022-06-16 10:30:00', '2022-08-19 10:35:00'),
    (2,3,'댓글2','2022-07-16 10:30:00', '2022-09-19 10:35:00'),
    (3,4,'댓글3','2022-08-16 10:30:00', '2022-10-19 10:35:00'),
    (4,5,'댓글4','2022-09-16 10:30:00', '2022-11-19 10:35:00'),
    (5,2,'댓글5','2022-09-17 10:30:00', '2022-11-19 10:35:00');

 -- 테이블명: mate (5)
INSERT INTO mate (post_id,mate_num)
VALUES
    (1,1),
    (2,1),
    (3,2),
    (4,1),
    (5,1);

 -- 테이블명: mate_member (4)
INSERT INTO mate_member (mate_id,member_id)
VALUES
    (1,2),
    (3,1),
    (4,5),
    (5,4);

-- 테이블명: member_star_rate (2)
INSERT INTO member_star_rate (post_id,post_member_id,rate_member_id,star_rate)
VALUES
    (1,1,2,4),
    (4,4,5,3);


-- 테이블명: question_tag (5)
INSERT INTO post_tag (food_tag_id, gender_tag_id, post_id)
VALUES
    (1,3,1),
    (3,2,2),
    (null,1,3),
    (null,2,4),
    (5,2,5);
