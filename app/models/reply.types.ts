// Reply-related type definitions
export interface ReplyUser {
  _id: string;
  name: string;
  avatarUrl: string;
}

export interface Reply {
  _id: string;
  content: string;
  answer: string;
  parent: string | null;
  user: ReplyUser;
  upvotedBy: string[];
  downvotedBy: string[];
  createdAt: string;
  updatedAt: string;
  children?: Reply[]; // For nested replies
  hasMoreChildren?: boolean;
  totalChildren?: number;
}

export interface CreateReplyRequest {
  content: string;
  answerId: string;
  parentId?: string; // For nested replies
}

export interface GetRepliesResponse {
  replies: Omit<Reply, 'children'>[];
  totalCount: number;
  hasMore: boolean;
}

export interface ReplyVoteStatus {
  upvoted: boolean;
  downvoted: boolean;
}

export interface ReplyOwnership {
  isOwner: boolean;
}
