export type TransactionType = 'charge' | 'withdraw' | 'payment' | 'income';

export type StatusType = 'pending' | 'succeed';

export interface FaqTransactionsResponse {
  status: boolean;
  faqs: {
    content: string;
    content_number: number;
    id: string;
    title: string;
  }[];
  message: string;
}
