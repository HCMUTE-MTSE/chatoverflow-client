export interface VoteQuestionResponse {
  upvotes: number;
  downvotes: number;
  userUpvoted: boolean;
  userDownvoted: boolean;
  userUpvotedLength: number;
  userDownvotedLength: number;
}
