export interface IMypagePosts {
  postId: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

export interface IMypageComments {
  postId: number;
  commentId: number;
  content: string;
  title: string;
}
