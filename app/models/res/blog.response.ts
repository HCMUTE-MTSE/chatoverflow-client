// Blog response interfaces
export interface BlogListResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: string;
    coverImage: string;
    title: string;
    slug: string;
    summary: string;
    author: {
      userId: string;
      avatar: string;
      nickName: string;
    };
    tags: string[];
    upvotes: number;
    downvotes: number;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  };
}

export interface BlogDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    coverImage: string;
    title: string;
    contentHtml: string;
    summary: string;
    author: {
      userId: string;
      avatar: string;
      nickName: string;
    };
    createdAt: string;
    tags: string[];
    upvotes: number;
    downvotes: number;
  };
}

// Blog voting interfaces
export interface BlogVoteRequest {
  voteType: 'upvote' | 'downvote';
}

export interface BlogVoteResponse {
  success: boolean;
  message: string;
  data: {
    upvotes: number;
    downvotes: number;
  };
}

// Comment interfaces
export interface CommentAuthor {
  userId: string;
  avatar: string;
  nickName: string;
}

export interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentListResponse {
  success: boolean;
  message: string;
  data: Comment[];
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  };
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface CommentVoteRequest {
  voteType: 'upvote' | 'downvote';
}

export interface CommentVoteResponse {
  success: boolean;
  message: string;
  data: {
    upvotes: number;
    downvotes: number;
  };
}
