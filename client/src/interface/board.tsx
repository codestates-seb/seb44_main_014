export type Nullable<T> = T | null;

// Page Board - borad list info
export interface IBoardList {
  questionId: number;
  memberId: number;
  name: string;
  avgStarRate: number;
  viewCount: number;
  commentCount: number;
  status: string;
  category: string;
  title: string;
  createdAt: string;
  image?: string;
  genderTag: {
    genderTagId: number;
  };
  foodTag: {
    foodTagId: number;
  };
}

export interface IFilterInfo {
  category: string;
  search: string;
  genderTag: Nullable<number>;
  foodTag: Nullable<number>;
}

// Page BoardDetail - mate info
export interface IMateMember {
  mateMemberId: number;
  name: string;
}

// Page BoardDetail - comment info
export interface IComments {
  commentId: number;
  content: string;
  memberId: number;
  avgStarRate: number;
  name: string;
  createdAt: string;
}

// Page BoardDetail - general info
export interface IBoardDetailData {
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  status: string;
  category: string;
  member: {
    memberId: number;
    image: string;
    name: string;
    gender: string;
    avgStarRate: number;
    eatStatus: boolean;
  };
  postTag: {
    postTagId: number;
    foodTagId: number;
    genderTagId: number;
  };
  genderTag: {
    genderTagId: number;
  };
  foodTag: {
    foodTagId: number;
  };
  mate: {
    findNum: number;
    mateNum: number;
  };
  mateMembers: IMateMember[];
  comments: IComments[];
}

// Page PostBoard - post info
export interface IPostInfo {
  memberId: number;
  category: string;
  title: string;
  content: string;
  genderTag: {
    genderTagId: Nullable<number>;
  };
  foodTag: {
    foodTagId?: number;
  } | null;
  mate: {
    mateNum: Nullable<number>;
  };
}
