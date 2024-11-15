export interface SendCommentDTO {
  rating: string;
  recommendState?: string;
  title?: string;
  commentText: string;
  positiveIdea?: string;
  negativeIdea?: string;
  isAnonymous: number;
  quality?: string;
  buyingWorth?: string;
}
