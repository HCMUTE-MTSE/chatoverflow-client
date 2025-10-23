import type { ApiResponse } from './api.response';

// Blog response interfaces
export interface BlogItem {
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
}

export type BlogListResponse = ApiResponse<BlogItem[]>;

export interface BlogDetail {
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
  upvotedBy: string[];
  downvotedBy: string[];
}

export type BlogDetailResponse = ApiResponse<BlogDetail>;

// Blog voting interfaces
export interface BlogVoteRequest {
  voteType: 'upvote' | 'downvote';
}

export interface BlogVoteData {
  upvotes: number;
  downvotes: number;
}

export type BlogVoteResponse = ApiResponse<BlogVoteData>;

// Blog delete response
export type BlogDeleteResponse = ApiResponse<null>;

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
  upvotedBy: string[];
  downvotedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export type CommentListResponse = ApiResponse<Comment[]>;

export interface CreateCommentRequest {
  content: string;
}

export type CreateCommentResponse = ApiResponse<Comment>;

export interface CommentVoteRequest {
  voteType: 'upvote' | 'downvote';
}

export interface CommentVoteData {
  upvotes: number;
  downvotes: number;
}

export type CommentVoteResponse = ApiResponse<CommentVoteData>;
