export type NotificationType = 'comment' | 'answer' | 'user' | 'question';

export interface Notification {
  id: string;
  title: string;
  body: string;
  redirectUrl: string;
  type: NotificationType;
}

export type NotificationResponseType = Notification[];
